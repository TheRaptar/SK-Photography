import { useCallback, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Upload,
  Trash2,
  GripVertical,
  LogOut,
  Download,
  Copy,
  Check,
  ImageOff,
  ShieldAlert,
} from 'lucide-react';
import {
  isAdminSessionActive,
  startAdminSession,
  endAdminSession,
  verifyPassphrase,
} from '../lib/adminAuth';
import {
  addUploadedPhoto,
  deleteUploadedPhoto,
  updateUploadedPhoto,
  reorderUploadedPhotos,
  clearAllUploadedPhotos,
  readImageDimensions,
} from '../lib/photoStore';
import { useUploadedPhotos } from '../hooks/useUploadedPhotos';
import { galleries } from '../data/content';
import { CATEGORY_LABELS, type Category } from '../types';

const CATEGORY_OPTIONS: Category[] = [
  'weddings',
  'portraits',
  'events',
  'street',
  'landscape',
];

function extFromMime(mime: string): string {
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('gif')) return 'gif';
  return 'jpg';
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/* ---------------------------------------------------------------------- */
/* Passphrase gate                                                        */
/* ---------------------------------------------------------------------- */

function PassphraseGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    const ok = await verifyPassphrase(value);
    setChecking(false);
    if (ok) {
      startAdminSession();
      onUnlock();
    } else {
      setError(true);
      setValue('');
      setTimeout(() => setError(false), 1400);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="w-11 h-11 rounded-full border border-white/15 grid place-items-center mb-6 mx-auto">
          <Lock size={16} strokeWidth={1.5} className="text-white/70" />
        </div>
        <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase text-center mb-8">
          Studio access only
        </p>
        <motion.input
          animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          type="password"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Passphrase"
          className="w-full bg-transparent border-b border-white/20 focus:border-white/60 text-white text-center text-lg tracking-widest py-3 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={checking || !value}
          className="mt-8 w-full text-[12px] tracking-[0.1em] uppercase text-white/80 border border-white/20 py-3 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40"
        >
          {checking ? 'Checking…' : 'Enter'}
        </button>
      </motion.form>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Manager panel                                                          */
/* ---------------------------------------------------------------------- */

function ManagerPanel() {
  const { uploadedPhotos, refresh } = useUploadedPhotos();
  const [dragOver, setDragOver] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const galleryOptions = useMemo(
    () => [{ id: 'unassigned', title: 'Unassigned (category only)' }, ...galleries.map((g) => ({ id: g.id, title: g.title }))],
    []
  );

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      setBusy(true);
      const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
      const startOrder = uploadedPhotos.length;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const { width, height } = await readImageDimensions(file);
          const base = slugify(file.name) || 'untitled';
          await addUploadedPhoto({
            id: `upload-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
            title: file.name.replace(/\.[a-z0-9]+$/i, ''),
            alt: file.name.replace(/\.[a-z0-9]+$/i, ''),
            category: 'portraits',
            galleryId: 'unassigned',
            blob: file,
            width,
            height,
            order: startOrder + i,
            createdAt: Date.now(),
          });
          void base;
        } catch {
          // skip unreadable file
        }
      }
      await refresh();
      setBusy(false);
    },
    [uploadedPhotos.length, refresh]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (id: string) => {
    await deleteUploadedPhoto(id);
    await refresh();
  };

  const handleClearAll = async () => {
    if (!confirm('Delete all uploaded photos from this browser? This cannot be undone.')) return;
    await clearAllUploadedPhotos();
    await refresh();
  };

  const handleFieldChange = async (id: string, patch: Parameters<typeof updateUploadedPhoto>[1]) => {
    await updateUploadedPhoto(id, patch);
    await refresh();
  };

  // Reordering via native HTML5 drag and drop
  const handleDragStart = (id: string) => setDraggingId(id);
  const handleDragOverItem = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (!draggingId || draggingId === overId) return;
  };
  const handleDropOnItem = async (targetId: string) => {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      return;
    }
    const ids = uploadedPhotos.map((p) => p.id);
    const from = ids.indexOf(draggingId);
    const to = ids.indexOf(targetId);
    ids.splice(from, 1);
    ids.splice(to, 0, draggingId);
    setDraggingId(null);
    await reorderUploadedPhotos(ids);
    await refresh();
  };

  const buildSnippet = () => {
    const lines = uploadedPhotos.map((p) => {
      const ext = extFromMime(p.blob.type);
      const path = `/photos/${p.category}/${p.id}.${ext}`;
      return `  { id: '${p.id}', title: ${JSON.stringify(p.title)}, category: '${p.category}', galleryId: '${p.galleryId}', src: '${path}', width: ${p.width}, height: ${p.height}, alt: ${JSON.stringify(p.alt)} },`;
    });
    return lines.join('\n');
  };

  const handleCopySnippet = async () => {
    await navigator.clipboard.writeText(buildSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleExportImages = () => {
    uploadedPhotos.forEach((p) => {
      const ext = extFromMime(p.blob.type);
      const url = URL.createObjectURL(p.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${p.id}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    });
  };

  const handleLogout = () => {
    endAdminSession();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-bg pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow mb-2">Hidden panel</p>
            <h1 className="font-display text-3xl">Photo studio manager</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase border border-line-strong px-4 py-2.5 hover:bg-ink hover:text-bg hover:border-ink transition-colors"
          >
            <LogOut size={14} strokeWidth={1.6} /> Log out
          </button>
        </div>

        <div className="flex items-start gap-3 bg-accent-soft/40 border border-accent/30 rounded-lg p-4 mb-8 text-sm text-ink-dim">
          <ShieldAlert size={18} strokeWidth={1.5} className="text-accent shrink-0 mt-0.5" />
          <p>
            These images are stored only in <strong className="text-ink">this browser</strong> (IndexedDB) —
            it's a private staging area for you, not a live upload for site visitors, since this is a
            static site with no backend. Use <strong className="text-ink">Export images</strong> and{' '}
            <strong className="text-ink">Copy data snippet</strong> below, drop the files into{' '}
            <code className="text-ink">/public/photos/&lt;category&gt;/</code>, paste the snippet into{' '}
            <code className="text-ink">src/data/content.ts</code>, and redeploy to publish them for real.
          </p>
        </div>

        {/* Dropzone */}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`block cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-colors mb-10 ${
            dragOver ? 'border-accent bg-accent-soft/30' : 'border-line-strong hover:border-accent/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Upload size={26} strokeWidth={1.4} className="mx-auto mb-3 text-ink-dim" />
          <p className="font-display text-lg mb-1">{busy ? 'Processing…' : 'Drop images here, or click to browse'}</p>
          <p className="text-ink-dim text-sm">JPG, PNG, or WebP — multiple files supported</p>
        </label>

        {uploadedPhotos.length === 0 ? (
          <div className="text-center py-20 text-ink-dim">
            <ImageOff size={28} strokeWidth={1.3} className="mx-auto mb-3 opacity-50" />
            <p>No uploaded photos yet.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <p className="text-sm text-ink-dim">
                {uploadedPhotos.length} photo{uploadedPhotos.length === 1 ? '' : 's'} · drag the handle to reorder
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleExportImages}
                  className="inline-flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase border border-line-strong px-4 py-2.5 hover:bg-ink hover:text-bg hover:border-ink transition-colors"
                >
                  <Download size={14} strokeWidth={1.6} /> Export images
                </button>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="inline-flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase border border-line-strong px-4 py-2.5 hover:bg-ink hover:text-bg hover:border-ink transition-colors"
                >
                  {copied ? <Check size={14} strokeWidth={1.6} /> : <Copy size={14} strokeWidth={1.6} />}
                  {copied ? 'Copied' : 'Copy data snippet'}
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="inline-flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase border border-red-300 text-red-500 px-4 py-2.5 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                >
                  <Trash2 size={14} strokeWidth={1.6} /> Clear all
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence initial={false}>
                {uploadedPhotos.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    draggable
                    onDragStart={() => handleDragStart(p.id)}
                    onDragOver={(e) => handleDragOverItem(e, p.id)}
                    onDrop={() => handleDropOnItem(p.id)}
                    className={`bg-surface border border-line rounded-lg overflow-hidden ${
                      draggingId === p.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-surface-2">
                      <img src={p.url} alt={p.alt} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur grid place-items-center cursor-grab active:cursor-grabbing">
                        <GripVertical size={14} className="text-white" />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        aria-label="Delete photo"
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur grid place-items-center text-white hover:bg-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="p-3 space-y-2">
                      <input
                        value={p.title}
                        onChange={(e) => handleFieldChange(p.id, { title: e.target.value })}
                        className="w-full text-sm font-medium bg-transparent border-b border-line focus:border-accent outline-none py-1"
                        placeholder="Title"
                      />
                      <div className="flex gap-2">
                        <select
                          value={p.category}
                          onChange={(e) => handleFieldChange(p.id, { category: e.target.value as Category })}
                          className="flex-1 text-xs bg-surface-2 border border-line rounded px-2 py-1.5"
                        >
                          {CATEGORY_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                              {CATEGORY_LABELS[c]}
                            </option>
                          ))}
                        </select>
                        <select
                          value={p.galleryId}
                          onChange={(e) => handleFieldChange(p.id, { galleryId: e.target.value })}
                          className="flex-1 text-xs bg-surface-2 border border-line rounded px-2 py-1.5"
                        >
                          {galleryOptions.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Page entry                                                              */
/* ---------------------------------------------------------------------- */

export default function StudioAdmin() {
  const [unlocked, setUnlocked] = useState(() => isAdminSessionActive());

  return unlocked ? <ManagerPanel /> : <PassphraseGate onUnlock={() => setUnlocked(true)} />;
}
