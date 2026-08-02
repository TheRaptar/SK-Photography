import type { UploadedPhoto } from './photoStore';
import { saveProjectDirectoryHandle, getProjectDirectoryHandle, clearProjectDirectoryHandle } from './photoStore';

/**
 * Publishes uploaded photos straight onto disk, into this project's own
 * `public/photos/` and `src/data/content.ts` — using only the browser's
 * native File System Access API. No server, no upload endpoint, no external
 * API call: the browser writes directly to a local folder you grant it
 * access to, once.
 *
 * Support: Chromium browsers only (Chrome, Edge, Opera, Arc). Firefox and
 * Safari don't implement this API — those fall back to the existing
 * Export + copy-snippet workflow, which always works everywhere.
 *
 * This is meant to be pointed at your local clone of this repo, running
 * `npm run dev`. Vite will hot-reload the moment the files land, and the
 * change is a normal, real, unstaged edit in your working tree — you still
 * review it and `git commit` / push yourself, exactly like any other change.
 */

export function isFsAccessSupported(): boolean {
  return typeof window !== 'undefined' && typeof window.showDirectoryPicker === 'function';
}

function extFromMime(mime: string): string {
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('gif')) return 'gif';
  return 'jpg';
}

async function ensurePermission(handle: FileSystemDirectoryHandle): Promise<boolean> {
  const opts = { mode: 'readwrite' as const };
  if ((await handle.queryPermission(opts)) === 'granted') return true;
  return (await handle.requestPermission(opts)) === 'granted';
}

/** Opens the native folder picker and remembers the chosen folder for next time. */
export async function chooseProjectRoot(): Promise<FileSystemDirectoryHandle> {
  const handle = await window.showDirectoryPicker({ id: 'sk-photography-root', mode: 'readwrite' });
  // Sanity check: this should look like the project root, not a random folder.
  try {
    await handle.getDirectoryHandle('src');
    await handle.getDirectoryHandle('public');
  } catch {
    throw new Error(
      `"${handle.name}" doesn't look like the project root — I couldn't find a src/ and public/ folder inside it. Pick the top-level SK-Photography folder.`
    );
  }
  await saveProjectDirectoryHandle(handle);
  return handle;
}

/** Re-uses the previously granted folder, if any, re-requesting permission if needed. */
export async function getRememberedProjectRoot(): Promise<FileSystemDirectoryHandle | null> {
  const handle = await getProjectDirectoryHandle();
  if (!handle) return null;
  const ok = await ensurePermission(handle);
  return ok ? handle : null;
}

export async function forgetProjectRoot(): Promise<void> {
  await clearProjectDirectoryHandle();
}

async function writeFile(dir: FileSystemDirectoryHandle, path: string[], contents: Blob | string) {
  let cursor = dir;
  for (const segment of path.slice(0, -1)) {
    cursor = await cursor.getDirectoryHandle(segment, { create: true });
  }
  const fileHandle = await cursor.getFileHandle(path[path.length - 1], { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

async function readTextFile(dir: FileSystemDirectoryHandle, path: string[]): Promise<string> {
  let cursor = dir;
  for (const segment of path.slice(0, -1)) {
    cursor = await cursor.getDirectoryHandle(segment);
  }
  const fileHandle = await cursor.getFileHandle(path[path.length - 1]);
  const file = await fileHandle.getFile();
  return file.text();
}

function buildPhotoEntryLine(p: UploadedPhoto, filename: string): string {
  const path = `/photos/${p.category}/${filename}`;
  return `  { id: '${p.id}', title: ${JSON.stringify(p.title)}, category: '${p.category}', galleryId: '${p.galleryId}', src: '${path}', width: ${p.width}, height: ${p.height}, alt: ${JSON.stringify(p.alt)} },`;
}

/** Inserts new entries just before the closing `];` of `export const photos: Photo[] = [`. */
function insertIntoPhotosArray(source: string, newLines: string[]): string {
  const marker = 'export const photos: Photo[] = [';
  const markerIdx = source.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error("Couldn't find `export const photos: Photo[] = [` in content.ts — has the file been restructured?");
  }
  const closeIdx = source.indexOf('\n];', markerIdx);
  if (closeIdx === -1) {
    throw new Error("Couldn't find the closing `];` of the photos array in content.ts.");
  }
  const insertPos = closeIdx + 1; // right after the newline, before "];"
  return source.slice(0, insertPos) + newLines.join('\n') + '\n' + source.slice(insertPos);
}

export interface PublishResult {
  written: { photo: UploadedPhoto; filename: string }[];
  skippedExisting: UploadedPhoto[];
}

/**
 * Writes each photo's image file into public/photos/<category>/ and appends
 * a matching entry to the `photos` array in src/data/content.ts — the exact
 * two manual steps the admin panel used to ask you to do by hand.
 *
 * Photos whose filename already exists on disk are skipped (not
 * overwritten) and reported back, so re-running this after partially
 * publishing never clobbers anything.
 */
export async function publishPhotosToSource(
  root: FileSystemDirectoryHandle,
  uploadedPhotos: UploadedPhoto[]
): Promise<PublishResult> {
  if (!(await ensurePermission(root))) {
    throw new Error('Write permission to the project folder was not granted.');
  }

  const written: PublishResult['written'] = [];
  const skippedExisting: UploadedPhoto[] = [];

  for (const p of uploadedPhotos) {
    const ext = extFromMime(p.blob.type);
    const filename = `${p.id}.${ext}`;
    const categoryDir = await root.getDirectoryHandle('public').then((d) => d.getDirectoryHandle('photos', { create: true })).then((d) => d.getDirectoryHandle(p.category, { create: true }));

    let exists = false;
    try {
      await categoryDir.getFileHandle(filename);
      exists = true;
    } catch {
      exists = false;
    }
    if (exists) {
      skippedExisting.push(p);
      continue;
    }

    await writeFile(root, ['public', 'photos', p.category, filename], p.blob);
    written.push({ photo: p, filename });
  }

  if (written.length > 0) {
    const contentPath = ['src', 'data', 'content.ts'];
    const source = await readTextFile(root, contentPath);
    const newLines = written.map(({ photo, filename }) => buildPhotoEntryLine(photo, filename));
    const updated = insertIntoPhotosArray(source, newLines);
    await writeFile(root, contentPath, updated);
  }

  return { written, skippedExisting };
}
