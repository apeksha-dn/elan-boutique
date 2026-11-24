import { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/categories';

export default function TestimonialSlider() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (d) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="testimonial">
      <Quote size={30} strokeWidth={1} aria-hidden="true" />
      <blockquote key={i} className="testimonial__quote">
        <p>{t.text}</p>
        <footer>{t.name}, {t.place}</footer>
      </blockquote>
      <div className="testimonial__controls">
        <button className="icon-btn icon-btn--ring" onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowLeft size={18} /></button>
        <ol aria-label="Testimonials">
          {TESTIMONIALS.map((x, n) => (
            <li key={x.name}>
              <button className={n === i ? 'is-active' : ''} onClick={() => setI(n)} aria-label={`Show testimonial ${n + 1}`} aria-current={n === i} />
            </li>
          ))}
        </ol>
        <button className="icon-btn icon-btn--ring" onClick={() => go(1)} aria-label="Next testimonial"><ArrowRight size={18} /></button>
      </div>
    </div>
  );
}
