import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/mainhero.webp';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ backgroundColor: '#F5EDE0' }}
    >
      {/* Decorative background blob */}
      <div
        className="absolute top-0 right-0 w-[55%] h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 30%, #EAD9C5 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-8">

          {/* ── Left: Text Content ─────────────────────────── */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow badge */}
            <motion.span
              variants={fadeUp}
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
              style={{
                backgroundColor: '#F2E4D4',
                color: '#C4603A',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              🐾 Irvine's Premier Cat Spa
            </motion.span>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5"
              style={{ color: '#3D2314', fontFamily: 'Nunito, sans-serif' }}
            >
              <span style={{ color: '#C4603A' }}>MoMoPet:</span>
              <br />
              Premium Grooming
              <br />
              for Your Beloved
              <br />
              Feline
            </h1>

            {/* Subheadline */}
            <p
              className="text-base sm:text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed"
              style={{ color: '#7A4F35', fontFamily: 'Nunito, sans-serif' }}
            >
              Gentle, stress-free grooming in a warm and whimsical environment.
              Your cat deserves the very best. ✨
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                to="/services"
                className="inline-flex justify-center items-center px-8 py-3.5 rounded-full text-base font-bold text-white shadow-md transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
              >
                Explore Services
              </Link>
              <Link
                to="/book"
                className="inline-flex justify-center items-center px-8 py-3.5 rounded-full text-base font-bold border-2 transition-all duration-200 hover:bg-[#F2E4D4] active:scale-95"
                style={{
                  borderColor: '#C4603A',
                  color: '#C4603A',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                Book Appointment
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              {[
                '🐱 Cats Only',
                '⏱ Same-Day Availability',
                '📍 Irvine, CA',
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: '#EAD9C5',
                    color: '#7A4F35',
                    fontFamily: 'Nunito, sans-serif',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Hero Illustration ───────────────────── */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            variants={fadeRight}
            initial="hidden"
            animate="show"
          >
            <img
              src={heroImg}
              alt="MoMoPet cat grooming spa illustration"
              className="w-full max-w-sm md:max-w-lg lg:max-w-xl object-contain drop-shadow-lg"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#EAD9C5" />
        </svg>
      </div>
    </section>
  );
}
