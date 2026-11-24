import { useState } from 'react';
import { Check } from 'lucide-react';
import { BRAND } from '../data/brand';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter a valid email address, for example name@email.com.');
      return;
    }
    setError('');
    setDone(true);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="container newsletter__inner">
        <h2>Letters from the studio</h2>
        <p>New arrivals, bridal appointments and styling notes, once or twice a month. {BRAND.promoCode} for 10% off your first order.</p>

        {done ? (
          <p className="newsletter__done" role="status"><Check size={18} /> Thank you. Your welcome code is {BRAND.promoCode}.</p>
        ) : (
          <form onSubmit={submit} noValidate className="newsletter__form">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-invalid={!!error}
              aria-describedby={error ? 'nl-error' : undefined}
            />
            <button type="submit" className="btn btn--dark">Subscribe</button>
            {error && <p id="nl-error" className="field-error" role="alert">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
