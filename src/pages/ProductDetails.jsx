import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, RefreshCcw } from 'lucide-react';
import { getProduct, PRODUCTS } from '../data/products';
import { getCategory } from '../data/categories';
import { BRAND, formatPrice, whatsappLink } from '../data/brand';
import { useShop } from '../context/ShopContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import SmartImage from '../components/SmartImage';
import QuantitySelector from '../components/QuantitySelector';
import Accordion from '../components/Accordion';
import SectionHeading from '../components/SectionHeading';
import ProductGrid from '../components/ProductGrid';
import { WhatsAppIcon } from '../components/SocialIcons';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  useDocumentTitle(product?.name);

  // Reset selections when navigating between products.
  useEffect(() => {
    if (!product) return;
    setActiveImg(0);
    setQty(1);
    setSizeError(false);
    setColor(product.colors[0]?.name || '');
    setSize(product.sizes.length === 1 ? product.sizes[0] : '');
  }, [product]);

  if (!product) return <Navigate to="/404" replace />;

  const category = getCategory(product.category);
  const saved = isWishlisted(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart({ id: product.id, size, color, qty });
  };

  const enquiry = whatsappLink(
    `Hello ${BRAND.fullName}, I'd like to enquire about "${product.name}" (${formatPrice(product.price)})${size ? `, size ${size}` : ''}${color ? `, ${color}` : ''}.`
  );

  return (
    <>
      <div className="container pdp-crumbs">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: category.name, to: `/category/${category.slug}` }, { label: product.name }]} />
      </div>

      <section className="pdp container">
        <div className="pdp__gallery">
          <ul className="pdp__thumbs" aria-label="Product images">
            {product.thumbs.map((src, i) => (
              <li key={src + i}>
                <button className={i === activeImg ? 'is-active' : ''} onClick={() => setActiveImg(i)} aria-label={`View image ${i + 1}`} aria-current={i === activeImg}>
                  <SmartImage src={src} alt="" ratio="3/4" />
                </button>
              </li>
            ))}
          </ul>
          <div className="pdp__main">
            <SmartImage key={activeImg} src={product.images[activeImg]} alt={`${product.name}, view ${activeImg + 1}`} ratio="3/4" eager className="pdp__main-img" />
            {product.badge && <span className="pcard__badge">{product.badge}</span>}
          </div>
        </div>

        <div className="pdp__info">
          <Link to={`/category/${category.slug}`} className="pdp__cat">{category.name}</Link>
          <h1>{product.name}</h1>
          <p className="pdp__price">
            {formatPrice(product.price)}
            {product.compareAt && (<><s>{formatPrice(product.compareAt)}</s><span className="pdp__off">{discount}% off</span></>)}
          </p>
          <p className="pdp__tax">Inclusive of all taxes.</p>
          <p className="pdp__desc">{product.description}</p>

          {product.colors.length > 0 && (
            <div className="field-group">
              <p className="field-label">Colour: <strong>{color}</strong></p>
              <ul className="swatches">
                {product.colors.map((c) => (
                  <li key={c.name}>
                    <button className={color === c.name ? 'is-active' : ''} style={{ background: c.hex }} onClick={() => setColor(c.name)} aria-label={c.name} aria-pressed={color === c.name} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="field-group">
            <p className="field-label">Size{size && <>: <strong>{size}</strong></>}</p>
            <div className="size-grid" role="group" aria-label="Select size">
              {product.sizes.map((s) => (
                <button key={s} className={`size-btn ${size === s ? 'is-active' : ''}`} onClick={() => { setSize(s); setSizeError(false); }} aria-pressed={size === s}>
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="field-error" role="alert">Select a size to add this piece to your bag.</p>}
          </div>

          <div className="pdp__buy">
            <QuantitySelector value={qty} onChange={setQty} />
            <button className="btn btn--dark pdp__add" onClick={handleAdd}><ShoppingBag size={17} /> Add to bag</button>
            <button className={`icon-btn icon-btn--ring pdp__wish ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product.id)} aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}>
              <Heart size={19} strokeWidth={1.4} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <a className="btn btn--ghost pdp__wa" href={enquiry} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} /> Enquire on WhatsApp
          </a>

          <ul className="pdp__perks">
            <li><Truck size={18} strokeWidth={1.3} /> Ships in 2 to 4 days. Free above {formatPrice(BRAND.freeShippingAbove)}.</li>
            <li><RefreshCcw size={18} strokeWidth={1.3} /> 7-day exchange on unworn pieces.</li>
          </ul>

          <Accordion
            items={[
              { title: 'Product details', content: <ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul> },
              { title: 'Care instructions', content: <ul>{product.care.map((d) => <li key={d}>{d}</li>)}</ul> },
              { title: 'Shipping and returns', content: <p>Orders are packed in tissue and dispatched within 2 to 4 working days. Unworn pieces with tags can be exchanged within 7 days of delivery. Bridal and made-to-measure pieces are final sale.</p> },
            ]}
          />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section container">
          <SectionHeading title="You may also like" to={`/category/${category.slug}`} linkLabel={`More ${category.name.toLowerCase()}`} />
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
