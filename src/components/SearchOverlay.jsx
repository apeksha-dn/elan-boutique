import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../data/brand';
import SmartImage from './SmartImage';

const SUGGESTIONS = ['Silk saree', 'Chikankari', 'Linen', 'Bridal', 'Pearl'];

export default function SearchOverlay({ open, onClose }) {
  const [term, setTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    setTerm('');
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const matches = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (q.length < 2) return [];
    return PRODUCTS.filter((p) => `${p.name} ${p.fabric} ${p.category}`.toLowerCase().includes(q)).slice(0, 5);
  }, [term]);

  const submit = (e) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="search-overlay__inner container">
            <form onSubmit={submit} className="search-overlay__form" role="search">
              <Search size={22} strokeWidth={1.4} aria-hidden="true" />
              <input
                ref={inputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search sarees, lehengas, fabrics…"
                aria-label="Search products"
              />
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">
                <X size={22} strokeWidth={1.4} />
              </button>
            </form>

            {term.trim().length < 2 ? (
              <div className="search-overlay__suggest">
                <p>Popular searches</p>
                <div>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="chip" onClick={() => { navigate(`/shop?q=${encodeURIComponent(s)}`); onClose(); }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : matches.length ? (
              <ul className="search-overlay__results">
                {matches.map((p) => (
                  <li key={p.id}>
                    <Link to={`/product/${p.id}`} onClick={onClose}>
                      <SmartImage src={p.thumbs[0]} alt={p.name} ratio="3/4" />
                      <span>
                        <strong>{p.name}</strong>
                        <em>{formatPrice(p.price)}</em>
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="search-overlay__all">
                  <button className="link-btn" onClick={submit}>See all results for “{term.trim()}”</button>
                </li>
              </ul>
            ) : (
              <p className="search-overlay__none">Nothing matches “{term.trim()}”. Try a fabric, colour or category instead.</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
