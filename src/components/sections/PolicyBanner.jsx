import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock } from 'lucide-react';
import companyInfo from '../../data/companyInfo.json';

export default function PolicyBanner() {
  const { health_requirement, late_fee } = companyInfo.policies;

  return (
    <section
      className="py-12 sm:py-16"
      style={{ backgroundColor: '#EAD9C5', fontFamily: 'Nunito, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Health Requirements */}
          <motion.div
            className="rounded-2xl p-6 flex gap-4"
            style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(61,35,20,0.08)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: '#F2E4D4' }}
            >
              <ShieldCheck size={20} color="#C4603A" />
            </div>
            <div>
              <p
                className="text-sm font-extrabold mb-1.5"
                style={{ color: '#3D2314' }}
              >
                {health_requirement.title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#7A4F35' }}>
                {health_requirement.body}
              </p>
            </div>
          </motion.div>

          {/* Late Fee */}
          <motion.div
            className="rounded-2xl p-6 flex gap-4"
            style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(61,35,20,0.08)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: '#F2E4D4' }}
            >
              <Clock size={20} color="#C4603A" />
            </div>
            <div>
              <p
                className="text-sm font-extrabold mb-1.5"
                style={{ color: '#3D2314' }}
              >
                {late_fee.title}
              </p>
              <ul className="flex flex-col gap-1">
                {late_fee.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed" style={{ color: '#7A4F35' }}>
                    <span className="mt-0.5 shrink-0" style={{ color: '#C4603A' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
