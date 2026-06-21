import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '+447741015848'; // TODO: replace with your real WhatsApp number (UK country code 44, no leading 0, no symbols)
const DEFAULT_MESSAGE = 'Hi! I\u2019d love to ask about booking a session.';

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Message on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg shadow-black/20 hover:scale-105 transition-transform"
    >
      <MessageCircle size={24} strokeWidth={1.8} fill="white" className="text-[#25D366]" />
    </a>
  );
}
