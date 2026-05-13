import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ServiceCard from '../components/ui/ServiceCard';
import services from '../data/services.json';
import useBookingStore from '../store/useBookingStore';
import { formatCurrency } from '../utils/formatCurrency';

const CATEGORIES = [
  { key: 'all',     label: '🐾 All' },
  { key: 'bath',    label: '🛁 Bath & Care' },
  { key: 'styling', label: '✂️ Styling' },
  { key: 'addon',   label: '➕ Add-ons' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const cartItems   = useBookingStore((s) => s.cartItems);
  const getSubtotal = useBookingStore((s) => s.getSubtotal);
  const openCart    = useBookingStore((s) => s.openCart);

  const filtered = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  const subtotal = getSubtotal();

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: '#F5EDE0', fontFamily: 'Nunito, sans-serif' }}>

        {/* ── Page Header ──────────────────────────────────── */}
        <section
          className="pt-24 pb-10 text-center px-4"
          style={{ backgroundColor: '#EAD9C5' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span
              className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
              style={{ backgroundColor: '#F2E4D4', color: '#C4603A' }}
            >
              ✨ Our Services
            </span>
            <h1
              className="text-3xl sm:text-4xl font-extrabold mb-3"
              style={{ color: '#3D2314' }}
            >
              Explore Our Curated Services
            </h1>
            <p
              className="text-sm sm:text-base max-w-xl mx-auto mb-6"
              style={{ color: '#7A4F35' }}
            >
              Select the services you'd like and we'll build your appointment together.
              Add multiple services — we'll calculate the total in real-time!
            </p>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-200"
                  style={{
                    backgroundColor: activeCategory === cat.key ? '#C4603A' : '#fff',
                    color: activeCategory === cat.key ? '#fff' : '#7A4F35',
                    boxShadow: activeCategory === cat.key
                      ? '0 4px 12px rgba(196,96,58,0.30)'
                      : '0 2px 6px rgba(61,35,20,0.08)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Services Grid ─────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </section>

        {/* ── Sticky Service Total bar ──────────────────────── */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="sticky bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-3"
            style={{ backgroundColor: '#F5EDE0' }}
          >
            <div
              className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3.5 rounded-2xl"
              style={{
                backgroundColor: '#3D2314',
                boxShadow: '0 -4px 20px rgba(61,35,20,0.15)',
              }}
            >
              <div>
                <p className="text-xs font-semibold text-[#D9C4A8]">
                  {cartItems.length} service{cartItems.length > 1 ? 's' : ''} selected
                </p>
                <p className="text-lg font-extrabold text-white">
                  SERVICE TOTAL&nbsp;
                  <span style={{ color: '#E07A56' }}>{formatCurrency(subtotal)}+</span>
                </p>
              </div>
              <button
                onClick={openCart}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: '#C4603A' }}
              >
                Review Cart
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </>
  );
}
