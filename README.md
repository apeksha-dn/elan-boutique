# ÉLAN Boutique

A multi-page women's fashion boutique built with React, Vite, React Router, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

## Change the brand
Edit `src/data/brand.js`: name, tagline, phone, email, WhatsApp number (digits with country code), address, social links, shipping rules and promo code. The header, footer, contact page, WhatsApp links and page titles update automatically.

## Change the products and photos
- Products: `src/data/products.js` (one row per product in the `RAW` list).
- Categories, collections, testimonials: `src/data/categories.js`.
- Photography: `src/data/images.js`. Replace the Unsplash IDs with the client's own image URLs (or files in `public/`). If an image fails to load, a neutral placeholder is shown instead.

## Routes
`/` · `/shop` · `/category/:slug` (sarees, lehengas, kurtis-suits, western-wear, bridal-collection, accessories) · `/product/:id` · `/about` · `/lookbook` · `/contact` · `/wishlist` · `/cart`

## Before going live
- Checkout and the contact form are front-end demos. Connect them to a payment gateway and a form/email service (see the comments in `Cart.jsx` and `Contact.jsx`).
- Replace the Google Maps iframe URL in `Contact.jsx` with the boutique's real embed link.
- On a static host, add a rewrite so all paths serve `index.html` (needed for React Router).
