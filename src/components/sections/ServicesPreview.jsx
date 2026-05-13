import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import services from '../../data/services.json';
import { Clock } from 'lucide-react';

const featured = services.filter((s) => s.featured);

export default function ServicesPreview() {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: '#F5EDE0', fontFamily: 'Nunito, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
            style={{ backgroundColor: '#F2E4D4', color: '#C4603A' }}
          >
            ✨ Our Services
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-3"
            style={{ color: '#3D2314' }}
          >
            Explore Our Curated Services
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: '#7A4F35' }}>
            From a refreshing bath to a full spa day — we've got every whisker covered.
          </p>
        </motion.div>

        {/* Featured service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((service, i) => (
            <motion.div
              key={service.id}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                backgroundColor: '#fff',
                boxShadow: '0 4px 16px rgba(61,35,20,0.09)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(61,35,20,0.14)' }}
            >
              {/* Image */}
              <div className="w-full aspect-square bg-[#F2E4D4] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="text-base font-extrabold mb-2 leading-snug"
                  style={{ color: '#3D2314' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4 line-clamp-3 flex-1"
                  style={{ color: '#7A4F35' }}
                >
                  {service.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span
                    className="text-base font-extrabold"
                    style={{ color: '#C4603A' }}
                  >
                    {service.priceDisplay}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#F2E4D4', color: '#7A4F35' }}
                  >
                    <Clock size={11} />
                    {service.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
            style={{ backgroundColor: '#C4603A' }}
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
