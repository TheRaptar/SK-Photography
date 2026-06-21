import type {
  Photo,
  Gallery,
  Testimonial,
  PricingPackage,
  FaqItem,
} from '../types';

/**
 * PHOTO IMAGES
 * ------------------------------------------------------------------
 * Real photos imported from the studio's Instagram (@sk03_photography),
 * resized and optimized into /public/photos/<category>/.
 *
 * The Commercial category still uses CSS-gradient placeholders — no
 * product/campaign photos were available to import yet. Replace the
 * `cover/src` gradient strings with real image paths the same way the
 * rest of this file does once that work exists.
 * ------------------------------------------------------------------
 */

export const galleries: Gallery[] = [
  {
    id: 'sikh-wedding-ceremony',
    title: 'A Sikh Wedding',
    category: 'weddings',
    date: 'June 2025',
    location: 'Gurdwara, United Kingdom',
    cover: '/photos/weddings/sikh-wedding-ceremony-01.jpg',
    description:
      'Anand Karaj ceremony and Maiyan (Haldi) celebrations — the unscripted moments between rituals, shot as they happened.',
    photoIds: ['sikh-wedding-ceremony-01', 'sikh-wedding-ceremony-02', 'sikh-wedding-ceremony-03', 'sikh-wedding-ceremony-04'],
  },
  {
    id: 'engagement-session',
    title: 'An Engagement Session',
    category: 'weddings',
    date: 'June 2025',
    location: 'United Kingdom',
    cover: '/photos/weddings/engagement-session-01.jpg',
    description:
      'A pre-wedding portrait session — soft evening light and a couple still getting used to being photographed together.',
    photoIds: ['engagement-session-01', 'engagement-session-02', 'engagement-session-03', 'engagement-session-04'],
  },
  {
    id: 'golden-hour-hyde-park',
    title: 'Golden Hour, Hyde Park',
    category: 'portraits',
    date: 'June 2025',
    location: 'Hyde Park, London',
    cover: '/photos/portraits/golden-hour-hyde-park-01.jpg',
    description:
      'A portrait session timed entirely around the last hour of light — denim, low sun, and a lot of patience.',
    photoIds: ['golden-hour-hyde-park-01', 'golden-hour-hyde-park-02', 'golden-hour-hyde-park-03', 'golden-hour-hyde-park-04', 'golden-hour-hyde-park-05', 'golden-hour-hyde-park-06'],
  },
  {
    id: 'city-style-pink-blazer',
    title: 'City Style',
    category: 'portraits',
    date: 'May 2025',
    location: 'London',
    cover: '/photos/portraits/city-style-pink-blazer-01.jpg',
    description:
      'A street-style session built around one houndstooth blazer and London\'s residential backstreets.',
    photoIds: ['city-style-pink-blazer-01', 'city-style-pink-blazer-02', 'city-style-pink-blazer-03', 'city-style-pink-blazer-04', 'city-style-pink-blazer-05'],
  },
  {
    id: 'tower-bridge-sessions',
    title: 'Tower Bridge Sessions',
    category: 'portraits',
    date: 'June 2025',
    location: 'Tower Bridge, London',
    cover: '/photos/portraits/tower-bridge-sessions-01.jpg',
    description:
      'Two different portrait sessions shot against the same backdrop — proof that one landmark never gets old.',
    photoIds: ['tower-bridge-sessions-01', 'tower-bridge-sessions-02', 'tower-bridge-sessions-03', 'tower-bridge-sessions-04', 'tower-bridge-sessions-05', 'tower-bridge-sessions-06', 'tower-bridge-sessions-07'],
  },
  {
    id: 'riverside-red-dress',
    title: 'Riverside, Red Dress',
    category: 'portraits',
    date: 'January 2025',
    location: 'London',
    cover: '/photos/portraits/riverside-red-dress-01.jpg',
    description:
      'A late-afternoon session by the water — one red dress doing a lot of the work.',
    photoIds: ['riverside-red-dress-01', 'riverside-red-dress-02', 'riverside-red-dress-03', 'riverside-red-dress-04'],
  },
  {
    id: 'coastal-portrait-seven-sisters',
    title: 'Coastal Portrait, Seven Sisters',
    category: 'portraits',
    date: 'May 2025',
    location: 'Seven Sisters, East Sussex',
    cover: '/photos/portraits/coastal-portrait-seven-sisters-01.jpg',
    description:
      'A portrait session that turned into a landscape shoot the moment the chalk cliffs came into view.',
    photoIds: ['coastal-portrait-seven-sisters-01', 'coastal-portrait-seven-sisters-02'],
  },
  {
    id: 'studio-headshots-westminster',
    title: 'Headshots, Westminster',
    category: 'portraits',
    date: 'January 2025',
    location: 'Westminster, London',
    cover: '/photos/portraits/studio-headshots-westminster-01.jpg',
    description:
      'A quick headshot session shot on location rather than in studio — natural light against period architecture.',
    photoIds: ['studio-headshots-westminster-01', 'studio-headshots-westminster-02', 'studio-headshots-westminster-03'],
  },
  {
    id: 'companion-portrait',
    title: 'A Girl and Her Dog',
    category: 'portraits',
    date: 'May 2025',
    location: 'London',
    cover: '/photos/portraits/companion-portrait-01.jpg',
    description:
      'Sometimes the brief is just: bring the dog.',
    photoIds: ['companion-portrait-01', 'companion-portrait-02'],
  },
  {
    id: 'quiet-streets-suburban-london',
    title: 'Quiet Streets',
    category: 'street',
    date: 'August 2024',
    location: 'South London',
    cover: '/photos/street/quiet-streets-suburban-london-01.jpg',
    description:
      'An ordinary residential street, shot for the quality of the light rather than anything happening in it.',
    photoIds: ['quiet-streets-suburban-london-01', 'quiet-streets-suburban-london-02', 'quiet-streets-suburban-london-03', 'quiet-streets-suburban-london-04', 'quiet-streets-suburban-london-05'],
  },
  {
    id: 'character-studies',
    title: 'Character Studies',
    category: 'street',
    date: 'April 2025',
    location: 'Central London',
    cover: '/photos/street/character-studies-01.jpg',
    description:
      'Street performers, passers-by, and the small architectural details that make a city recognizable.',
    photoIds: ['character-studies-01', 'character-studies-02', 'character-studies-03', 'character-studies-04', 'character-studies-05', 'character-studies-06'],
  },
  {
    id: 'seven-sisters-coast',
    title: 'Seven Sisters & The Coast',
    category: 'landscape',
    date: 'May 2025',
    location: 'East Sussex',
    cover: '/photos/landscape/seven-sisters-coast-01.jpg',
    description:
      'Chalk cliffs, sea birds, and a coastal village caught in the last light of the day.',
    photoIds: ['seven-sisters-coast-01', 'seven-sisters-coast-02', 'seven-sisters-coast-03', 'seven-sisters-coast-04'],
  },
  {
    id: 'london-skyline',
    title: 'London Skyline',
    category: 'landscape',
    date: 'April 2025',
    location: 'London',
    cover: '/photos/landscape/london-skyline-01.jpg',
    description:
      'Two of the city\'s most-photographed landmarks, shot for the light rather than the cliché.',
    photoIds: ['london-skyline-01', 'london-skyline-02'],
  },
  {
    id: 'national-wedding-show',
    title: 'The National Wedding Show',
    category: 'events',
    date: 'October 2025',
    location: 'ExCeL London',
    cover: '/photos/events/national-wedding-show-01.jpg',
    description:
      'Runway coverage from one of the UK\'s largest bridal trade shows.',
    photoIds: ['national-wedding-show-01', 'national-wedding-show-02', 'national-wedding-show-03'],
  },
  {
    id: 'atelier-noir',
    title: 'Atelier Noir Campaign',
    category: 'commercial',
    date: 'April 2026',
    location: 'Studio + On Location',
    cover: 'linear-gradient(150deg,#7a6a4e,#15120d)',
    description:
      'Product and lifestyle imagery for a leather-goods launch — controlled studio lighting paired with on-location lifestyle shots.',
    photoIds: ['c1', 'c2', 'c3', 'c4'],
  },
];

