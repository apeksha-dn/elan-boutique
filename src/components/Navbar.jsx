import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';
import Logo from './Logo';
import SearchOverlay from './SearchOverlay';
import SocialIcons from './SocialIcons';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, wishlistIds } = useShop();
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner container">
        <div className="navbar__left">
          <button className="icon-btn navbar__burger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
            <Menu size={22} strokeWidth={1.4} />
          </button>
          <nav className="navbar__links" aria-label="Primary">
            <div className="navbar__dropdown">
              <NavLink to="/shop" className="navbar__link" end>Shop</NavLink>
              <div className="navbar__menu" role="menu">
                <Link to="/shop" role="menuitem">All pieces</Link>
                {CATEGORIES.map((c) => (
                  <Link key={c.slug} to={`/category/${c.slug}`} role="menuitem">{c.name}</Link>
                ))}
              </div>
            </div>
            <NavLink to="/category/bridal-collection" className="navbar__link">Bridal</NavLink>
            <NavLink to="/lookbook" className="navbar__link">Lookbook</NavLink>
            <NavLink to="/about" className="navbar__link">About</NavLink>
            <NavLink to="/contact" className="navbar__link">Contact</NavLink>
          </nav>
        </div>

        <Logo />

        <div className="navbar__right">
          <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search size={20} strokeWidth={1.4} />
          </button>
          <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlistIds.length} saved`}>
            <Heart size={20} strokeWidth={1.4} />
            {wishlistIds.length > 0 && <span className="badge-dot">{wishlistIds.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label={`Bag, ${count} items`}>
            <ShoppingBag size={20} strokeWidth={1.4} />
            {count > 0 && <span className="badge-dot">{count}</span>}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />
            <motion.aside
              className="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            >
              <div className="drawer__head">
                <Logo />
                <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={22} strokeWidth={1.4} />
                </button>
              </div>
              <nav className="drawer__nav" aria-label="Mobile">
                <p className="drawer__label">Shop</p>
                <Link to="/shop">All pieces</Link>
                {CATEGORIES.map((c) => (
                  <Link key={c.slug} to={`/category/${c.slug}`}>{c.name}</Link>
                ))}
                <p className="drawer__label">Explore</p>
                <Link to="/lookbook">Lookbook</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/wishlist">Wishlist ({wishlistIds.length})</Link>
                <Link to="/cart">Bag ({count})</Link>
              </nav>
              <SocialIcons className="drawer__social" />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
