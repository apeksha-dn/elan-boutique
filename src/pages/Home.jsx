import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Truck, Scissors, RefreshCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, COLLECTIONS } from '../data/categories';
import { BRAND, formatPrice } from '../data/brand';
import { IMG } from '../data/images';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SmartImage from '../components/SmartImage';
import SectionHeading from '../components/SectionHeading';
import ProductGrid from '../components/ProductGrid';
import TestimonialSlider from '../components/TestimonialSlider';
import Newsletter from '../components/Newsletter';
import { InstagramIcon } from '../components/SocialIcons';

const newArrivals = [...PRODUCTS].sort((a, b) => a.daysOld - b.daysOld).slice(0, 4);
const bestSellers = [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
const featured = PRODUCTS.find((p) => p.id === 'organza-floral-blush');

export default function Home() {
  useDocumentTitle('');
  const reduce = useReducedMotion();

  // The page's single orchestrated moment: the hero assembles once on load.
  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.14 } } };
  const rise = {
    hidden: reduce ? {} : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  const reveal = {
    hidden: reduce ? {} : { clipPath: 'inset(100% 0 0 0)' },
    show: { clipPath: 'inset(0% 0 0 0)', transition: { duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <motion.div className="hero__inner container" variants={container} initial="hidden" animate="show">
          <div className="hero__copy">
            <motion.p variants={rise} className="hero__kicker">Autumn–Winter collection</motion.p>
            <motion.h1 variants={rise}>Dressed for the occasions you remember.</motion.h1>
            <motion.p variants={rise} className="hero__lead">
              Handwoven silks, quiet embroidery and tailoring that moves with you. Designed in Bengaluru, finished by hand.
            </motion.p>
            <motion.div variants={rise} className="hero__cta">
              <Link to="/shop" className="btn btn--dark">Shop the collection</Link>
              <Link to="/lookbook" className="btn btn--ghost">View lookbook</Link>
            </motion.div>
          </div>

          <div className="hero__art">
            <motion.div variants={reveal} className="hero__arch hero__arch--main">
              <SmartImage src={IMG.hero} alt="Model draped in a silk saree" eager />
            </motion.div>
            <motion.div variants={reveal} className="hero__arch hero__arch--small">
              <SmartImage src={IMG.heroSmall} alt="Model in a satin midi dress" eager />
            </motion.div>
            <motion.div variants={rise} className="hero__tag">
              <span>{featured.name}</span>
              <Link to={`/product/${featured.id}`}>{formatPrice(featured.price)} <ArrowRight size={14} /></Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SERVICE STRIP */}
      <section className="strip container" aria-label="Our promise">
        <div><Truck size={20} strokeWidth={1.3} /><p>Free shipping above {formatPrice(BRAND.freeShippingAbove)}</p></div>
        <div><Scissors size={20} strokeWidth={1.3} /><p>Alterations and bridal fittings</p></div>
        <div><RefreshCcw size={20} strokeWidth={1.3} /><p>7-day exchange on unworn pieces</p></div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="section container">
        <SectionHeading title="Shop by category" text="Six ways into the wardrobe." />
        <ul className="arch-grid">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to={`/category/${c.slug}`} className="arch-tile">
                <SmartImage src={c.image} alt={c.name} ratio="3/4.2" className="arch-tile__img" />
                <span className="arch-tile__name">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section container">
        <SectionHeading title="New arrivals" text="Just off the cutting table." to="/shop?sort=newest" linkLabel="Shop new in" />
        <ProductGrid products={newArrivals} />
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeading title="Featured collections" text="Three edits, curated by our stylists." />
          <div className="collections">
            {COLLECTIONS.map((c, i) => (
              <Link key={c.slug} to={c.to} className={`collection collection--${i + 1}`}>
                <SmartImage src={c.image} alt={c.title} className="collection__img" />
                <div className="collection__text">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span className="text-link">Explore</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section container">
        <SectionHeading title="Best sellers" text="The pieces our clients keep coming back for." to="/shop" />
        <ProductGrid products={bestSellers} />
      </section>

      {/* PROMO BANNER */}
      <section className="promo">
        <SmartImage src={IMG.promo} alt="Bridal couture" className="promo__img" />
        <div className="promo__panel">
          <h2>Your bridal fitting is on us</h2>
          <p>Book a private appointment and receive two complimentary fittings with every bridal order. First-time customers also enjoy 10% off with code <strong>{BRAND.promoCode}</strong>.</p>
          <div className="promo__cta">
            <Link to="/category/bridal-collection" className="btn btn--light">Explore bridal</Link>
            <Link to="/contact" className="btn btn--outline-light">Book a fitting</Link>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="section container story">
        <div className="story__media">
          <SmartImage src={IMG.story} alt="Artisan work in progress" ratio="4/5" className="story__img story__img--a" />
          <SmartImage src={IMG.storyAlt} alt="Fabrics in the studio" ratio="1/1" className="story__img story__img--b" />
        </div>
        <div className="story__copy">
          <h2>Made slowly, worn for years</h2>
          <p>{BRAND.fullName} began in a small Bengaluru studio with one question: why do so many beautiful clothes feel disposable? We work with weavers in Varanasi, Kanchipuram and Chanderi, and with embroiderers who have practised their craft for generations.</p>
          <p>Every piece is cut in small batches, finished by hand and checked twice before it reaches you. We would rather make fewer things, and make them well.</p>
          <Link to="/about" className="text-link">Read our story</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeading title="Kind words" align="center" />
          <TestimonialSlider />
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="section container">
        <SectionHeading title="On Instagram" text={`Tag us and be featured. @${BRAND.name.toLowerCase().replace('é', 'e')}boutique`} />
        <ul className="insta">
          {IMG.instagram.map((src, i) => (
            <li key={src}>
              <a href={BRAND.social.instagram} target="_blank" rel="noreferrer" aria-label={`Open Instagram post ${i + 1}`}>
                <SmartImage src={src} alt={`Instagram post ${i + 1}`} ratio="1/1" />
                <span className="insta__hover"><InstagramIcon /></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Newsletter />
    </>
  );
}
