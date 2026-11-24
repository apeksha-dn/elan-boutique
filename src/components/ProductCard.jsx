import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { formatPrice } from '../data/brand';
import { useShop } from '../context/ShopContext';
import SmartImage from './SmartImage';

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useShop();
  const saved = isWishlisted(product.id);

  return (
    <article className="pcard">
      <div className="pcard__media">
        <Link to={`/product/${product.id}`} className="pcard__link" aria-label={product.name}>
          <SmartImage src={product.thumbs[0]} alt={product.name} ratio="3/4" className="pcard__img pcard__img--a" />
          <SmartImage src={product.thumbs[1]} alt="" ratio="3/4" className="pcard__img pcard__img--b" />
        </Link>
        {product.badge && <span className="pcard__badge">{product.badge}</span>}
        <button
          className={`pcard__heart ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart size={18} strokeWidth={1.4} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="pcard__body">
        <h3 className="pcard__name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="pcard__price">
          {formatPrice(product.price)}
          {product.compareAt && <s>{formatPrice(product.compareAt)}</s>}
        </p>
        <ul className="pcard__colors" aria-label="Available colours">
          {product.colors.map((c) => (
            <li key={c.name} title={c.name} style={{ background: c.hex }} />
          ))}
        </ul>
      </div>
    </article>
  );
}
