import { useEffect } from 'react';
import { BRAND } from '../data/brand';

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND.fullName}` : `${BRAND.fullName} · ${BRAND.tagline}`;
  }, [title]);
}
