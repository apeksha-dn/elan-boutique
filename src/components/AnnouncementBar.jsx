import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { BRAND, formatPrice } from '../data/brand';

const MESSAGES = [
  `Complimentary shipping on orders above ${formatPrice(BRAND.freeShippingAbove)}`,
  `Use code ${BRAND.promoCode} for 10% off your first order`,
  'Bridal fittings by appointment, call or message us on WhatsApp',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="announce" role="region" aria-label="Announcements">
      <p key={index} className="announce__text" aria-live="polite">{MESSAGES[index]}</p>
      <button className="announce__close" onClick={() => setVisible(false)} aria-label="Dismiss announcement">
        <X size={14} />
      </button>
    </div>
  );
}
