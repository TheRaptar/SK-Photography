import { motion } from 'framer-motion';
import Seo from '../components/shared/Seo';

// TODO: replace with your real milestones — these are placeholders only,
// not verified claims, since fabricated awards/stats shouldn't ship on a
// real business's site.
const ACHIEVEMENTS = [
  { year: '2021', label: 'Started shooting full-time, after years of freelancing nights and weekends.' },
  { year: '2022', label: 'First booked wedding season — fully booked out three months running.' },
  { year: '2023', label: 'Expanded into commercial and event photography alongside weddings and portraits.' },
  { year: '2024', label: 'Began shooting trade events, including The National Wedding Show.' },
  { year: '2025', label: 'Continuing to build out a portfolio across weddings, portraits, street, and landscape work.' },
];

const EQUIPMENT = [
  'Full-frame mirrorless bodies (dual-camera coverage on every wedding)',
  'Prime lenses from 24mm to 135mm, plus a dedicated macro for detail work',
  'Off-camera flash and continuous lighting for studio and reception coverage',
  'Drone coverage available for venues and landscape work',
  'Two-stage backup workflow — every card cloned on-site before the day ends',
];

const SERVICES = [
  'Wedding & pre-wedding photography',
  'Portrait & headshot sessions',
  'Corporate events & conferences',
  'Street & documentary series',
  'Landscape & travel photography',
  'Commercial & product campaigns',
];

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Photographer biography, experience, achievements, equipment, and services offered."
        path="/about"
      />

      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">About</p>
            <h1 className="font-display text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.1] text-balance">
              Behind the camera, still chasing the same kind of light.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full max-w-sm ml-auto" style={{ background: 'linear-gradient(160deg,#b08968,#19140f)' }} />
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-line">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p className="text-ink-dim leading-relaxed text-lg">
            I picked up a camera to document a friend's wedding because the booked
            photographer cancelled. That weekend changed what I wanted to do. Since then
            it's been Sikh wedding ceremonies, portrait sessions at Tower Bridge and Hyde
            Park, bridal trade shows, and quiet mornings on quiet streets with nothing
            booked at all.
          </p>
          <p className="text-ink-dim leading-relaxed text-lg mt-6">
            What hasn't changed is the standard: show up early, watch the light before
            touching the camera, and never hand over a frame I wouldn't want in my own
            family's album.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
        <p className="eyebrow mb-12">Experience &amp; achievements</p>
        <div className="space-y-0">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-[5rem_1fr] sm:grid-cols-[7rem_1fr] gap-6 py-7 border-t border-line last:border-b"
            >
              <span className="font-display text-2xl text-accent">{item.year}</span>
              <p className="text-ink-dim leading-relaxed max-w-xl">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-6">Equipment</p>
            <ul className="space-y-4">
              {EQUIPMENT.map((item) => (
                <li key={item} className="text-ink-dim leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-px before:bg-accent">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-6">Services</p>
            <ul className="space-y-4">
              {SERVICES.map((item) => (
                <li key={item} className="text-ink-dim leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-px before:bg-accent">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
