import { ExternalLink, Mail, MessageCircle } from 'lucide-react';
import Seo from '../components/shared/Seo';
import ContactForm from '../components/contact/ContactForm';
import MapEmbed from '../components/contact/MapEmbed';

const WHATSAPP_NUMBER = '+447741015848'; // TODO: replace with your real WhatsApp number (UK country code 44, no leading 0)

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch to book a wedding, portrait, event, or commercial photography session."
        path="/contact"
      />

      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">Contact</p>
          <h1 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.12] text-balance">
            Let's talk about your day, your brand, or your idea.
          </h1>
          <p className="text-ink-dim mt-6 leading-relaxed max-w-sm">
            Fill out the form, message on WhatsApp, or email directly — whatever's easiest.
            Replies usually land within two business days.
          </p>

          <div className="mt-12 space-y-5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
            >
              <MessageCircle size={17} strokeWidth={1.6} /> Message on WhatsApp
            </a>
            <a
              href="mailto:sivask3002@gmail.com"
              className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
            >
              <Mail size={17} strokeWidth={1.6} /> sivask3002@gmail.com
            </a>
            <a
              href="https://www.instagram.com/sk03_photography"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
            >
              <ExternalLink size={17} strokeWidth={1.6} /> Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
            >
              <ExternalLink size={17} strokeWidth={1.6} /> Facebook
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <p className="eyebrow mb-2">Studio location</p>
          <p className="text-ink-dim text-sm">London, United Kingdom — available across the UK</p>
        </div>
        <MapEmbed />
      </section>
    </>
  );
}
