# Hidden studio admin panel

This project has no backend, so the "admin" feature is a private, passphrase-gated
page built into the frontend. It lets you stage new photos, arrange their order,
and tag them with a category/gallery — all stored locally in your browser via
IndexedDB.

## Where it lives

- URL: `/sk-studio-9247` (defined as `HIDDEN_ADMIN_PATH` in `src/App.tsx`)
- It is never linked from the header, footer, or sitemap — the only way in is
  knowing the exact URL.
- **Change this path** before you deploy, to something only you know, then
  bookmark it privately.

## Passphrase

- Default passphrase: `sk-studio-2026`
- **Change it** before deploying — see the instructions at the top of
  `src/lib/adminAuth.ts` for generating a new SHA-256 hash to paste in.
- Be aware: since this is a static site, this can only ever be a client-side
  gate. It's fine for keeping the page off the beaten path, but someone who
  really wants to could inspect the deployed bundle and try to crack the hash
  offline. Don't use it to protect anything truly sensitive.

## How uploads work (and their real limitation)

Photos you upload in the panel are stored as Blobs in **this browser's**
IndexedDB, so you can immediately preview them arranged in the real
Portfolio/Gallery pages. But — important — **visitors to your live site will
not see them**, because a static site has no server to store files that
everyone can read. This is expected behavior, not a bug.

### Publishing them for real — two ways

**Option A — Direct-to-source (Chrome/Edge/Opera, local dev only)**

The panel can write straight into your own working copy of this repo using
the browser's File System Access API — no server, no upload endpoint, just
the browser writing files to a folder you grant it access to:

1. Run the site locally (`npm run dev`) and open the hidden admin panel in a
   Chromium-based browser.
2. Upload/arrange your images as usual.
3. Click **Connect project folder** and pick the top-level project folder
   (the one containing `src/` and `public/`). It's remembered for next time.
4. Click **Publish N photos to source** — this writes each image into
   `public/photos/<category>/` and appends the matching entry to the
   `photos` array in `src/data/content.ts`, exactly like doing it by hand.
5. The change is now a normal, real edit in your working tree. Review it,
   `git add`, commit, and push/deploy as usual — nothing is committed for
   you automatically.

Not supported in Firefox or Safari (they don't implement this API yet) —
use Option B there.

**Option B — Export + paste (works everywhere)**

1. Open the hidden panel and upload/arrange your images as usual.
2. Click **Export images** — this downloads each photo file.
3. Click **Copy data snippet** — this copies ready-to-paste `Photo` entries
   (matching the shape already used in `src/data/content.ts`).
4. Move the downloaded image files into `public/photos/<category>/`,
   matching the filenames referenced in the copied snippet.
5. Paste the snippet into the `photos` array in `src/data/content.ts`.
6. Rebuild and redeploy the site.

Either way, note that neither option touches a gallery's `photoIds` array —
if a new photo belongs on a gallery detail page, add its id there by hand.

## Managing order

Drag the grip handle on any photo card in the panel to reorder it — the new
order is saved immediately and reflected in the exported snippet (entries are
exported in the order shown).
