import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../data/brand';
import { CATEGORIES } from '../data/categories';
import Logo from './Logo';
import SocialIcons from './SocialIcons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>{BRAND.tagline}. Designed in Bengaluru and made with artisan partners across India.</p>
          <SocialIcons />
        </div>

        <div>
          <h3>Shop</h3>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.slug}><Link to={`/category/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Boutique</h3>
          <ul>
            <li><Link to="/about">Our story</Link></li>
            <li><Link to="/lookbook">Lookbook</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Shopping bag</Link></li>
          </ul>
        </div>

        <div>
          <h3>Care &amp; service</h3>
          <ul>
            <li>Free shipping above ₹{BRAND.freeShippingAbove.toLocaleString('en-IN')}</li>
            <li>7-day exchange on unworn pieces</li>
            <li>Complimentary bridal fittings</li>
            <li>Alterations on request</li>
          </ul>
        </div>

        <div className="footer__contact">
          <h3>Visit us</h3>
          <ul>
            <li><MapPin size={16} strokeWidth={1.4} /> <span>{BRAND.address.join(', ')}</span></li>
            <li><Phone size={16} strokeWidth={1.4} /> <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a></li>
            <li><Mail size={16} strokeWidth={1.4} /> <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            <li className="footer__hours">{BRAND.hours}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
        <p>Privacy · Terms · Shipping &amp; returns</p>
      </div>
    </footer>
  );
}
