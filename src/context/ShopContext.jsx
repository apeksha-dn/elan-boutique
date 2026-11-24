import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getProduct } from '../data/products';
import { BRAND } from '../data/brand';

const ShopContext = createContext(null);

const lineKey = (id, size, color) => `${id}__${size || '-'}__${color || '-'}`;

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('elan.cart.v1', []);
  const [wishlistIds, setWishlistIds] = useLocalStorage('elan.wishlist.v1', []);
  const [toast, setToast] = useState(null);

  const notify = useCallback((message) => {
    setToast({ message, id: Date.now() });
  }, []);

  const addToCart = useCallback(
    ({ id, size, color, qty = 1 }) => {
      const key = lineKey(id, size, color);
      setCartItems((items) => {
        const found = items.find((i) => i.key === key);
        if (found) return items.map((i) => (i.key === key ? { ...i, qty: Math.min(10, i.qty + qty) } : i));
        return [...items, { key, id, size, color, qty }];
      });
      notify('Added to your bag');
    },
    [setCartItems, notify]
  );

  const updateQty = useCallback(
    (key, qty) => setCartItems((items) => items.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i))),
    [setCartItems]
  );

  const removeFromCart = useCallback(
    (key) => {
      setCartItems((items) => items.filter((i) => i.key !== key));
      notify('Removed from your bag');
    },
    [setCartItems, notify]
  );

  const clearCart = useCallback(() => setCartItems([]), [setCartItems]);

  const toggleWishlist = useCallback(
    (id) => {
      const has = wishlistIds.includes(id);
      setWishlistIds(has ? wishlistIds.filter((x) => x !== id) : [...wishlistIds, id]);
      notify(has ? 'Removed from wishlist' : 'Saved to wishlist');
    },
    [wishlistIds, setWishlistIds, notify]
  );

  const removeFromWishlist = useCallback((id) => setWishlistIds((ids) => ids.filter((x) => x !== id)), [setWishlistIds]);

  const value = useMemo(() => {
    // Drop lines whose product no longer exists in the catalogue.
    const lines = cartItems
      .map((i) => ({ ...i, product: getProduct(i.id) }))
      .filter((i) => i.product);
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= BRAND.freeShippingAbove ? 0 : BRAND.shippingFee;
    const wishlist = wishlistIds.map(getProduct).filter(Boolean);

    return {
      lines, subtotal, count, shipping,
      wishlist, wishlistIds,
      isWishlisted: (id) => wishlistIds.includes(id),
      addToCart, updateQty, removeFromCart, clearCart,
      toggleWishlist, removeFromWishlist,
      toast, notify, dismissToast: () => setToast(null),
    };
  }, [cartItems, wishlistIds, toast, addToCart, updateQty, removeFromCart, clearCart, toggleWishlist, removeFromWishlist, notify]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
};
