import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Printer, CalendarCheck, MapPin } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import useBookingStore from '../store/useBookingStore';
import { formatCurrency, formatDuration } from '../utils/formatCurrency';
import { formatReceiptDate } from '../utils/dateHelpers';
import companyInfo from '../data/companyInfo.json';

export default function ConfirmationPage() {
  const navigate = useNavigate();

  const cartItems            = useBookingStore((s) => s.cartItems);
  const appointmentDate      = useBookingStore((s) => s.appointmentDate);
  const appointmentTime      = useBookingStore((s) => s.appointmentTime);
  const catName              = useBookingStore((s) => s.catName);
  const clearCart            = useBookingStore((s) => s.clearCart);

  // Snapshot the booking details into local state, then immediately clear the
  // cart so "Book Appointment" always starts fresh from /services.
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (!cartItems.length || !appointmentDate || !appointmentTime || !catName) {
      navigate('/services');
      return;
    }
    const snapshotItems = [...cartItems];
    setReceipt({
      cartItems: snapshotItems,
      appointmentDate,
      appointmentTime,
      catName,
      subtotal: snapshotItems.reduce((sum, item) => sum + item.price, 0),
      totalMins: snapshotItems.reduce((sum, item) => sum + (item.durationMins || 0), 0),
    });
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render nothing until the snapshot is ready
  if (!receipt) return null;

  const { subtotal, totalMins } = receipt;

  const handleBookAnother = () => {
    navigate('/services');
  };

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-20 pb-16 px-4"
        style={{ backgroundColor: '#F5EDE0', fontFamily: 'Nunito, sans-serif' }}
      >
        <div className="max-w-lg mx-auto">

          {/* Success header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#C8DDB4' }}
            >
              <CalendarCheck size={32} color="#2A5C1A" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: '#3D2314' }}>
              Booking Confirmed! 🎉
            </h1>
            <p className="text-sm" style={{ color: '#7A4F35' }}>
              We can't wait to pamper <strong>{receipt.catName}</strong>. See you soon!
            </p>
          </motion.div>

          {/* ── Receipt Card ──────────────────────────────── */}
          <motion.div
            className="mb-5 print-card"
            style={{ filter: 'drop-shadow(0 8px 32px rgba(61,35,20,0.14))' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {/* ── Torn / ripped top edge ── */}
            <svg
              viewBox="0 0 600 28"
              preserveAspectRatio="none"
              style={{ display: 'block', width: '100%', height: '28px' }}
              aria-hidden="true"
            >
              <path
                d="M0,28 V13 L12,5 L22,12 L35,3 L47,10 L58,2 L70,9 L83,16 L94,6 L107,13 L118,3 L130,11 L143,17 L155,5 L166,13 L178,4 L190,12 L202,19 L214,8 L225,15 L237,5 L249,13 L261,3 L273,11 L285,17 L296,6 L308,14 L320,4 L332,12 L343,18 L355,7 L367,14 L379,4 L390,12 L402,17 L414,6 L426,14 L437,4 L449,12 L461,3 L473,11 L484,18 L496,8 L508,15 L520,5 L531,13 L543,3 L555,11 L567,17 L578,7 L590,14 L600,8 V28 Z"
                fill="white"
              />
            </svg>

            {/* Receipt header band — no rounded top (torn edge handles it) */}
            <div
              className="px-6 py-4"
              style={{ backgroundColor: '#C4603A' }}
            >
              <p className="text-xs font-bold text-white/70 tracking-widest uppercase">
                Momopet
              </p>
              <p className="text-lg font-extrabold text-white">
                Confirmation Receipt
              </p>
            </div>

            {/* Receipt body */}
            <div className="px-6 py-5 rounded-b-3xl" style={{ backgroundColor: '#fff' }}>

              {/* Date, time, cat */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold" style={{ color: '#7A4F35' }}>Date</span>
                  <span className="font-extrabold" style={{ color: '#3D2314' }}>
                    {receipt.appointmentDate && formatReceiptDate(receipt.appointmentDate)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold" style={{ color: '#7A4F35' }}>Time</span>
                  <span className="font-extrabold" style={{ color: '#3D2314' }}>
                    {receipt.appointmentTime}&nbsp;
                    <span className="text-xs font-semibold" style={{ color: '#7A4F35' }}>
                      ({formatDuration(totalMins)})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold" style={{ color: '#7A4F35' }}>Cat's Name</span>
                  <span className="font-extrabold" style={{ color: '#3D2314' }}>{receipt.catName}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed mb-4" style={{ borderColor: '#EAD9C5' }} />

              {/* Line items */}
              <div className="flex flex-col gap-2 mb-4">
                {receipt.cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-semibold" style={{ color: '#7A4F35' }}>
                      • {item.title}
                    </span>
                    <span className="font-bold" style={{ color: '#3D2314' }}>
                      {item.priceDisplay}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t mb-4" style={{ borderColor: '#EAD9C5' }} />

              {/* Totals */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold" style={{ color: '#7A4F35' }}>Service Total</span>
                  <span className="font-bold" style={{ color: '#3D2314' }}>{formatCurrency(subtotal)}</span>
                </div>
                <div
                  className="flex justify-between text-base font-extrabold pt-1"
                  style={{ color: '#C4603A' }}
                >
                  <span>Estimated Grand Total</span>
                  <span>{formatCurrency(subtotal)}+</span>
                </div>
              </div>

              {/* Address */}
              <div
                className="mt-4 pt-4 border-t flex items-start gap-2 text-xs"
                style={{ borderColor: '#EAD9C5', color: '#7A4F35' }}
              >
                <MapPin size={13} className="shrink-0 mt-0.5" color="#C4603A" />
                <span>{companyInfo.address}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Health Requirements ───────────────────────── */}
          <motion.div
            className="rounded-2xl p-5 mb-4 flex gap-4"
            style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(61,35,20,0.07)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: '#F2E4D4' }}
            >
              <ShieldCheck size={20} color="#C4603A" />
            </div>
            <div>
              <p className="text-sm font-extrabold mb-1" style={{ color: '#3D2314' }}>
                {companyInfo.policies.health_requirement.title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#7A4F35' }}>
                {companyInfo.policies.health_requirement.body}
              </p>
            </div>
          </motion.div>

          {/* ── Late Fee Policies ─────────────────────────── */}
          <motion.div
            className="rounded-2xl p-5 mb-8 flex gap-4"
            style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(61,35,20,0.07)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: '#F2E4D4' }}
            >
              <Clock size={20} color="#C4603A" />
            </div>
            <div>
              <p className="text-sm font-extrabold mb-1.5" style={{ color: '#3D2314' }}>
                {companyInfo.policies.late_fee.title}
              </p>
              <ul className="flex flex-col gap-1">
                {companyInfo.policies.late_fee.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-xs leading-relaxed"
                    style={{ color: '#7A4F35' }}
                  >
                    <span className="shrink-0" style={{ color: '#C4603A' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── Actions ───────────────────────────────────── */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 no-print"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
          >
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold border-2 transition-all hover:bg-[#EAD9C5] active:scale-95"
              style={{ borderColor: '#D9C4A8', color: '#7A4F35' }}
            >
              <Printer size={15} /> Print Receipt
            </button>
            <button
              onClick={handleBookAnother}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
              style={{ backgroundColor: '#C4603A' }}
            >
              Book Another Appointment
            </button>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