export const photos: Photo[] = [
  { id: 'sikh-wedding-ceremony-01', title: 'Seated before the Guru Granth Sahib', category: 'weddings', galleryId: 'sikh-wedding-ceremony', src: '/photos/weddings/sikh-wedding-ceremony-01.jpg', width: 1440, height: 960, alt: 'Sikh couple seated together during the Anand Karaj ceremony' },
  { id: 'sikh-wedding-ceremony-02', title: 'The ceremony begins', category: 'weddings', galleryId: 'sikh-wedding-ceremony', src: '/photos/weddings/sikh-wedding-ceremony-02.jpg', width: 1440, height: 960, alt: 'Wedding guests and couple during a Sikh wedding ceremony' },
  { id: 'sikh-wedding-ceremony-03', title: 'Maiyan, mid-celebration', category: 'weddings', galleryId: 'sikh-wedding-ceremony', src: '/photos/weddings/sikh-wedding-ceremony-03.jpg', width: 1440, height: 960, alt: 'Haldi ceremony with yellow turmeric paste and floral backdrop' },
  { id: 'sikh-wedding-ceremony-04', title: 'Joy, uncut', category: 'weddings', galleryId: 'sikh-wedding-ceremony', src: '/photos/weddings/sikh-wedding-ceremony-04.jpg', width: 1440, height: 960, alt: 'Groom and bride laughing during the Haldi ceremony' },
  { id: 'engagement-session-01', title: 'Side by side', category: 'weddings', galleryId: 'engagement-session', src: '/photos/weddings/engagement-session-01.jpg', width: 1440, height: 1800, alt: 'Engaged couple in coordinated pink and teal outfits' },
  { id: 'engagement-session-02', title: 'A quiet exchange', category: 'weddings', galleryId: 'engagement-session', src: '/photos/weddings/engagement-session-02.jpg', width: 1440, height: 1800, alt: 'Couple sharing a close moment during an engagement shoot' },
  { id: 'engagement-session-03', title: 'Close', category: 'weddings', galleryId: 'engagement-session', src: '/photos/weddings/engagement-session-03.jpg', width: 1440, height: 1800, alt: 'Close embrace portrait of an engaged couple' },
  { id: 'engagement-session-04', title: 'Full length', category: 'weddings', galleryId: 'engagement-session', src: '/photos/weddings/engagement-session-04.jpg', width: 1440, height: 1800, alt: 'Full-length portrait of an engaged couple outdoors' },
  { id: 'golden-hour-hyde-park-01', title: 'On the steps', category: 'portraits', galleryId: 'golden-hour-hyde-park', src: '/photos/portraits/golden-hour-hyde-park-01.jpg', width: 1440, height: 1799, alt: 'Portrait of a woman sitting on park steps in golden light' },
  { id: 'golden-hour-hyde-park-02', title: 'Looking up', category: 'portraits', galleryId: 'golden-hour-hyde-park', src: '/photos/portraits/golden-hour-hyde-park-02.jpg', width: 1440, height: 1799, alt: 'Portrait of a woman on park steps looking off-camera' },
  { id: 'golden-hour-hyde-park-03', title: 'Close, golden light', category: 'portraits', galleryId: 'golden-hour-hyde-park', src: '/photos/portraits/golden-hour-hyde-park-03.jpg', width: 1440, height: 1800, alt: 'Close portrait in warm evening light' },
  { id: 'golden-hour-hyde-park-04', title: 'Half-light', category: 'portraits', galleryId: 'golden-hour-hyde-park', src: '/photos/portraits/golden-hour-hyde-park-04.jpg', width: 1440, height: 1800, alt: 'Portrait with half the face in shadow, half in golden light' },
  { id: 'golden-hour-hyde-park-05', title: 'Bench portrait', category: 'portraits', galleryId: 'golden-hour-hyde-park', src: '/photos/portraits/golden-hour-hyde-park-05.jpg', width: 1440, height: 1800, alt: 'Portrait of a woman seated on a park bench' },
  { id: 'golden-hour-hyde-park-06', title: 'Backlit', category: 'portraits', galleryId: 'golden-hour-hyde-park', src: '/photos/portraits/golden-hour-hyde-park-06.jpg', width: 1440, height: 1800, alt: 'Backlit portrait with sun flare through hair' },
  { id: 'city-style-pink-blazer-01', title: 'Sunglasses, doorway', category: 'portraits', galleryId: 'city-style-pink-blazer', src: '/photos/portraits/city-style-pink-blazer-01.jpg', width: 1440, height: 1800, alt: 'Street style portrait outside a townhouse' },
  { id: 'city-style-pink-blazer-02', title: 'Blue door', category: 'portraits', galleryId: 'city-style-pink-blazer', src: '/photos/portraits/city-style-pink-blazer-02.jpg', width: 1440, height: 1800, alt: 'Street style portrait against a blue mews house' },
  { id: 'city-style-pink-blazer-03', title: 'Caught mid-step', category: 'portraits', galleryId: 'city-style-pink-blazer', src: '/photos/portraits/city-style-pink-blazer-03.jpg', width: 1440, height: 1800, alt: 'Candid street style portrait walking past a blue house' },
  { id: 'city-style-pink-blazer-04', title: 'Green backdrop', category: 'portraits', galleryId: 'city-style-pink-blazer', src: '/photos/portraits/city-style-pink-blazer-04.jpg', width: 1440, height: 1800, alt: 'Street style portrait against a hedge' },
  { id: 'city-style-pink-blazer-05', title: 'Relaxed', category: 'portraits', galleryId: 'city-style-pink-blazer', src: '/photos/portraits/city-style-pink-blazer-05.jpg', width: 1440, height: 1800, alt: 'Casual street style portrait against greenery' },
  { id: 'tower-bridge-sessions-01', title: 'White cap, blue skies', category: 'portraits', galleryId: 'tower-bridge-sessions', src: '/photos/portraits/tower-bridge-sessions-01.jpg', width: 1440, height: 1800, alt: 'Portrait in front of Tower Bridge' },
  { id: 'tower-bridge-sessions-02', title: 'Walking past', category: 'portraits', galleryId: 'tower-bridge-sessions', src: '/photos/portraits/tower-bridge-sessions-02.jpg', width: 1440, height: 1800, alt: 'Candid portrait walking near Tower Bridge' },
  { id: 'tower-bridge-sessions-03', title: 'Looking back', category: 'portraits', galleryId: 'tower-bridge-sessions', src: '/photos/portraits/tower-bridge-sessions-03.jpg', width: 1440, height: 1800, alt: 'Portrait looking back toward camera near Tower Bridge' },
  { id: 'tower-bridge-sessions-04', title: 'Golden hour, bridge view', category: 'portraits', galleryId: 'tower-bridge-sessions', src: '/photos/portraits/tower-bridge-sessions-04.jpg', width: 1440, height: 1800, alt: 'Portrait at Tower Bridge during golden hour' },
  { id: 'tower-bridge-sessions-05', title: 'Wind-blown', category: 'portraits', galleryId: 'tower-bridge-sessions', src: '/photos/portraits/tower-bridge-sessions-05.jpg', width: 1440, height: 1800, alt: 'Portrait with hair moving in the wind near Tower Bridge' },
  { id: 'tower-bridge-sessions-06', title: 'Soft focus background', category: 'portraits', galleryId: 'tower-bridge-sessions', src: '/photos/portraits/tower-bridge-sessions-06.jpg', width: 1440, height: 1800, alt: 'Portrait with Tower Bridge softly out of focus behind' },
  { id: 'tower-bridge-sessions-07', title: 'Railing portrait', category: 'portraits', galleryId: 'tower-bridge-sessions', src: '/photos/portraits/tower-bridge-sessions-07.jpg', width: 1440, height: 1800, alt: 'Close portrait leaning on a railing near Tower Bridge' },
  { id: 'riverside-red-dress-01', title: 'By the railing', category: 'portraits', galleryId: 'riverside-red-dress', src: '/photos/portraits/riverside-red-dress-01.jpg', width: 1440, height: 1800, alt: 'Portrait of a woman in a red dress beside a riverside railing' },
  { id: 'riverside-red-dress-02', title: 'On the swing', category: 'portraits', galleryId: 'riverside-red-dress', src: '/photos/portraits/riverside-red-dress-02.jpg', width: 1440, height: 1800, alt: 'Portrait of a woman in a red dress sitting on a swing' },
  { id: 'riverside-red-dress-03', title: 'Leather jacket, playground', category: 'portraits', galleryId: 'riverside-red-dress', src: '/photos/portraits/riverside-red-dress-03.jpg', width: 1440, height: 1800, alt: 'Portrait against yellow playground structures' },
  { id: 'riverside-red-dress-04', title: 'Standing tall', category: 'portraits', galleryId: 'riverside-red-dress', src: '/photos/portraits/riverside-red-dress-04.jpg', width: 1440, height: 1800, alt: 'Full-length portrait against yellow playground structures' },
  { id: 'coastal-portrait-seven-sisters-01', title: 'Among the stones', category: 'portraits', galleryId: 'coastal-portrait-seven-sisters', src: '/photos/portraits/coastal-portrait-seven-sisters-01.jpg', width: 1440, height: 1800, alt: 'Portrait seated on the pebble beach beneath the cliffs' },
  { id: 'coastal-portrait-seven-sisters-02', title: 'Standing on the shore', category: 'portraits', galleryId: 'coastal-portrait-seven-sisters', src: '/photos/portraits/coastal-portrait-seven-sisters-02.jpg', width: 1440, height: 1800, alt: 'Full-length portrait on the pebble beach' },
  { id: 'studio-headshots-westminster-01', title: 'Direct gaze', category: 'portraits', galleryId: 'studio-headshots-westminster', src: '/photos/portraits/studio-headshots-westminster-01.jpg', width: 1440, height: 1800, alt: 'Headshot in front of a government building' },
  { id: 'studio-headshots-westminster-02', title: 'Thinking', category: 'portraits', galleryId: 'studio-headshots-westminster', src: '/photos/portraits/studio-headshots-westminster-02.jpg', width: 1440, height: 1800, alt: 'Candid headshot with hand near chin' },
  { id: 'studio-headshots-westminster-03', title: 'Walking shot', category: 'portraits', galleryId: 'studio-headshots-westminster', src: '/photos/portraits/studio-headshots-westminster-03.jpg', width: 1440, height: 1800, alt: 'Candid portrait walking past a colonnade' },
  { id: 'companion-portrait-01', title: 'Good boy', category: 'portraits', galleryId: 'companion-portrait', src: '/photos/portraits/companion-portrait-01.jpg', width: 1440, height: 1800, alt: 'Woman on a bench with her small dog' },
  { id: 'companion-portrait-02', title: 'Mid-conversation', category: 'portraits', galleryId: 'companion-portrait', src: '/photos/portraits/companion-portrait-02.jpg', width: 1440, height: 1800, alt: 'Candid moment between a woman and her dog on a bench' },
  { id: 'quiet-streets-suburban-london-01', title: '20 zone', category: 'street', galleryId: 'quiet-streets-suburban-london', src: '/photos/street/quiet-streets-suburban-london-01.jpg', width: 1440, height: 1800, alt: 'Suburban residential street with a speed limit sign' },
  { id: 'quiet-streets-suburban-london-02', title: 'Terraced houses, clear sky', category: 'street', galleryId: 'quiet-streets-suburban-london', src: '/photos/street/quiet-streets-suburban-london-02.jpg', width: 1440, height: 1800, alt: 'Row of terraced houses under a blue sky' },
  { id: 'quiet-streets-suburban-london-03', title: 'Narrow road', category: 'street', galleryId: 'quiet-streets-suburban-london', src: '/photos/street/quiet-streets-suburban-london-03.jpg', width: 1440, height: 1800, alt: 'Narrow residential street with parked cars' },
  { id: 'quiet-streets-suburban-london-04', title: 'Cycle lane', category: 'street', galleryId: 'quiet-streets-suburban-london', src: '/photos/street/quiet-streets-suburban-london-04.jpg', width: 1440, height: 1800, alt: 'Tree-lined street with a marked cycle lane' },
  { id: 'quiet-streets-suburban-london-05', title: 'High street, double-decker', category: 'street', galleryId: 'quiet-streets-suburban-london', src: '/photos/street/quiet-streets-suburban-london-05.jpg', width: 1440, height: 1800, alt: 'High street scene with a double-decker bus' },
  { id: 'character-studies-01', title: 'Living statue', category: 'street', galleryId: 'character-studies', src: '/photos/street/character-studies-01.jpg', width: 1440, height: 1800, alt: 'Gold-painted street performer dressed as a living statue' },
  { id: 'character-studies-02', title: 'Holding still', category: 'street', galleryId: 'character-studies', src: '/photos/street/character-studies-02.jpg', width: 1440, height: 1800, alt: 'Street performer in costume holding a pose' },
  { id: 'character-studies-03', title: 'Red phone box', category: 'street', galleryId: 'character-studies', src: '/photos/street/character-studies-03.jpg', width: 1440, height: 960, alt: 'Man leaning against a red telephone box' },
  { id: 'character-studies-04', title: 'Clock and bells', category: 'street', galleryId: 'character-studies', src: '/photos/street/character-studies-04.jpg', width: 1440, height: 1440, alt: 'Detail shot of a public clock tower with bells' },
  { id: 'character-studies-05', title: 'Clock tower, low angle', category: 'street', galleryId: 'character-studies', src: '/photos/street/character-studies-05.jpg', width: 1440, height: 1440, alt: 'Low angle detail shot of a clock tower' },
  { id: 'character-studies-06', title: 'Coffee, pavement seat', category: 'street', galleryId: 'character-studies', src: '/photos/street/character-studies-06.jpg', width: 1440, height: 1800, alt: 'Man seated outside a cafe with a coffee' },
  { id: 'seven-sisters-coast-01', title: 'Watching the water', category: 'landscape', galleryId: 'seven-sisters-coast', src: '/photos/landscape/seven-sisters-coast-01.jpg', width: 1440, height: 1800, alt: 'Seagull perched on a cliff edge overlooking the sea' },
  { id: 'seven-sisters-coast-02', title: 'Among the wildflowers', category: 'landscape', galleryId: 'seven-sisters-coast', src: '/photos/landscape/seven-sisters-coast-02.jpg', width: 1440, height: 1800, alt: 'Seagull among coastal wildflowers' },
  { id: 'seven-sisters-coast-03', title: 'Village below the cliffs', category: 'landscape', galleryId: 'seven-sisters-coast', src: '/photos/landscape/seven-sisters-coast-03.jpg', width: 1440, height: 1800, alt: 'Coastal village seen from the cliffs at golden hour' },
  { id: 'seven-sisters-coast-04', title: 'The cliffs', category: 'landscape', galleryId: 'seven-sisters-coast', src: '/photos/landscape/seven-sisters-coast-04.jpg', width: 1440, height: 1800, alt: 'Wide view of chalk cliffs meeting the sea' },
  { id: 'london-skyline-01', title: 'Canary Wharf, through cables', category: 'landscape', galleryId: 'london-skyline', src: '/photos/landscape/london-skyline-01.jpg', width: 1440, height: 1440, alt: 'Canary Wharf skyline framed by bridge cables' },
  { id: 'london-skyline-02', title: 'The Shard', category: 'landscape', galleryId: 'london-skyline', src: '/photos/landscape/london-skyline-02.jpg', width: 1440, height: 1440, alt: 'The Shard skyscraper against a hazy sky' },
  { id: 'national-wedding-show-01', title: 'Mini dress, full skirt', category: 'events', galleryId: 'national-wedding-show', src: '/photos/events/national-wedding-show-01.jpg', width: 1440, height: 1923, alt: 'Model on the runway in a short bridal dress at a wedding show' },
  { id: 'national-wedding-show-02', title: 'Floral and off-shoulder', category: 'events', galleryId: 'national-wedding-show', src: '/photos/events/national-wedding-show-02.jpg', width: 1440, height: 1916, alt: 'Model on the runway in a floral off-shoulder gown' },
  { id: 'national-wedding-show-03', title: 'One shoulder, full length', category: 'events', galleryId: 'national-wedding-show', src: '/photos/events/national-wedding-show-03.jpg', width: 1440, height: 1916, alt: 'Model on the runway in a one-shoulder bridal gown' },
  // Commercial
  { id: 'c1', title: 'Product, studio', category: 'commercial', galleryId: 'atelier-noir', src: 'linear-gradient(160deg,#8a7250,#13100a)', width: 1, height: 1, alt: 'Leather goods product shot on a studio backdrop' },
  { id: 'c2', title: 'Lifestyle, on-location', category: 'commercial', galleryId: 'atelier-noir', src: 'linear-gradient(160deg,#a3875e,#171209)', width: 4, height: 5, alt: 'Lifestyle shot of product on location' },
  { id: 'c3', title: 'Texture detail', category: 'commercial', galleryId: 'atelier-noir', src: 'linear-gradient(160deg,#71603f,#0f0c07)', width: 3, height: 2, alt: 'Close detail of leather texture' },
  { id: 'c4', title: 'Campaign flat lay', category: 'commercial', galleryId: 'atelier-noir', src: 'linear-gradient(160deg,#93764e,#15110a)', width: 3, height: 4, alt: 'Flat lay of campaign product set' },
];


