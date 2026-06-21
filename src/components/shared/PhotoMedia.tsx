interface PhotoMediaProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Renders a real <img> for actual photo paths/URLs, or falls back to a CSS
 * gradient background for any category still using placeholder data
 * (currently: Commercial, until real product/campaign photos are added).
 */
export default function PhotoMedia({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
}: PhotoMediaProps) {
  const isRealImage = src.startsWith('/') || src.startsWith('http');

  if (isRealImage) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`w-full h-full ${className}`}
      style={{ background: src }}
    />
  );
}
