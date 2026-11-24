import { Link, Navigate, useParams } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, getCategory } from '../data/categories';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductBrowser from '../components/ProductBrowser';
import SmartImage from '../components/SmartImage';

export default function Category() {
  const { slug } = useParams();
  const category = getCategory(slug);
  useDocumentTitle(category?.name);

  if (!category) return <Navigate to="/404" replace />;

  const products = PRODUCTS.filter((p) => p.category === slug);

  return (
    <>
      <header className="cat-hero">
        <div className="container cat-hero__inner">
          <div>
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: category.name }]} />
            <h1>{category.name}</h1>
            <p className="cat-hero__intro">{category.intro}</p>
            <p>{category.blurb}</p>
          </div>
          <SmartImage src={category.image} alt={category.name} ratio="4/5" className="cat-hero__img" eager />
        </div>
      </header>

      <nav className="cat-switch container" aria-label="Categories">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} to={`/category/${c.slug}`} className={c.slug === slug ? 'is-active' : ''} aria-current={c.slug === slug ? 'page' : undefined}>
            {c.name}
          </Link>
        ))}
      </nav>

      <ProductBrowser key={slug} products={products} lockCategory />
    </>
  );
}
