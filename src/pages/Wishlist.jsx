import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/brand';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import EmptyState from '../components/EmptyState';
import SmartImage from '../components/SmartImage';

export default function Wishlist() {
  useDocumentTitle('Wishlist');
  const { wishlist, removeFromWishlist, addToCart, notify } = useShop();

  // Single-size items can go straight to the bag; others need a size first.
  const moveToCart = (p) => {
    if (p.sizes.length === 1) {
      addToCart({ id: p.id, size: p.sizes[0], color: p.colors[0]?.name, qty: 1 });
      removeFromWishlist(p.id);
    } else {
      notify('Choose a size on the product page');
    }
  };

  return (
    <>
      <header className="page-head container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
        <h1>Your wishlist</h1>
        {wishlist.length > 0 && <p>{wishlist.length} saved {wishlist.length === 1 ? 'piece' : 'pieces'}</p>}
      </header>

      <section className="container section--tight">
        {wishlist.length === 0 ? (
          <EmptyState icon={Heart} title="Nothing saved yet" text="Tap the heart on any piece to keep it here for later." actionLabel="Browse the collection" actionTo="/shop" />
        ) : (
          <div className="product-grid">
            {wishlist.map((p) => (
              <article className="pcard" key={p.id}>
                <div className="pcard__media">
                  <Link to={`/product/${p.id}`} className="pcard__link" aria-label={p.name}>
                    <SmartImage src={p.thumbs[0]} alt={p.name} ratio="3/4" />
                  </Link>
                  <button className="pcard__heart" onClick={() => removeFromWishlist(p.id)} aria-label={`Remove ${p.name} from wishlist`}>
                    <X size={18} strokeWidth={1.4} />
                  </button>
                </div>
                <div className="pcard__body">
                  <h3 className="pcard__name"><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
                  <p className="pcard__price">{formatPrice(p.price)}</p>
                  <button className="btn btn--ghost btn--sm wish__move" onClick={() => moveToCart(p)}>
                    <ShoppingBag size={15} /> {p.sizes.length === 1 ? 'Move to bag' : 'Choose size'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
