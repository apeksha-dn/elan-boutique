import { whatsappLink } from '../data/brand';
import { WhatsAppIcon } from './SocialIcons';

export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={whatsappLink('Hello! I would like to know more about your collection.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
