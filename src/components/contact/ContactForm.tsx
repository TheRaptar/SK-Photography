import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';

const SESSION_TYPES = ['Wedding', 'Portrait', 'Event', 'Commercial', 'Other'];
const CONTACT_EMAIL = 'sivask3002@gmail.com'; // TODO: replace with your real inquiry inbox

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const sessionType = data.get('sessionType') as string;
    const date = data.get('date') as string;
    const message = data.get('message') as string;

    const subject = encodeURIComponent(`Inquiry — ${sessionType || 'Photography session'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSession type: ${sessionType}\nPreferred date: ${date || 'Flexible'}\n\n${message}`
    );

    // No backend: this opens the visitor's own email client with the message pre-filled.
    // Swap for a form service (e.g. Formspree, EmailJS) or your own API if you add a backend later.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Your name" name="name" required />
        <Field label="Email address" name="email" type="email" required />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sessionType" className="block text-[12px] tracking-[0.06em] uppercase text-ink-dim mb-2">
            Session type
          </label>
          <select
            id="sessionType"
            name="sessionType"
            required
            defaultValue=""
            className="w-full bg-transparent border-b border-line-strong py-2.5 text-ink focus:outline-none focus:border-accent transition-colors"
          >
            <option value="" disabled>Select one</option>
            {SESSION_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <Field label="Preferred date (optional)" name="date" type="date" />
      </div>

      <div>
        <label htmlFor="message" className="block text-[12px] tracking-[0.06em] uppercase text-ink-dim mb-2">
          Tell me about it
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Venue, headcount, vision, anything that helps me understand the brief…"
          className="w-full bg-transparent border-b border-line-strong py-2.5 text-ink placeholder:text-ink-dim/70 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2.5 text-[13px] tracking-[0.08em] uppercase bg-ink text-bg px-8 py-4 hover:bg-accent transition-colors"
      >
        Send inquiry <Send size={14} strokeWidth={1.8} />
      </button>

      {submitted && (
        <p className="text-sm text-ink-dim pt-2">
          Your email client should have opened with the message pre-filled — just hit send
          from there. (No backend on this site: nothing is sent automatically.)
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[12px] tracking-[0.06em] uppercase text-ink-dim mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-line-strong py-2.5 text-ink focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
