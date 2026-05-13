import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Clock, Calendar } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StepIndicator from '../components/booking/StepIndicator';
import CalendarPicker from '../components/booking/CalendarPicker';
import TimePicker from '../components/booking/TimePicker';
import CatInfoForm from '../components/booking/CatInfoForm';
import useBookingStore from '../store/useBookingStore';
import { formatCurrency, formatDuration } from '../utils/formatCurrency';
import { formatReceiptDate } from '../utils/dateHelpers';
import catloadGif from '../assets/catload.gif';

const slideVariants = {
  enter:  { x: 40,  opacity: 0 },
  center: { x: 0,   opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:   { x: -40, opacity: 0, transition: { duration: 0.2, ease: 'easeIn'  } },
};

export default function BookingPage() {
  const navigate = useNavigate();

  const cartItems            = useBookingStore((s) => s.cartItems);
  const appointmentDate      = useBookingStore((s) => s.appointmentDate);
  const appointmentTime      = useBookingStore((s) => s.appointmentTime);
  const catName              = useBookingStore((s) => s.catName);
  const setAppointment       = useBookingStore((s) => s.setAppointment);
  const setCatName           = useBookingStore((s) => s.setCatName);
  const getSubtotal          = useBookingStore((s) => s.getSubtotal);
  const getTotalDurationMins = useBookingStore((s) => s.getTotalDurationMins);

  const [step, setStep] = useState('datetime');
  const [showLoader, setShowLoader] = useState(false);

  // Redirect to services if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) navigate('/services');
  }, [cartItems, navigate]);

  const subtotal  = getSubtotal();
  const totalMins = getTotalDurationMins();

  const canAdvanceDateTime = appointmentDate && appointmentTime;

  const handleCatInfoSubmit = ({ catName: name }) => {
    setCatName(name);
    setShowLoader(true);
    setTimeout(() => navigate('/confirmation'), 2200);
  };

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-20 pb-12 px-4"
        style={{ backgroundColor: '#F5EDE0', fontFamily: 'Nunito, sans-serif' }}
      >
        <div className="max-w-2xl mx-auto">

          {/* Page title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span
              className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
              style={{ backgroundColor: '#F2E4D4', color: '#C4603A' }}
            >
              📅 Book Appointment
            </span>
            <h1
              className="text-2xl sm:text-3xl font-extrabold"
              style={{ color: '#3D2314' }}
            >
              Complete Your Booking
            </h1>
          </motion.div>

          {/* Step indicator */}
          <div className="mb-8">
            <StepIndicator currentStep={step} />
          </div>

          {/* ── Cart Summary Card ─────────────────────────── */}
          <motion.div
            className="rounded-2xl p-4 mb-6"
            style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(61,35,20,0.08)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag size={16} color="#C4603A" />
              <span className="text-sm font-extrabold" style={{ color: '#3D2314' }}>
                Your Services
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-xs" style={{ color: '#7A4F35' }}>
                  <span className="font-semibold">{item.title}</span>
                  <span className="font-bold" style={{ color: '#C4603A' }}>{item.priceDisplay}</span>
                </div>
              ))}
            </div>
            <div
              className="flex justify-between mt-3 pt-3 border-t text-sm font-extrabold"
              style={{ borderColor: '#EAD9C5', color: '#3D2314' }}
            >
              <div className="flex items-center gap-1.5" style={{ color: '#7A4F35' }}>
                <Clock size={13} />
                <span className="text-xs font-semibold">{formatDuration(totalMins)}</span>
              </div>
              <span>Total: <span style={{ color: '#C4603A' }}>{formatCurrency(subtotal)}+</span></span>
            </div>
          </motion.div>

          {/* ── Step Panels ───────────────────────────────── */}
          <AnimatePresence mode="wait">

            {/* STEP 1: Date & Time */}
            {step === 'datetime' && (
              <motion.div
                key="datetime"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div
                  className="rounded-2xl p-5 sm:p-6 mb-5"
                  style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(61,35,20,0.08)' }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar size={16} color="#C4603A" />
                    <span className="text-sm font-extrabold" style={{ color: '#3D2314' }}>
                      Select Appointment Date
                    </span>
                  </div>

                  <CalendarPicker
                    selectedDate={appointmentDate}
                    onSelect={(date) => setAppointment(date, appointmentTime)}
                  />

                  {appointmentDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-5 border-t"
                      style={{ borderColor: '#EAD9C5' }}
                    >
                      <TimePicker
                        selectedDate={appointmentDate}
                        selectedTime={appointmentTime}
                        onSelect={(time) => setAppointment(appointmentDate, time)}
                      />
                    </motion.div>
                  )}
                </div>

                {/* Selected summary pill */}
                {appointmentDate && appointmentTime && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl px-4 py-3 mb-5 text-sm font-semibold text-center"
                    style={{ backgroundColor: '#F2E4D4', color: '#7A4F35' }}
                  >
                    � {formatReceiptDate(appointmentDate)} at {appointmentTime}
                  </motion.div>
                )}

                <motion.button
                  disabled={!canAdvanceDateTime}
                  onClick={() => setStep('catinfo')}
                  whileTap={canAdvanceDateTime ? { scale: 0.97 } : {}}
                  className="w-full py-3.5 rounded-full text-sm font-extrabold text-white transition-all duration-200"
                  style={{
                    backgroundColor: canAdvanceDateTime ? '#C4603A' : '#D9C4A8',
                    cursor: canAdvanceDateTime ? 'pointer' : 'not-allowed',
                    boxShadow: canAdvanceDateTime ? '0 4px 16px rgba(196,96,58,0.30)' : 'none',
                  }}
                >
                  Continue →
                </motion.button>
              </motion.div>
            )}

            {/* STEP 2: Cat Info */}
            {step === 'catinfo' && (
              <motion.div
                key="catinfo"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Date/time summary chip */}
                <div
                  className="rounded-xl px-4 py-3 mb-5 flex items-center justify-between text-xs font-semibold"
                  style={{ backgroundColor: '#F2E4D4', color: '#7A4F35' }}
                >
                  <span>📅 {appointmentDate && formatReceiptDate(appointmentDate)}</span>
                  <span>🕐 {appointmentTime}</span>
                </div>

                <div
                  className="rounded-2xl p-5 sm:p-6 mb-5"
                  style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(61,35,20,0.08)' }}
                >
                  <p className="text-sm font-extrabold mb-1" style={{ color: '#3D2314' }}>
                    Tell Us About Your Cat 🐱
                  </p>
                  <p className="text-xs mb-5" style={{ color: '#7A4F35' }}>
                    We'd love to know who we're pampering today!
                  </p>
                  <CatInfoForm
                    defaultValue={catName}
                    onSubmit={handleCatInfoSubmit}
                  />
                </div>

                <button
                  onClick={() => setStep('datetime')}
                  className="flex items-center gap-1.5 text-xs font-bold mx-auto transition-colors hover:underline"
                  style={{ color: '#7A4F35' }}
                >
                  <ArrowLeft size={13} /> Back to Date &amp; Time
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
      <Footer />

      {/* ── Cat loading screen ─────────────────────────── */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="catloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-4"
            style={{ backgroundColor: 'rgba(245, 237, 224, 0.92)', backdropFilter: 'blur(6px)' }}
          >
            <img
              src={catloadGif}
              alt="Loading…"
              className="w-24 h-24 object-contain"
            />
            <p
              className="text-base font-bold"
              style={{ color: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
            >
              Booking your appointment…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
