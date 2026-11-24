import { useEffect, useRef, useState } from 'react';
import { SlidersHorizontal, Search, X, SearchX } from 'lucide-react';
import useProductFilters, { PRICE_BANDS, SORTS } from '../hooks/useProductFilters';
import { ALL_SIZES } from '../data/products';
import { CATEGORIES } from '../data/categories';
import ProductGrid, { ProductSkeletons } from './ProductGrid';
import EmptyState from './EmptyState';

// Shared by the Shop page and every Category page.
export default function ProductBrowser({ products, lockCategory = false }) {
  const f = useProductFilters(products);
  const [panelOpen, setPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const first = useRef(true);

  const signature = `${f.q}|${f.category}|${f.price}|${f.sort}|${f.sizes.join(',')}`;
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), first.current ? 450 : 250);
    first.current = false;
    return () => clearTimeout(t);
  }, [signature]);

  useEffect(() => {
    document.body.style.overflow = panelOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [panelOpen]);

  const chips = [
    ...(f.q ? [{ label: `“${f.q}”`, remove: () => f.update({ q: '' }) }] : []),
    ...(!lockCategory && f.category !== 'all' ? [{ label: CATEGORIES.find((c) => c.slug === f.category)?.name, remove: () => f.update({ category: 'all' }) }] : []),
    ...(f.price !== 'all' ? [{ label: PRICE_BANDS.find((b) => b.id === f.price)?.label, remove: () => f.update({ price: 'all' }) }] : []),
    ...f.sizes.map((s) => ({ label: `Size ${s}`, remove: () => f.toggleSize(s) })),
  ];

  const panel = (
    <div className="filters">
      <div className="filters__head">
        <h2>Filter</h2>
        <button className="icon-btn filters__close" onClick={() => setPanelOpen(false)} aria-label="Close filters"><X size={20} /></button>
      </div>

      {!lockCategory && (
        <fieldset>
          <legend>Category</legend>
          {[{ slug: 'all', name: 'All pieces' }, ...CATEGORIES].map((c) => (
            <label key={c.slug} className="radio">
              <input type="radio" name="category" checked={f.category === c.slug} onChange={() => f.update({ category: c.slug })} />
              <span>{c.name}</span>
            </label>
          ))}
        </fieldset>
      )}

      <fieldset>
        <legend>Price</legend>
        {PRICE_BANDS.map((b) => (
          <label key={b.id} className="radio">
            <input type="radio" name="price" checked={f.price === b.id} onChange={() => f.update({ price: b.id })} />
            <span>{b.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Size</legend>
        <div className="size-grid">
          {ALL_SIZES.map((s) => (
            <button key={s} type="button" className={`size-btn ${f.sizes.includes(s) ? 'is-active' : ''}`} onClick={() => f.toggleSize(s)} aria-pressed={f.sizes.includes(s)}>
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      {f.activeCount > 0 && <button className="link-btn" onClick={f.clear}>Clear all filters</button>}
      <button className="btn btn--dark filters__apply" onClick={() => setPanelOpen(false)}>Show {f.results.length} pieces</button>
    </div>
  );

  return (
    <div className="browser container">
      <div className="browser__toolbar">
        <label className="browser__search">
          <Search size={18} strokeWidth={1.4} aria-hidden="true" />
          <input
            type="search"
            value={f.q}
            onChange={(e) => f.update({ q: e.target.value })}
            placeholder="Search this collection"
            aria-label="Search products"
          />
        </label>
        <button className="btn btn--ghost browser__filter-btn" onClick={() => setPanelOpen(true)}>
          <SlidersHorizontal size={16} /> Filter{f.activeCount ? ` (${f.activeCount})` : ''}
        </button>
        <label className="browser__sort">
          <span>Sort by</span>
          <select value={f.sort} onChange={(e) => f.update({ sort: e.target.value })}>
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
      </div>

      <div className="browser__layout">
        <aside className={`browser__panel ${panelOpen ? 'is-open' : ''}`} aria-label="Filters">
          {panel}
        </aside>
        {panelOpen && <div className="drawer-backdrop browser__backdrop" onClick={() => setPanelOpen(false)} />}

        <section className="browser__results" aria-live="polite">
          <div className="browser__meta">
            <p>{loading ? 'Finding pieces…' : `${f.results.length} ${f.results.length === 1 ? 'piece' : 'pieces'}`}</p>
            {chips.length > 0 && (
              <ul className="chips">
                {chips.map((c) => (
                  <li key={c.label}>
                    <button className="chip chip--active" onClick={c.remove} aria-label={`Remove filter ${c.label}`}>{c.label} <X size={12} /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {loading ? (
            <ProductSkeletons count={Math.min(8, Math.max(4, f.results.length || 6))} />
          ) : f.results.length ? (
            <ProductGrid products={f.results} />
          ) : (
            <EmptyState
              icon={SearchX}
              title="No pieces match these filters"
              text="Try a wider price range, remove a size, or search with a different word."
              actionLabel="Clear filters"
              onAction={f.clear}
            />
          )}
        </section>
      </div>
    </div>
  );
}
