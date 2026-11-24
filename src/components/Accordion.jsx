import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={item.title}>
            <h3>
              <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`acc-${i}`}>
                {item.title}
                <ChevronDown size={18} strokeWidth={1.4} />
              </button>
            </h3>
            <div id={`acc-${i}`} className="accordion__panel" hidden={!isOpen}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
