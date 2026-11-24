import { IMG } from './images';

export const CATEGORIES = [
  {
    slug: 'sarees',
    name: 'Sarees',
    blurb: 'Handwoven silks, featherlight organzas and everyday linens, draped in tones that sit well with daylight.',
    intro: 'Six yards, endlessly reinterpreted.',
    image: IMG.categories.sarees,
  },
  {
    slug: 'lehengas',
    name: 'Lehengas',
    blurb: 'Hand-finished skirts and cholis for sangeets, receptions and the long afternoons in between.',
    intro: 'Movement, volume and quiet embroidery.',
    image: IMG.categories.lehengas,
  },
  {
    slug: 'kurtis-suits',
    name: 'Kurtis & Suits',
    blurb: 'Cut for comfort, finished by hand. Chikankari, block prints and gota work for every day of the week.',
    intro: 'Easy shapes you will reach for first.',
    image: IMG.categories['kurtis-suits'],
  },
  {
    slug: 'western-wear',
    name: 'Western Wear',
    blurb: 'Tailored dresses, co-ords and separates in natural fabrics and a restrained palette.',
    intro: 'Clean lines, softly tailored.',
    image: IMG.categories['western-wear'],
  },
  {
    slug: 'bridal-collection',
    name: 'Bridal Collection',
    blurb: 'Made-to-measure bridal couture with heirloom zari, pearl and zardozi. Fittings by appointment.',
    intro: 'Pieces made to be handed down.',
    image: IMG.categories['bridal-collection'],
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    blurb: 'Kundan, polki and pearl jewellery, potli bags and silk dupattas to finish the look.',
    intro: 'The finishing touch.',
    image: IMG.categories.accessories,
  },
];

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);

export const COLLECTIONS = [
  {
    slug: 'wedding-edit',
    title: 'The Wedding Edit',
    text: 'Lehengas and sarees for the guest list that matters.',
    to: '/category/lehengas',
    image: IMG.collections['wedding-edit'],
  },
  {
    slug: 'everyday-linen',
    title: 'Everyday Linen',
    text: 'Breathable co-ords and handloom drapes for warm days.',
    to: '/category/western-wear',
    image: IMG.collections['everyday-linen'],
  },
  {
    slug: 'festive-zari',
    title: 'Festive Zari',
    text: 'Gold-thread weaves that catch the lamp light.',
    to: '/category/sarees',
    image: IMG.collections['festive-zari'],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Ananya R.',
    place: 'Bengaluru',
    text: 'My bridesmaid lehenga needed three fittings and the team never once rushed me. It photographed beautifully and I have worn the choli again since.',
  },
  {
    name: 'Meera K.',
    place: 'Mysuru',
    text: 'The Chanderi saree arrived folded in tissue with a handwritten note. The colour was exactly as shown, which almost never happens online.',
  },
  {
    name: 'Shruti P.',
    place: 'Hyderabad',
    text: 'I messaged on WhatsApp at night about sizing and got a thoughtful reply the next morning. The linen co-ord fits like it was made for me.',
  },
  {
    name: 'Divya N.',
    place: 'Chennai',
    text: 'Quality you can feel in the stitching. I have bought a Kanjivaram and a potli bag and both have been repeatedly complimented.',
  },
];
