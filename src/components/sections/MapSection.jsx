import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import companyInfo from '../../data/companyInfo.json';

const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

export default function MapSection() {
  const todayHours = companyInfo.hours.find((h) => h.day === todayName);
  const [mapLoaded, setMapLoaded] = useState(false);
  const sectionRef = useRef(null);

  // Only inject the iframe when the section enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMapLoaded(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24"
      style={{ backgroundColor: '#F5EDE0', fontFamily: 'Nunito, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
            style={{ backgroundColor: '#F2E4D4', color: '#C4603A' }}
          >
            📍 Find Us
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold"
            style={{ color: '#3D2314' }}
          >
            Visit Our Studio
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Map embed — only loads when section is in viewport */}
          <motion.div
            className="flex-1 rounded-3xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ minHeight: '320px', backgroundColor: '#EAD9C5' }}
          >
            {mapLoaded ? (
              <iframe
                title="Momopet Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.76!2d-117.8526!3d33.6694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcdee5b7f69e27%3A0x1!2s17145+Von+Karman+Ave+%23104%2C+Irvine%2C+CA+92614!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px', display: 'block' }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              /* Placeholder shown before map loads */
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ minHeight: '320px' }}
              >
                <div className="text-center opacity-40">
                  <MapPin size={32} color="#C4603A" className="mx-auto mb-2" />
                  <p className="text-sm font-semibold" style={{ color: '#7A4F35' }}>Loading map…</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Info card */}
          <motion.div
            className="lg:w-80 flex flex-col gap-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Address card */}
            <div
              className="rounded-2xl p-6 shadow-sm"
              style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(61,35,20,0.08)' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#F2E4D4' }}
                >
                  <MapPin size={18} color="#C4603A" />
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#3D2314' }}>Address</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#7A4F35' }}>
                    {companyInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#F2E4D4' }}
                >
                  <Phone size={18} color="#C4603A" />
                </div>
                <div>
                  <p className="font-bold text-sm mb-0.5" style={{ color: '#3D2314' }}>Phone</p>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-sm font-semibold hover:underline"
                    style={{ color: '#C4603A' }}
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#F2E4D4' }}
                >
                  <Clock size={18} color="#C4603A" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-2" style={{ color: '#3D2314' }}>
                    Hours
                    {todayHours && (
                      <span
                        className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: todayHours.open === 'Closed' ? '#F5C6C0' : '#C8DDB4',
                          color: todayHours.open === 'Closed' ? '#7A1A1A' : '#2A5C1A',
                        }}
                      >
                        {todayHours.open === 'Closed' ? 'Closed Today' : 'Open Today'}
                      </span>
                    )}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {companyInfo.hours.map((h) => (
                      <li
                        key={h.day}
                        className={`flex justify-between text-xs ${
                          h.day === todayName ? 'font-bold' : 'font-normal'
                        }`}
                        style={{ color: h.day === todayName ? '#C4603A' : '#7A4F35' }}
                      >
                        <span>{h.day.slice(0, 3)}</span>
                        <span>{h.open === 'Closed' ? 'Closed' : `${h.open} – ${h.close}`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Get Directions button */}
            <a
              href={companyInfo.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95 shadow-md"
              style={{ backgroundColor: '#C4603A' }}
            >
              <ExternalLink size={15} />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
