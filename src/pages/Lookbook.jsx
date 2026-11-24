import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { IMG } from '../data/images';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import SmartImage from '../components/SmartImage';

const SECTIONS = [
  { id: 'heritage', title: 'Heritage weaves', text: 'Banarasi, Kanjivaram and Chanderi, styled for the festive calendar.', images: IMG.lookbook.heritage, to: '/category/sarees', cta: 'Shop sarees' },
  { id: 'modern', title: 'Modern separates', text: 'Linen, satin and tailoring for city days and long dinners.', images: IMG.lookbook.modern, to: '/category/western-wear', cta: 'Shop western wear' },
  { id: 'bridal', title: 'The bridal atelier', text: 'Heirloom embroidery, pearl work and jewellery to finish the look.', images: IMG.lookbook.bridal, to: '/category/bridal-collection', cta: 'Shop bridal' },
];

export default function Lookbook() {
  useDocumentTitle('Lookbook');
  const [lightbox, setLightbox] = useState(null); // { section, index }

  const current = lightbox ? SECTIONS.find((s) => s.id === lightbox.section) : null;
  const step = (d) => setLightbox((l) => ({ ...l, index: (l.index + d + current.images.length) % current.images.length }));

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  return (
    <>
      <header className="page-head container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Lookbook' }]} />
        <h1>Lookbook</h1>
        <p>Autumn–Winter, photographed in Bengaluru.</p>
      </header>

      {SECTIONS.map((s, si) => (
        <section className="look container" key={s.id}>
          <div className={`look__head ${si % 2 ? 'look__head--right' : ''}`}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            <Link to={s.to} className="text-link">{s.cta}</Link>
          </div>
          <ul className={`look__grid look__grid--${s.images.length}`}>
            {s.images.map((src, i) => (
              <li key={src + i} className={`look__item look__item--${i + 1}`}>
                <button onClick={() => setLightbox({ section: s.id, index: i })} aria-label={`Open ${s.title} image ${i + 1}`}>
                  <SmartImage src={src} alt={`${s.title}, look ${i + 1}`} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <button className="icon-btn lightbox__close" onClick={() => setLightbox(null)} aria-label="Close"><X size={24} /></button>
            <button className="icon-btn lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image"><ArrowLeft size={24} /></button>
            <div className="lightbox__img" onClick={(e) => e.stopPropagation()}>
              <SmartImage key={lightbox.index} src={current.images[lightbox.index]} alt={`${current.title}, look ${lightbox.index + 1}`} fit="contain" eager />
              <p>{current.title} · {lightbox.index + 1} of {current.images.length}</p>
            </div>
            <button className="icon-btn lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image"><ArrowRight size={24} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
