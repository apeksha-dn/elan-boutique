import { BRAND } from '../data/brand';

const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const InstagramIcon = () => (
  <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" /></svg>
);
export const FacebookIcon = () => (
  <svg {...common}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z" /></svg>
);
export const YoutubeIcon = () => (
  <svg {...common}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9.5 5 2.5-5 2.5v-5Z" /></svg>
);
export const WhatsAppIcon = ({ size = 18 }) => (
  <svg {...common} width={size} height={size}><path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1l-4.7 1.4Z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2L9 8.5Z" /></svg>
);

export default function SocialIcons({ className = '' }) {
  const items = [
    { label: 'Instagram', href: BRAND.social.instagram, Icon: InstagramIcon },
    { label: 'Facebook', href: BRAND.social.facebook, Icon: FacebookIcon },
    { label: 'YouTube', href: BRAND.social.youtube, Icon: YoutubeIcon },
  ];
  return (
    <ul className={`social ${className}`}>
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
