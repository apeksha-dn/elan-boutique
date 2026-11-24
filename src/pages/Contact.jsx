import { useState } from 'react';
import { Check, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND, whatsappLink } from '../data/brand';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import SocialIcons, { WhatsAppIcon } from '../components/SocialIcons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+?91[\s-]?)?[6-9]\d{9}$/;

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (v.phone.trim() && !PHONE_RE.test(v.phone.replace(/\s/g, ''))) e.phone = 'Enter a 10-digit Indian mobile number.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
  return e;
};

export default function Contact() {
  useDocumentTitle('Contact');
  const [values, setValues] = useState({ name: '', email: '', phone: '', topic: 'Product enquiry', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    // Replace this timeout with a real API call or form service.
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 700);
  };

  return (
    <>
      <header className="page-head container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
        <h1>Get in touch</h1>
        <p>Questions about sizing, fabrics or a bridal appointment? We usually reply within a day.</p>
      </header>

      <section className="contact container">
        <div className="contact__form-wrap">
          {sent ? (
            <div className="form-success" role="status">
              <Check size={28} strokeWidth={1.2} />
              <h2>Thank you, {values.name.split(' ')[0]}.</h2>
              <p>Your message is with our team. We will write back to {values.email} soon.</p>
              <button className="btn btn--ghost" onClick={() => { setSent(false); setValues({ name: '', email: '', phone: '', topic: 'Product enquiry', message: '' }); }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="form">
              <div className="form__row">
                <div className="field">
                  <label htmlFor="c-name">Full name</label>
                  <input id="c-name" value={values.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
                  {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" value={values.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} />
                  {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
                </div>
              </div>
              <div className="form__row">
                <div className="field">
                  <label htmlFor="c-phone">Phone (optional)</label>
                  <input id="c-phone" type="tel" value={values.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!errors.phone} />
                  {errors.phone && <p className="field-error" role="alert">{errors.phone}</p>}
                </div>
                <div className="field">
                  <label htmlFor="c-topic">Topic</label>
                  <select id="c-topic" value={values.topic} onChange={set('topic')}>
                    <option>Product enquiry</option>
                    <option>Bridal appointment</option>
                    <option>Order support</option>
                    <option>Alterations</option>
                    <option>Something else</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-msg">Message</label>
                <textarea id="c-msg" rows={6} value={values.message} onChange={set('message')} aria-invalid={!!errors.message} />
                {errors.message && <p className="field-error" role="alert">{errors.message}</p>}
              </div>
              <button type="submit" className="btn btn--dark" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
            </form>
          )}
        </div>

        <aside className="contact__info">
          <h2>Visit the boutique</h2>
          <ul>
            <li><MapPin size={18} strokeWidth={1.3} /><span>{BRAND.address.map((l) => <span key={l} className="block">{l}</span>)}</span></li>
            <li><Phone size={18} strokeWidth={1.3} /><a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a></li>
            <li><Mail size={18} strokeWidth={1.3} /><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            <li><Clock size={18} strokeWidth={1.3} /><span>{BRAND.hours}</span></li>
          </ul>
          <a className="btn btn--dark contact__wa" href={whatsappLink('Hello! I would like to speak with the boutique team.')} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} /> Chat on WhatsApp
          </a>
          <div className="contact__social">
            <p>Follow along</p>
            <SocialIcons />
          </div>
        </aside>
      </section>

      <section className="container map">
        {/* Placeholder embed. Replace the src with the boutique's real Google Maps "Embed a map" URL. */}
        <iframe
          title="Boutique location map (placeholder)"
          src="https://maps.google.com/maps?q=Indiranagar%2C%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
