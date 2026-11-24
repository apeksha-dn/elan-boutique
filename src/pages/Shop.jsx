import useDocumentTitle from '../hooks/useDocumentTitle';
import { PRODUCTS } from '../data/products';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductBrowser from '../components/ProductBrowser';

export default function Shop() {
  useDocumentTitle('Shop all');
  return (
    <>
      <header className="page-head container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />
        <h1>The collection</h1>
        <p>Every piece, from everyday linen to bridal couture.</p>
      </header>
      <ProductBrowser products={PRODUCTS} />
    </>
  );
}
