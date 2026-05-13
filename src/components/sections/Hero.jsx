import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/mainhero.webp';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="overflow-hidden" style={{ backgroundColor: '#F5EDE0' }}>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MOBILE layout  (hidden on md+)
          Text on top, full-width image below
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="md:hidden pt-24 pb-0">
        {/* Text block */}
        <motion.div
          className="px-6 pb-8 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <h1
            className="text-3xl font-extrabold leading-snug mb-5"
            style={{ color: '#3D2314', fontFamily: 'Nunito, sans-serif' }}
          >
            <span style={{ color: '#C4603A' }}>Momopet:</span> Premium
            <br />Grooming for
            <br />Your Beloved Feline
          </h1>
          <div className="flex flex-row gap-3 justify-center flex-wrap">
            <Link
              to="/services"
              className="inline-flex justify-center items-center px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
            >
              Explore Services
            </Link>
            <Link
              to="/services"
              className="inline-flex justify-center items-center px-6 py-2.5 rounded-full text-sm font-bold border-2 transition-all duration-200 hover:bg-[#F2E4D4] active:scale-95"
              style={{ borderColor: '#C4603A', color: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
            >
              Book Appointment
            </Link>
          </div>
        </motion.div>

        {/* Hero image — full width, natural aspect ratio */}
        <motion.img
          src={heroImg}
          alt="A cat relaxing at Momopet grooming spa"
          className="w-full object-cover"
          style={{ maxHeight: '360px', objectPosition: 'center 20%' }}
          loading="eager"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />

        {/* Wave divider */}
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full -mt-1">
          <path d="M0 40L1440 40L1440 14C1200 40 960 0 720 14C480 28 240 0 0 14L0 40Z" fill="#F5EDE0" />
        </svg>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DESKTOP layout  (hidden below md)
          Full-bleed background image with gradient
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative hidden md:flex min-h-screen items-center pt-16">
        {/* Background image */}
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Left gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(245,237,224,0.98) 0%, rgba(245,237,224,0.92) 35%, rgba(245,237,224,0.2) 58%, rgba(245,237,224,0) 100%)',
          }}
        />

        {/* Text content */}
        <div className="relative w-full max-w-6xl mx-auto px-12 py-28">
          <motion.div className="max-w-sm" variants={fadeUp} initial="hidden" animate="show">
            <h1
              className="text-4xl font-extrabold leading-snug mb-4"
              style={{ color: '#3D2314', fontFamily: 'Nunito, sans-serif' }}
            >
              <span style={{ color: '#C4603A' }}>Momopet:</span> Premium
              <br />Grooming for
              <br />Your Beloved Feline
            </h1>
            <div className="flex flex-row gap-3 flex-wrap">
              <Link
                to="/services"
                className="inline-flex justify-center items-center px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
              >
                Explore Services
              </Link>
              <Link
                to="/services"
                className="inline-flex justify-center items-center px-6 py-2.5 rounded-full text-sm font-bold border-2 transition-all duration-200 hover:bg-[#F2E4D4] active:scale-95"
                style={{ borderColor: '#C4603A', color: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#F5EDE0" />
          </svg>
        </div>
      </div>

    </section>
  );
}
