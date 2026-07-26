import { useCallback, useEffect, useState } from 'react';
import type { Photo } from '../types';
import {
  getAllUploadedPhotos,
  type UploadedPhoto,
} from '../lib/photoStore';

export interface UploadedPhotoWithUrl extends UploadedPhoto {
  url: string;
}

/**
 * Loads all uploaded photos from IndexedDB and keeps a live set of
 * object URLs for rendering. Revokes URLs on unmount/refresh to avoid
 * leaking memory.
 */
export function useUploadedPhotos() {
  const [items, setItems] = useState<UploadedPhotoWithUrl[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const all = await getAllUploadedPhotos();
    setItems((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return all.map((p) => ({ ...p, url: URL.createObjectURL(p.blob) }));
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional initial async load from IndexedDB
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      items.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { uploadedPhotos: items, loading, refresh };
}

/** Converts an uploaded photo into the same shape used by static content.ts photos. */
export function toPhoto(u: UploadedPhotoWithUrl): Photo {
  return {
    id: u.id,
    title: u.title,
    category: u.category,
    galleryId: u.galleryId,
    src: u.url,
    width: u.width,
    height: u.height,
    alt: u.alt,
  };
}
