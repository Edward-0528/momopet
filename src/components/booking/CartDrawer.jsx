import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Calendar, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../../store/useBookingStore';
import { formatDuration } from '../../utils/formatCurrency';
import AnimatedNumber from '../ui/AnimatedNumber';

export default function CartDrawer() {
  const isCartOpen   = useBookingStore((s) => s.isCartOpen);
  const closeCart    = useBookingStore((s) => s.closeCart);
  const cartItems    = useBookingStore((s) => s.cartItems);
  const removeService = useBookingStore((s) => s.removeService);
  const getSubtotal  = useBookingStore((s) => s.getSubtotal);
  const getTotalDurationMins = useBookingStore((s) => s.getTotalDurationMins);

  const navigate    = useNavigate();
  const closeRef    = useRef(null);

  const subtotal  = getSubtotal();
  const totalMins = getTotalDurationMins();

  // Focus the close button when drawer opens
  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => closeRef.current?.focus(), 80);
    }
  }, [isCartOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isCartOpen) closeCart(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, closeCart]);

  const handleBook = () => {
    closeCart();
    navigate('/book');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            className="fixed inset-0 z-50 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed z-50 flex flex-col"
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '88svh',
              borderRadius: '24px 24px 0 0',
              backgroundColor: '#F5EDE0',
              boxShadow: '0 -8px 40px rgba(61,35,20,0.18)',
              fontFamily: 'Nunito, sans-serif',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#D9C4A8' }} />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: '#EAD9C5' }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} color="#C4603A" aria-hidden="true" />
                <span className="text-base font-extrabold" style={{ color: '#3D2314' }}>
                  RECEIPT
                </span>
              </div>
              <button
                ref={closeRef}
                onClick={closeCart}
                aria-label="Close cart"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EAD9C5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ '--tw-outline-color': '#C4603A' }}
              >
                <X size={18} color="#7A4F35" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable items */}
            <div className="flex-1 overflow-y-auto px-5 py-3" aria-live="polite">
              <AnimatePresence initial={false}>
                {cartItems.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-14 gap-3"
                  >
                    <span className="text-5xl" aria-hidden="true">🛁</span>
                    <p className="text-sm font-semibold text-center" style={{ color: '#7A4F35' }}>
                      No services selected yet.
                      <br />Add something to get started!
                    </p>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex items-center justify-between py-3 border-b"
                      style={{ borderColor: '#EAD9C5' }}
                    >
                      <div className="flex-1 pr-3">
                        <p className="text-sm font-bold leading-tight" style={{ color: '#3D2314' }}>
                          {item.title}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#7A4F35' }}>
                          {item.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold" style={{ color: '#C4603A' }}>
                          {item.priceDisplay}
                        </span>
                        <motion.button
                          onClick={() => removeService(item.id)}
                          aria-label={`Remove ${item.title} from cart`}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.88 }}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F5C6C0] transition-colors"
                        >
                          <Trash2 size={13} color="#C4603A" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Totals + Actions */}
            {cartItems.length > 0 && (
              <div className="px-5 pt-3 pb-6 border-t" style={{ borderColor: '#EAD9C5' }}>
                {/* Duration */}
                <div className="flex justify-between text-xs mb-1" style={{ color: '#7A4F35' }}>
                  <span className="font-semibold">Est. Duration</span>
                  <span>{formatDuration(totalMins)}</span>
                </div>

                {/* Service total with animated roll */}
                <div className="flex justify-between text-sm mb-1" style={{ color: '#3D2314' }}>
                  <span className="font-bold">Service Total</span>
                  <span className="font-extrabold">
                    <AnimatedNumber value={subtotal} prefix="$" />
                  </span>
                </div>

                {/* Grand total */}
                <div
                  className="flex justify-between text-base mb-5 pt-2 border-t font-extrabold"
                  style={{ color: '#C4603A', borderColor: '#EAD9C5' }}
                >
                  <span>Estimated Grand Total</span>
                  <span><AnimatedNumber value={subtotal} prefix="$" suffix="+" /></span>
                </div>

                {/* Address */}
                <p className="text-xs mb-4 text-center" style={{ color: '#7A4F35' }}>
                  17145 Von Karman Ave Ste 104, Irvine, CA 92614
                </p>

                {/* CTA buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={closeCart}
                    className="flex-1 py-3 rounded-full text-sm font-bold border-2 transition-all hover:bg-[#EAD9C5] active:scale-95"
                    style={{ borderColor: '#D9C4A8', color: '#7A4F35' }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleBook}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 py-3 rounded-full text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
                    style={{ backgroundColor: '#C4603A', boxShadow: '0 4px 16px rgba(196,96,58,0.35)' }}
                  >
                    <Calendar size={15} aria-hidden="true" />
                    Book Now
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}