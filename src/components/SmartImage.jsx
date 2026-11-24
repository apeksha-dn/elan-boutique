import { useState } from 'react';
import { Shirt } from 'lucide-react';

// Image with a soft loading state and a tasteful fallback, so a slow or
// unavailable photo never leaves a hole in the layout.
export default function SmartImage({ src, alt = '', className = '', ratio, eager = false, fit = 'cover' }) {
  const [status, setStatus] = useState('loading');
  const style = ratio ? { aspectRatio: ratio } : undefined;

  return (
    <div className={`smart-img ${status} ${className}`} style={style}>
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectFit: fit }}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
      {status === 'error' && (
        <div className="smart-img__fallback" role="img" aria-label={alt}>
          <Shirt size={28} strokeWidth={1.1} aria-hidden="true" />
          {alt && <span>{alt}</span>}
        </div>
      )}
    </div>
  );
}
