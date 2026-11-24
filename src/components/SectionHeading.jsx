import { Link } from 'react-router-dom';

export default function SectionHeading({ title, text, to, linkLabel = 'View all', align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {to && <Link to={to} className="text-link">{linkLabel}</Link>}
    </div>
  );
}
