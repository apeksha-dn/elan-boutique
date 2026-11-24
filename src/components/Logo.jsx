import { Link } from 'react-router-dom';
import { BRAND } from '../data/brand';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={`${BRAND.fullName} home`}>
      <span className="logo__name">{BRAND.name}</span>
      <span className="logo__suffix">{BRAND.suffix}</span>
    </Link>
  );
}
