import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND, formatPrice } from '../data/brand';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import EmptyState from '../components/EmptyState';
import QuantitySelector from '../components/QuantitySelector';
import SmartImage from '../components/SmartImage';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+?91[\s-]?)?[6-9]\d{9}$/;

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!PHONE_RE.test(v.phone.replace(/\s/g, ''))) e.phone = 'Enter a 10-digit Indian mobile number.';
  if (v.address.trim().length < 8) e.address = 'Enter your full delivery address.';
  if (v.city.trim().length < 2) e.city = 'Enter your city.';
  if (!/^\d{6}$/.test(v.pin)) e.pin = 'Enter a 6-digit PIN code.';
  return e;
};

const EMPTY = { name: '', email: '', phone: '', address: '', city: '', pin: '', payment: 'upi' };

export default function Cart() {
  useDocumentTitle('Shopping bag');
  const { lines, subtotal, shipping, updateQty, removeFromCart, clearCart } = useShop();

  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMsg, setPromoMsg] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  const discount = promoApplied ? Math.round(subtotal * BRAND.promoDiscount) : 0;
  const total = subtotal - discount + shipping;

  const applyPromo = (e) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === BRAND.promoCode) {
      setPromoApplied(true);
      setPromoMsg('Code applied. 10% off your order.');
    } else {
      setPromoApplied(false);
      setPromoMsg('That code is not valid. Check the spelling and try again.');
    }
  };

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setPlacing(true);
    // Replace with a real payment / order API call.
    setTimeout(() => {
      setOrder({ id: `EL${Date.now().toString().slice(-7)}`, total, name: values.name.split(' ')[0], email: values.email, payment: values.payment });
      clearCart();
      setPlacing(false);
      setCheckingOut(false);
    }, 900);
  };

  if (order) {
    return (
      <section className="container order-done" role="status">
        <Check size={34} strokeWidth={1.1} />
        <h1>Thank you, {order.name}.</h1>
        <p>Your order <strong>{order.id}</strong> for {formatPrice(order.total)} is confirmed. {order.payment === 'cod' ? 'Please keep the amount ready on delivery.' : 'A payment link is on its way.'} A confirmation has been sent to {order.email}.</p>
        <p className="order-done__note">This is a demo checkout: no payment was taken.</p>
        <Link to="/shop" className="btn btn--dark">Continue shopping</Link>
      </section>
    );
  }

  return (
    <>
      <header className="page-head container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shopping bag' }]} />
        <h1>Shopping bag</h1>
      </header>

      <section className="container section--tight">
        {lines.length === 0 ? (
          <EmptyState icon={ShoppingBag} title="Your bag is empty" text="Add a piece you love and it will wait for you here." actionLabel="Start shopping" actionTo="/shop" />
        ) : (
          <div className="cart">
            <ul className="cart__lines">
              {lines.map(({ key, product: p, size, color, qty }) => (
                <li key={key} className="cart-line">
                  <Link to={`/product/${p.id}`} className="cart-line__img"><SmartImage src={p.thumbs[0]} alt={p.name} ratio="3/4" /></Link>
                  <div className="cart-line__info">
                    <h2><Link to={`/product/${p.id}`}>{p.name}</Link></h2>
                    <p className="cart-line__meta">{[color, size && size !== 'Free size' ? `Size ${size}` : size].filter(Boolean).join(' · ')}</p>
                    <p className="cart-line__unit">{formatPrice(p.price)}</p>
                    <div className="cart-line__actions">
                      <QuantitySelector value={qty} onChange={(n) => updateQty(key, n)} label={`Quantity for ${p.name}`} />
                      <button className="link-btn" onClick={() => removeFromCart(key)}><Trash2 size={15} /> Remove</button>
                    </div>
                  </div>
                  <p className="cart-line__total">{formatPrice(p.price * qty)}</p>
                </li>
              ))}
            </ul>

            <aside className="summary" aria-label="Order summary">
              <h2>Order summary</h2>
              <form onSubmit={applyPromo} className="promo-form">
                <label htmlFor="promo" className="sr-only">Promo code</label>
                <input id="promo" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" />
                <button className="btn btn--ghost btn--sm" type="submit">Apply</button>
              </form>
              {promoMsg && <p className={promoApplied ? 'promo-ok' : 'field-error'} role="status">{promoMsg}</p>}

              <dl className="summary__rows">
                <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                {discount > 0 && <div><dt>Discount ({BRAND.promoCode})</dt><dd>−{formatPrice(discount)}</dd></div>}
                <div><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
                <div className="summary__total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
              </dl>
              {shipping > 0 && <p className="summary__hint">Add {formatPrice(BRAND.freeShippingAbove - subtotal)} more for free shipping.</p>}

              {!checkingOut && (
                <button className="btn btn--dark btn--block" onClick={() => setCheckingOut(true)}>Proceed to checkout</button>
              )}
              <Link to="/shop" className="summary__continue">Continue shopping</Link>
            </aside>

            {checkingOut && (
              <form className="checkout form" onSubmit={placeOrder} noValidate>
                <h2>Delivery details</h2>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="k-name">Full name</label>
                    <input id="k-name" value={values.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
                    {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="k-phone">Mobile number</label>
                    <input id="k-phone" type="tel" value={values.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!errors.phone} />
                    {errors.phone && <p className="field-error" role="alert">{errors.phone}</p>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="k-email">Email</label>
                  <input id="k-email" type="email" value={values.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} />
                  {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
                </div>
                <div className="field">
                  <label htmlFor="k-address">Address</label>
                  <input id="k-address" value={values.address} onChange={set('address')} autoComplete="street-address" aria-invalid={!!errors.address} />
                  {errors.address && <p className="field-error" role="alert">{errors.address}</p>}
                </div>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="k-city">City</label>
                    <input id="k-city" value={values.city} onChange={set('city')} autoComplete="address-level2" aria-invalid={!!errors.city} />
                    {errors.city && <p className="field-error" role="alert">{errors.city}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="k-pin">PIN code</label>
                    <input id="k-pin" inputMode="numeric" maxLength={6} value={values.pin} onChange={set('pin')} autoComplete="postal-code" aria-invalid={!!errors.pin} />
                    {errors.pin && <p className="field-error" role="alert">{errors.pin}</p>}
                  </div>
                </div>

                <fieldset className="pay">
                  <legend>Payment</legend>
                  {[['upi', 'UPI'], ['card', 'Credit or debit card'], ['cod', 'Cash on delivery']].map(([val, label]) => (
                    <label key={val} className="radio">
                      <input type="radio" name="payment" value={val} checked={values.payment === val} onChange={set('payment')} />
                      <span>{label}</span>
                    </label>
                  ))}
                </fieldset>

                <button type="submit" className="btn btn--dark btn--block" disabled={placing}>
                  {placing ? 'Placing order…' : `Place order · ${formatPrice(total)}`}
                </button>
              </form>
            )}
          </div>
        )}
      </section>
    </>
  );
}
