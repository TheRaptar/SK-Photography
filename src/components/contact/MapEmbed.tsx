// Uses the no-API-key Google Maps embed format. Replace the query below with
// your actual studio address — works with any place name or lat,lng pair.
const MAPS_QUERY = 'London, United Kingdom';
const MAPS_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;

export default function MapEmbed() {
  return (
    <div className="w-full aspect-[16/10] sm:aspect-[16/7] grayscale-[0.4] contrast-[1.05]">
      <iframe
        title="Studio location"
        src={MAPS_SRC}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0"
      />
    </div>
  );
}
