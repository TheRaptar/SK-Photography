import type { Category } from '../types';

/**
 * Frontend-only storage for photos uploaded through the hidden studio
 * admin panel. Because this project has no backend or database, uploaded
 * images are kept as Blobs in this browser's IndexedDB.
 *
 * IMPORTANT LIMITATION (this is expected, not a bug):
 * IndexedDB is per-browser, per-device. Photos you upload here are only
 * visible to you, on the device/browser you uploaded them from — visitors
 * to the live site will NOT see them, because a static site has nowhere
 * to store files that everyone can read. Use the "Export" action in the
 * admin panel to download the images plus a ready-to-paste data snippet,
 * then add the files to /public/photos and paste the snippet into
 * src/data/content.ts, and redeploy — that's what actually publishes them.
 */

export interface UploadedPhoto {
  id: string;
  title: string;
  alt: string;
  category: Category;
  /** Existing gallery id to attach to, or 'unassigned' */
  galleryId: string;
  blob: Blob;
  width: number;
  height: number;
  order: number;
  createdAt: number;
}

const DB_NAME = 'sk-studio-admin';
const STORE_NAME = 'uploaded-photos';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);
    const req = fn(store);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllUploadedPhotos(): Promise<UploadedPhoto[]> {
  const all = await withStore<UploadedPhoto[]>('readonly', (s) => s.getAll());
  return all.sort((a, b) => a.order - b.order);
}

export async function addUploadedPhoto(photo: UploadedPhoto): Promise<void> {
  await withStore('readwrite', (s) => s.put(photo));
}

export async function updateUploadedPhoto(
  id: string,
  patch: Partial<Omit<UploadedPhoto, 'id' | 'blob'>>
): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const existing: UploadedPhoto = await new Promise((resolve, reject) => {
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  if (!existing) return;
  store.put({ ...existing, ...patch });
}

export async function deleteUploadedPhoto(id: string): Promise<void> {
  await withStore('readwrite', (s) => s.delete(id));
}

export async function reorderUploadedPhotos(orderedIds: string[]): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  orderedIds.forEach((id, index) => {
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const record = getReq.result;
      if (record) store.put({ ...record, order: index });
    };
  });
  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(undefined);
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearAllUploadedPhotos(): Promise<void> {
  await withStore('readwrite', (s) => s.clear());
}

/** Reads an image File and resolves its natural pixel dimensions. */
export function readImageDimensions(file: File | Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}
