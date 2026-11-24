import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PRICE_BANDS = [
  { id: 'all', label: 'Any price', min: 0, max: Infinity },
  { id: 'u5', label: 'Under ₹5,000', min: 0, max: 5000 },
  { id: '5-10', label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
  { id: '10-25', label: '₹10,000 – ₹25,000', min: 10000, max: 25000 },
  { id: '25p', label: 'Above ₹25,000', min: 25000, max: Infinity },
];

export const SORTS = [
  { id: 'popular', label: 'Popularity' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
];

// Filter state lives in the URL, so filtered views can be shared and
// the back button behaves as expected.
export default function useProductFilters(products) {
  const [params, setParams] = useSearchParams();

  const q = params.get('q') || '';
  const category = params.get('category') || 'all';
  const price = params.get('price') || 'all';
  const sort = params.get('sort') || 'popular';
  const sizes = (params.get('sizes') || '').split(',').filter(Boolean);

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      const empty = v === '' || v == null || v === 'all' || (k === 'sort' && v === 'popular') || (Array.isArray(v) && !v.length);
      if (empty) next.delete(k);
      else next.set(k, Array.isArray(v) ? v.join(',') : v);
    });
    setParams(next, { replace: true });
  };

  const toggleSize = (s) => update({ sizes: sizes.includes(s) ? sizes.filter((x) => x !== s) : [...sizes, s] });
  const clear = () => setParams(new URLSearchParams(), { replace: true });

  const results = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.id === price) || PRICE_BANDS[0];
    const term = q.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (p.price < band.min || p.price >= band.max) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (term) {
        const hay = `${p.name} ${p.fabric} ${p.category.replace('-', ' ')} ${p.colors.map((c) => c.name).join(' ')}`.toLowerCase();
        if (!term.split(/\s+/).every((t) => hay.includes(t))) return false;
      }
      return true;
    });
    const by = {
      popular: (a, b) => b.popularity - a.popularity,
      newest: (a, b) => a.daysOld - b.daysOld,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
    }[sort];
    list = [...list].sort(by);
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, q, category, price, sort, sizes.join(',')]);

  const activeCount = (category !== 'all' ? 1 : 0) + (price !== 'all' ? 1 : 0) + sizes.length + (q ? 1 : 0);

  return { q, category, price, sort, sizes, results, update, toggleSize, clear, activeCount };
}