// TODO: replace with real client quotes — these are placeholder testimonials,
// not actual reviews, written to match the real galleries above.
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Client name',
    role: 'Bride, Sikh Wedding',
    quote:
      'We didn\u2019t feel photographed — we felt witnessed. Every image still pulls us right back into that weekend.',
  },
  {
    id: 't2',
    name: 'Client name',
    role: 'Bridal Exhibitor, The National Wedding Show',
    quote:
      'Covered the whole runway without missing a single look, and had a gallery back to us within 48 hours.',
  },
  {
    id: 't3',
    name: 'Client name',
    role: 'Portrait Client',
    quote:
      'Made an hour at Tower Bridge in the cold feel completely effortless. Worth every minute of waiting for the light.',
  },
];

// TODO: these are placeholder UK-market prices — set your real rates.
export const pricingPackages: PricingPackage[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: '£450',
    unit: 'per session',
    description: 'A focused single-session shoot — ideal for portraits or small events.',
    features: [
      '3-hour coverage',
      '1 photographer',
      '40+ edited high-resolution images',
      'Private online gallery',
      'Personal-use print rights',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    price: '£1,400',
    unit: 'per event',
    description: 'Full-day coverage for weddings and milestone events, start to finish.',
    features: [
      'Up to 10-hour coverage',
      '2 photographers',
      '300+ edited high-resolution images',
      'Private online gallery + client sharing',
      'Engagement or pre-event session included',
      'Priority 2-week delivery',
    ],
    featured: true,
  },
  {
    id: 'commercial',
    name: 'Commercial',
    price: 'Custom',
    unit: 'quoted per brief',
    description: 'Product, campaign, and brand photography scoped to your deliverables.',
    features: [
      'Scoped shot list & art direction',
      'Studio or on-location',
      'Full usage & licensing rights',
      'Raw + retouched delivery',
      'Dedicated production timeline',
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'f1',
    question: 'How far in advance should I book?',
    answer:
      'For weddings, 4–6 months ahead is ideal, especially for peak season (November–February). Portrait and commercial sessions can usually be scheduled within 2–3 weeks.',
  },
  {
    id: 'f2',
    question: 'How long until I receive my photos?',
    answer:
      'Portrait sessions: 7–10 days. Weddings and full-day events: 3–4 weeks, with a curated sneak-peek gallery within 48 hours.',
  },
  {
    id: 'f3',
    question: 'Do you travel for shoots?',
    answer:
      'Yes — based in London, available across the UK as standard, with travel further afield quoted separately based on location and dates.',
  },
  {
    id: 'f4',
    question: 'Can I request a custom package?',
    answer:
      'Always. The packages above are starting points — get in touch with your brief and a tailored quote will follow within two business days.',
  },
  {
    id: 'f5',
    question: 'What\u2019s included in image licensing for commercial work?',
    answer:
      'Commercial packages include full usage rights scoped to your brief (digital, print, or both). Personal and editorial sessions include personal-use rights; extended licensing is available on request.',
  },
];
