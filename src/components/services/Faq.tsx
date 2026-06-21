import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../../data/content';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {faqs.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-lg sm:text-xl">{item.question}</span>
              <Plus
                size={18}
                strokeWidth={1.6}
                className={`shrink-0 text-accent transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              />
            </button>
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="text-ink-dim leading-relaxed pb-6 max-w-2xl">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
