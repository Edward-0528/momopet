import { motion } from 'framer-motion';
import secondaryImg from '../../assets/secondaryhero.webp';

export default function CatCloudSection() {
  return (
    <section
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ backgroundColor: '#EAD9C5' }}
    >
      {/* Decorative scattered paws — CSS animation, no JS reflow */}
      {[
        { pos: 'top-4 left-6',    delay: '0s',    dur: '3s'  },
        { pos: 'top-10 right-14', delay: '0.8s',  dur: '4s'  },
        { pos: 'bottom-8 left-1/3', delay: '1.6s', dur: '3.5s' },
      ].map(({ pos, delay, dur }, i) => (
        <span
          key={i}
          className={`absolute text-xl select-none pointer-events-none opacity-20 ${pos}`}
          style={{ animation: `pawFloat ${dur} ease-in-out ${delay} infinite` }}
        >
          🐾
        </span>
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">

          {/* ── Left: Floating illustration — CSS float, no JS reflow ── */}
          <div className="flex-1 flex justify-center" style={{ animation: 'catFloat 4s ease-in-out infinite' }}>
            <img
              src={secondaryImg}
              alt="Cat relaxing on a cloud illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain drop-shadow-md"
              loading="lazy"
            />
          </div>

          {/* ── Right: Text ──────────────────────────────── */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Badge */}
            <span
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
              style={{
                backgroundColor: '#F5EDE0',
                color: '#C4603A',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              ☁️ Cat Cloud
            </span>

            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight"
              style={{ color: '#3D2314', fontFamily: 'Nunito, sans-serif' }}
            >
              A Spa Day Made for
              <br />
              <span style={{ color: '#C4603A' }}>Your Beloved Feline</span>
            </h2>

            <p
              className="text-base leading-relaxed mb-6 max-w-md mx-auto md:mx-0"
              style={{ color: '#7A4F35', fontFamily: 'Nunito, sans-serif' }}
            >
              From a gentle bath to a full lion cut, every service is crafted with
              love and patience. We work exclusively with cats, so your kitty is
              always in experienced, caring hands.
            </p>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {[
                { num: '10+', label: 'Curated Services' },
                { num: '100%', label: 'Cat Focused' },
                { num: '5★', label: 'Client Reviews' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-2xl font-extrabold"
                    style={{ color: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
                  >
                    {stat.num}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: '#7A4F35', fontFamily: 'Nunito, sans-serif' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
