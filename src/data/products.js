import { productImages } from './images';

const SWATCH = {
  Ivory: '#F3EBDD', Champagne: '#E3D2B5', Sand: '#D8C7A8', Oat: '#E4D9C4', Ecru: '#EDE4D0',
  White: '#FAF7F1', Blush: '#E8CFC4', 'Dusty Rose': '#D4A5A0', Peach: '#EBC3A5', Mocha: '#8B6B55',
  Sage: '#A8B29A', Olive: '#7C7F5B', Mint: '#BFD0BE', Indigo: '#3E4A6B', Maroon: '#6E2A2F',
  Wine: '#5B2438', Crimson: '#8E2A2C', Gold: '#C9A55C', Teal: '#4C6E6B', Black: '#26211E',
  Rosewood: '#8A4B48', 'Antique Gold': '#B8975A', Pearl: '#EFE9E0', Brown: '#6B5443',
};

const sw = (...names) => names.map((name) => ({ name, hex: SWATCH[name] || '#CDB99A' }));

const APPAREL = ['XS', 'S', 'M', 'L', 'XL'];
const ONE = ['Free size'];

const COPY = {
  sarees: {
    details: ['6.3 m including unstitched blouse piece', 'Handwoven by master weavers', 'Includes fall and pico on request', 'Blouse piece: 0.8 m'],
    care: ['Dry clean only', 'Store folded in muslin, refold every few months', 'Keep away from direct sunlight and perfume'],
  },
  lehengas: {
    details: ['Three-piece set: lehenga, choli, dupatta', 'Fully lined with cotton and can-can', 'Adjustable drawstring waist', 'Alterations available within 7 days'],
    care: ['Dry clean only', 'Store hung or rolled in muslin', 'Spot-clean embroidery with a soft cloth'],
  },
  'kurtis-suits': {
    details: ['Regular fit, relaxed through the body', 'Set includes matching bottoms where shown', 'Side pockets', 'Model is 5\'7" and wears size S'],
    care: ['Gentle hand wash in cold water or dry clean', 'Wash separately for the first two washes', 'Iron on reverse at medium heat'],
  },
  'western-wear': {
    details: ['Tailored fit, true to size', 'Fully lined where noted', 'Concealed zip closure', 'Model is 5\'8" and wears size S'],
    care: ['Cold gentle wash or dry clean', 'Do not tumble dry', 'Steam to remove creases'],
  },
  'bridal-collection': {
    details: ['Made to measure, 4 to 6 weeks', 'Hand embroidery on every panel', 'Includes dust cover and garment bag', 'Two complimentary fittings'],
    care: ['Dry clean by a specialist only', 'Store flat in acid-free tissue', 'Avoid plastic covers for long storage'],
  },
  accessories: {
    details: ['Handcrafted by artisan partners', 'Nickel-free base metal', 'Presented in a keepsake box', 'Each piece varies slightly'],
    care: ['Keep dry and away from perfume', 'Wipe with a soft cloth after wearing', 'Store in the pouch provided'],
  },
};

