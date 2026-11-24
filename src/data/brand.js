// ─────────────────────────────────────────────────────────────
// Single source of truth for branding. Change values here and
// the whole website (header, footer, WhatsApp links, contact
// page, page titles) updates automatically.
// ─────────────────────────────────────────────────────────────
export const BRAND = {
  name: 'ÉLAN',
  suffix: 'Boutique',
  fullName: 'ÉLAN Boutique',
  tagline: 'Considered clothing for the days you remember',
  email: 'hello@elanboutique.example',
  phone: '+91 98765 43210',
  whatsapp: '919876543210', // digits only, with country code
  address: ['24, Heritage Lane, Indiranagar', 'Bengaluru, Karnataka 560038'],
  hours: 'Mon – Sat, 10:30 am – 8:00 pm',
  currency: 'INR',
  freeShippingAbove: 5000,
  shippingFee: 150,
  promoCode: 'ELAN10',
  promoDiscount: 0.1,
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
};

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: BRAND.currency,
    maximumFractionDigits: 0,
  }).format(value);

export const whatsappLink = (message = '') =>
  `https://wa.me/${BRAND.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
