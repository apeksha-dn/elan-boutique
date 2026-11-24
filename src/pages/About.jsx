import { Link } from 'react-router-dom';
import { Gem, Leaf, Scissors } from 'lucide-react';
import { BRAND } from '../data/brand';
import { IMG } from '../data/images';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SmartImage from '../components/SmartImage';
import Breadcrumbs from '../components/Breadcrumbs';

const PRINCIPLES = [
  { Icon: Gem, title: 'Craft over volume', text: 'Small batches, hand finishing and a second quality check on every piece before it ships.' },
  { Icon: Leaf, title: 'Natural fibres first', text: 'Silk, cotton, linen and wool that breathe, age well and can be repaired instead of replaced.' },
  { Icon: Scissors, title: 'Made to fit real people', text: 'Free alterations on request, honest size guidance and made-to-measure for bridal.' },
];

export default function About() {
  useDocumentTitle('Our story');
  return (
    <>
      <header className="about-hero">
        <SmartImage src={IMG.aboutHero} alt="Inside the boutique" className="about-hero__img" eager />
        <div className="about-hero__text container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
          <h1>A boutique built on patience</h1>
        </div>
      </header>

      <section className="section container about-intro">
        <p className="lead">{BRAND.fullName} is a women's boutique in Bengaluru for people who like their clothes to feel considered. We design a small collection each season and finish every garment by hand.</p>
        <p>We opened our doors with a rail of sarees and a single sewing table. Today the studio has grown, but the habit has not changed: we still meet every client, still choose fabrics by touch and still say no to anything we would not wear ourselves.</p>
      </section>

      <section className="section container about-story">
        <SmartImage src={IMG.aboutA} alt="Handloom textiles" ratio="4/5" />
        <div>
          <h2>Our story</h2>
          <p>Our founder grew up watching her grandmother choose a saree for each occasion, folding it in muslin afterwards and passing it on. That ritual of care and continuity shapes everything we make.</p>
          <p>We partner with weaving clusters in Varanasi, Kanchipuram and Chanderi, and with embroidery workshops in Lucknow and Jaipur. Fair wages and long relationships matter more to us than the lowest quote.</p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container mv">
          <div>
            <h2>Our mission</h2>
            <p>To make clothing that is worth keeping: beautifully made, fairly produced and comfortable enough to reach for again and again.</p>
          </div>
          <div>
            <h2>Our vision</h2>
            <p>A wardrobe culture where craft is valued, artisans are visible and a wedding outfit becomes an heirloom instead of a one-time purchase.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="center-title">Our fashion philosophy</h2>
        <ul className="principles">
          {PRINCIPLES.map(({ Icon, title, text }) => (
            <li key={title}>
              <Icon size={26} strokeWidth={1.1} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container about-gallery" aria-label="Editorial images">
        <SmartImage src={IMG.aboutB} alt="Editorial portrait" ratio="3/4" />
        <SmartImage src={IMG.aboutC} alt="Studio details" ratio="3/4" />
        <SmartImage src={IMG.story} alt="Artisan at work" ratio="3/4" />
      </section>

      <section className="section container about-cta">
        <h2>Come and see it in person</h2>
        <p>Visit the boutique, try on a few pieces and let us pour you some chai.</p>
        <div>
          <Link to="/contact" className="btn btn--dark">Plan a visit</Link>
          <Link to="/shop" className="btn btn--ghost">Shop online</Link>
        </div>
      </section>
    </>
  );
}