// [slug, name, category, price, compareAt, colors, sizes, fabric, popularity, daysOld, badge, description]
const RAW = [
  ['banarasi-silk-ivory-gold', 'Banarasi Silk Saree in Ivory Gold', 'sarees', 18900, 21500, sw('Ivory', 'Champagne'), ONE, 'pure katan silk', 94, 40, 'Bestseller', 'A katan silk saree with a hand-woven kadhwa border in antique gold zari. The ivory ground keeps it light enough for a day wedding.'],
  ['kanjivaram-maroon', 'Kanjivaram Silk Saree in Maroon', 'sarees', 24500, null, sw('Maroon', 'Wine'), ONE, 'Kanjivaram silk', 88, 75, 'Bestseller', 'Woven in Kanchipuram with a contrast temple border and a rich pallu. Heavy, glossy and made to last through generations.'],
  ['chanderi-sage', 'Chanderi Cotton Silk Saree in Sage', 'sarees', 7900, null, sw('Sage', 'Sand'), ONE, 'Chanderi cotton silk', 71, 6, 'New', 'Sheer, airy and lightly lustrous. Tiny gold buttis scatter across a soft sage ground.'],
  ['organza-floral-blush', 'Hand-Painted Organza Saree in Blush', 'sarees', 9800, 11200, sw('Blush', 'Ivory'), ONE, 'silk organza', 79, 12, 'New', 'Floral motifs painted by hand on crisp silk organza. Drapes with structure and moves like air.'],
  ['linen-handloom-sand', 'Handloom Linen Saree in Sand', 'sarees', 5400, null, sw('Sand', 'Oat', 'Olive'), ONE, 'handloom linen', 63, 120, null, 'A weekday saree with a quiet temple border. Soft from the first wear and easy to carry through a long day.'],
  ['tussar-champagne', 'Tussar Silk Saree in Champagne', 'sarees', 12600, null, sw('Champagne', 'Antique Gold'), ONE, 'Bhagalpur tussar silk', 68, 33, null, 'Textured tussar with a natural matte sheen, finished with hand-embroidered running stitch on the border.'],

  ['zardozi-dusty-rose', 'Zardozi Lehenga Set in Dusty Rose', 'lehengas', 32500, 36000, sw('Dusty Rose', 'Blush'), APPAREL, 'raw silk and net', 91, 18, 'Bestseller', 'Fine zardozi in antique gold on a dusty rose skirt, paired with a structured choli and a scalloped net dupatta.'],
  ['mirror-work-ivory', 'Mirror Work Lehenga in Ivory', 'lehengas', 21800, null, sw('Ivory', 'Champagne'), APPAREL, 'cotton silk', 74, 52, null, 'Shisha mirror work stitched by hand across a soft ivory skirt. Made for mehendi afternoons.'],
  ['velvet-festive-wine', 'Velvet Festive Lehenga in Wine', 'lehengas', 28900, null, sw('Wine', 'Black'), APPAREL, 'silk velvet', 82, 9, 'New', 'Deep wine velvet with gold thread borders, designed for winter weddings and receptions.'],
  ['organza-pastel-mint', 'Organza Pastel Lehenga in Mint', 'lehengas', 19500, 22000, sw('Mint', 'Blush'), APPAREL, 'layered organza', 66, 28, null, 'Layers of organza on a mint base with tonal thread work. Light enough to dance in.'],
  ['pleated-crop-champagne', 'Pleated Crop Lehenga Set in Champagne', 'lehengas', 16800, null, sw('Champagne', 'Sand'), APPAREL, 'satin crepe', 85, 4, 'New', 'A modern knife-pleated skirt with a cropped choli. A lighter route into festive dressing.'],
  ['brocade-gold', 'Banarasi Brocade Lehenga in Gold', 'lehengas', 26400, null, sw('Gold', 'Antique Gold'), APPAREL, 'Banarasi brocade', 77, 61, null, 'Woven brocade in a traditional jaal pattern, cut with a generous flare and finished with a heavy hem.'],

  ['chikankari-white', 'Chikankari Straight Kurta Set in White', 'kurtis-suits', 4800, null, sw('White', 'Ivory', 'Blush'), APPAREL, 'mul cotton', 96, 22, 'Bestseller', 'Lucknowi chikankari worked by hand on featherlight mul cotton. Includes matching straight pants.'],
  ['anarkali-rosewood', 'Anarkali Suit in Rosewood', 'kurtis-suits', 8900, 9900, sw('Rosewood', 'Olive'), APPAREL, 'georgette', 72, 15, null, 'A floor-skimming anarkali with tonal thread embroidery at the yoke. Comes with churidar and dupatta.'],
  ['block-print-indigo', 'Block Print Cotton Kurti in Indigo', 'kurtis-suits', 2200, null, sw('Indigo', 'Sand'), APPAREL, 'Jaipur cotton', 80, 90, null, 'Hand block printed in Sanganer with natural dyes. Soft, breathable and easy to wash.'],
  ['palazzo-olive', 'Silk Palazzo Suit Set in Olive', 'kurtis-suits', 6900, null, sw('Olive', 'Mocha'), APPAREL, 'silk blend', 61, 8, 'New', 'A short silk kurta with wide palazzos and a printed dupatta. Dressy without trying too hard.'],
  ['angrakha-sand', 'Angrakha Kurta in Sand', 'kurtis-suits', 3400, null, sw('Sand', 'Ecru'), APPAREL, 'cotton linen', 58, 70, null, 'A wrap-front angrakha with delicate tie fastenings. Wear with trousers or churidar.'],
  ['gota-sharara-peach', 'Gota Patti Sharara Suit in Peach', 'kurtis-suits', 11200, 12800, sw('Peach', 'Blush'), APPAREL, 'chanderi and georgette', 76, 20, null, 'Gota patti appliqué along the hem and sleeves, with a flared sharara. Made for festive lunches.'],

  ['satin-slip-champagne', 'Satin Slip Midi Dress in Champagne', 'western-wear', 5900, null, sw('Champagne', 'Black', 'Sage'), APPAREL, 'heavy satin', 92, 5, 'New', 'A bias-cut slip dress with adjustable straps and a fluid drape. Dress up with heels or down with a blazer.'],
  ['linen-coord-oat', 'Linen Co-ord Set in Oat', 'western-wear', 6400, null, sw('Oat', 'Sage', 'Indigo'), APPAREL, 'European linen', 87, 35, 'Bestseller', 'A relaxed shirt and wide-leg trouser set in washed linen. Gets better with every wear.'],
  ['blazer-dress-mocha', 'Tailored Blazer Dress in Mocha', 'western-wear', 8200, 9400, sw('Mocha', 'Black'), APPAREL, 'wool blend', 64, 47, null, 'Double-breasted, sharply tailored and cut to the knee. Made for meetings that run into dinner.'],
  ['wrap-maxi-sage', 'Wrap Maxi Dress in Sage', 'western-wear', 4900, null, sw('Sage', 'Ivory'), APPAREL, 'viscose crepe', 70, 14, null, 'A self-tie wrap with flutter sleeves and a flowing hem. Forgiving, flattering and easy to pack.'],
  ['pleated-trousers-ivory', 'Pleated Wide-Leg Trousers in Ivory', 'western-wear', 3600, null, sw('Ivory', 'Black', 'Mocha'), APPAREL, 'crepe', 59, 80, null, 'High-rise, front-pleated and fully lined. A foundation piece for the capsule wardrobe.'],
  ['silk-blouse-ecru', 'Silk Blouse in Ecru', 'western-wear', 4200, null, sw('Ecru', 'Blush'), APPAREL, 'mulberry silk', 67, 11, 'New', 'A fluid blouse with pearl buttons and a gently relaxed shoulder. Wear it tucked or loose.'],

  ['heirloom-bridal-crimson', 'Heirloom Bridal Lehenga in Crimson', 'bridal-collection', 89000, null, sw('Crimson', 'Maroon'), APPAREL, 'raw silk with zardozi', 90, 30, 'Bestseller', 'Over 400 hours of hand embroidery across the skirt, choli and double dupatta. Made to measure.'],
  ['ivory-bridal-cape', 'Ivory Bridal Lehenga with Cape', 'bridal-collection', 74500, 79000, sw('Ivory', 'Champagne'), APPAREL, 'tulle and pearl work', 83, 16, 'New', 'A pearl-embroidered ivory lehenga finished with a sheer cape. Designed for a contemporary ceremony.'],
  ['kanjivaram-bridal', 'Kanjivaram Bridal Saree in Gold and Red', 'bridal-collection', 58000, null, sw('Crimson', 'Gold'), ONE, 'pure zari Kanjivaram', 78, 65, null, 'Pure zari woven in Kanchipuram with a deep red body and a gold pallu. The classic South Indian bride.'],
  ['reception-gown-champagne', 'Zari Reception Gown in Champagne', 'bridal-collection', 46500, null, sw('Champagne', 'Black'), APPAREL, 'silk crepe with zari', 69, 25, null, 'A column gown with a structured bodice and zari detailing. For the evening after the ceremony.'],
  ['tissue-bridal-gold', 'Tissue Silk Bridal Saree in Gold', 'bridal-collection', 39800, null, sw('Gold', 'Antique Gold'), ONE, 'tissue silk', 73, 44, null, 'A glowing tissue silk drape with a scalloped border. Light on the shoulders through a long day.'],
  ['pearl-sharara-bridal', 'Pearl Embroidered Bridal Sharara', 'bridal-collection', 52000, 56000, sw('Ivory', 'Blush'), APPAREL, 'organza silk', 65, 7, 'New', 'Pearl and sequin embroidery on a sharara set with a long kurta and tulle dupatta.'],

  ['kundan-choker', 'Kundan Choker Set', 'accessories', 6800, null, sw('Antique Gold'), ONE, 'gold-plated brass with kundan', 89, 38, 'Bestseller', 'A statement choker with matching earrings, set with kundan and freshwater pearls.'],
  ['pearl-drops', 'Pearl Drop Earrings', 'accessories', 2400, null, sw('Pearl', 'Antique Gold'), ONE, 'freshwater pearl', 84, 10, 'New', 'Lightweight drops with a single baroque pearl. Easy enough to wear every day.'],
  ['potli-embroidered', 'Embroidered Potli Bag', 'accessories', 3200, 3600, sw('Wine', 'Champagne', 'Sage'), ONE, 'silk with zari embroidery', 75, 55, null, 'A drawstring potli with hand embroidery and a tassel. Holds a phone, keys and lipstick.'],
  ['silk-dupatta-ivory', 'Silk Dupatta in Ivory with Zari', 'accessories', 3900, null, sw('Ivory', 'Blush', 'Sage'), ONE, 'pure silk', 62, 27, null, 'A silk dupatta with a zari border to lift a plain kurta or lehenga.'],
  ['polki-tikka', 'Polki Maang Tikka', 'accessories', 2900, null, sw('Antique Gold'), ONE, 'gold-plated silver with polki', 57, 3, 'New', 'A delicate maang tikka with uncut polki stones and a pearl drop.'],
  ['temple-bangles', 'Temple Bangle Set of Six', 'accessories', 2100, null, sw('Antique Gold', 'Gold'), ['2.4', '2.6', '2.8'], 'antique-finish brass', 60, 95, null, 'Six slim bangles with a temple motif. Stack with silk or wear on their own.'],
];

const indexByCategory = {};

export const PRODUCTS = RAW.map(([id, name, category, price, compareAt, colors, sizes, fabric, popularity, daysOld, badge, description]) => {
  const i = (indexByCategory[category] = (indexByCategory[category] ?? -1) + 1);
  return {
    id, name, category, price, compareAt, colors, sizes, fabric, popularity, daysOld, badge, description,
    images: productImages(category, i, 900),
    thumbs: productImages(category, i, 500),
    details: [`Fabric: ${fabric}`, ...COPY[category].details],
    care: COPY[category].care,
  };
});

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

export const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
