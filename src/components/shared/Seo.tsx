import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const SITE_NAME = 'SK Photography';
const SITE_URL = 'https://www.yourdomain.com';

export default function Seo({ title, description, path = '/', image }: SeoProps) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? `${SITE_URL}/og-cover.jpg`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    description,
    url: SITE_URL,
    image: ogImage,
    priceRange: '££££',
    areaServed: 'London, United Kingdom',
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
