// All photography is referenced from here. Swap these IDs/URLs for
// the client's own photography at any time. Every image has a graceful
// fallback (see components/SmartImage.jsx), so a missing photo never
// breaks the layout.
const u = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const POOLS = {
  sarees: ['1610030469983-98e550d6193c', '1583391733956-3750e0ff4e8b', '1617627143750-d86bc21e42bb'],
  lehengas: ['1595777457583-95e059d581b8', '1612336307429-8a898d10e223', '1583391733981-8b530b5f1dbd'],
  'kurtis-suits': ['1594736797933-d0501ba2fe65', '1583391733956-3750e0ff4e8b', '1610030469983-98e550d6193c'],
  'western-wear': ['1496747611176-843222e1e57c', '1515886657613-9f3515b0c78f', '1469334031218-e382a71b716b', '1539109136881-3be0616acf4b'],
  'bridal-collection': ['1566174053879-31528523f8ae', '1595777457583-95e059d581b8', '1612336307429-8a898d10e223'],
  accessories: ['1535632066927-ab7c9ab60908', '1515562141207-7a88fb7ce338', '1573408301185-9146fe634ad0'],
};

export const productImages = (category, index, w = 900) => {
  const pool = POOLS[category];
  return [0, 1, 2].map((n) => u(pool[(index + n) % pool.length], w));
};

export const IMG = {
  hero: u('1610030469983-98e550d6193c', 1200),
  heroSmall: u('1496747611176-843222e1e57c', 700),
  story: u('1594736797933-d0501ba2fe65', 1000),
  storyAlt: u('1558769132-cb1aea458c5e', 700),
  promo: u('1566174053879-31528523f8ae', 1400),
  aboutHero: u('1558769132-cb1aea458c5e', 1400),
  aboutA: u('1583391733956-3750e0ff4e8b', 900),
  aboutB: u('1515886657613-9f3515b0c78f', 900),
  aboutC: u('1490481651871-ab68de25d43d', 900),
  contact: u('1483985988355-763728e1935b', 1000),
  categories: {
    sarees: u('1610030469983-98e550d6193c', 700),
    lehengas: u('1595777457583-95e059d581b8', 700),
    'kurtis-suits': u('1594736797933-d0501ba2fe65', 700),
    'western-wear': u('1496747611176-843222e1e57c', 700),
    'bridal-collection': u('1566174053879-31528523f8ae', 700),
    accessories: u('1535632066927-ab7c9ab60908', 700),
  },
  collections: {
    'wedding-edit': u('1612336307429-8a898d10e223', 1000),
    'everyday-linen': u('1469334031218-e382a71b716b', 1000),
    'festive-zari': u('1583391733956-3750e0ff4e8b', 1000),
  },
  instagram: [
    u('1539109136881-3be0616acf4b', 600),
    u('1509631179647-0177331693ae', 600),
    u('1487222477894-8943e31ef7b2', 600),
    u('1445205170230-053b83016050', 600),
    u('1572804013309-59a88b7e92f1', 600),
    u('1591369822096-ffd140ec948f', 600),
  ],
  lookbook: {
    heritage: [
      u('1610030469983-98e550d6193c', 1000),
      u('1617627143750-d86bc21e42bb', 800),
      u('1583391733956-3750e0ff4e8b', 800),
      u('1595777457583-95e059d581b8', 1000),
      u('1612336307429-8a898d10e223', 800),
    ],
    modern: [
      u('1496747611176-843222e1e57c', 1000),
      u('1515886657613-9f3515b0c78f', 800),
      u('1469334031218-e382a71b716b', 800),
      u('1539109136881-3be0616acf4b', 1000),
      u('1551163943-3f6a855d1153', 800),
    ],
    bridal: [
      u('1566174053879-31528523f8ae', 1000),
      u('1573408301185-9146fe634ad0', 800),
      u('1515562141207-7a88fb7ce338', 800),
      u('1535632066927-ab7c9ab60908', 1000),
    ],
  },
};
