import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';
import companyInfo from '../../data/companyInfo.json';

export default function Footer() {
  return (
    <footer
      className="mt-auto pt-12 pb-8"
      style={{ backgroundColor: '#3D2314', fontFamily: 'Nunito, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

          {/* Brand column */}
          <div>
            <p className="text-2xl font-extrabold text-[#E07A56] mb-3">MoMoPet</p>
            <p className="text-[#EAD9C5] text-sm leading-relaxed mb-4">
              Irvine's whimsical cat grooming spa — where every whisker matters. 🐱
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#D9C4A8]">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 hover:text-[#E07A56] transition-colors"
              >
                <Phone size={14} /> {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2 hover:text-[#E07A56] transition-colors"
              >
                <Mail size={14} /> {companyInfo.email}
              </a>
              <a
                href={companyInfo.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 hover:text-[#E07A56] transition-colors"
              >
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>{companyInfo.address}</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="text-base font-bold text-[#E07A56] mb-3">Store Hours</p>
            <ul className="flex flex-col gap-1.5">
              {companyInfo.hours.map((h) => (
                <li key={h.day} className="flex justify-between text-sm text-[#D9C4A8]">
                  <span className="font-semibold">{h.day}</span>
                  <span>{h.open === 'Closed' ? 'Closed' : `${h.open} – ${h.close}`}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <p className="text-base font-bold text-[#E07A56] mb-3">Our Policies</p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-bold text-[#EAD9C5] mb-1">
                  {companyInfo.policies.health_requirement.title}
                </p>
                <p className="text-xs text-[#D9C4A8] leading-relaxed">
                  {companyInfo.policies.health_requirement.body}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#EAD9C5] mb-1">
                  {companyInfo.policies.late_fee.title}
                </p>
                <ul className="list-disc list-inside flex flex-col gap-1">
                  {companyInfo.policies.late_fee.items.map((item, i) => (
                    <li key={i} className="text-xs text-[#D9C4A8] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#7A4F35] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#7A4F35]">
            © {new Date().getFullYear()} MoMoPet. All rights reserved.
          </p>
          <p className="text-xs text-[#7A4F35] flex items-center gap-1">
            Made with <Heart size={11} className="text-[#C4603A]" fill="#C4603A" /> in Irvine, CA
          </p>
          <div className="flex gap-4 text-xs text-[#7A4F35]">
            <Link to="/services" className="hover:text-[#E07A56] transition-colors">Services</Link>
            <Link to="/book"     className="hover:text-[#E07A56] transition-colors">Book Now</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
