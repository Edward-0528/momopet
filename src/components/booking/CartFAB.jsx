import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import useBookingStore from '../../store/useBookingStore';
import AnimatedNumber from '../ui/AnimatedNumber';

export default function CartFAB() {
  const cartItems = useBookingStore((s) => s.cartItems);
  const toggleCart = useBookingStore((s) => s.toggleCart);
  const getSubtotal = useBookingStore((s) => s.getSubtotal);
  const { pathname } = useLocation();

  const count = cartItems.length;
  const subtotal = getSubtotal();

  // ServicesPage already has a sticky bar with a "Review Cart" button — hide FAB there
  const hideOnServices = pathname === '/services';

  return (
    <AnimatePresence>
      {count > 0 && !hideOnServices && (
        <motion.button
          key="cart-fab"
          onClick={toggleCart}
          initial={{ opacity: 0, y: 32, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-6 right-5 z-40 flex items-center gap-3 px-5 py-3.5 rounded-full shadow-xl"
          style={{
            backgroundColor: '#C4603A',
            fontFamily: 'Nunito, sans-serif',
            boxShadow: '0 6px 24px rgba(196,96,58,0.40)',
          }}
          aria-label={`Open cart — ${count} item${count > 1 ? 's' : ''}`}
        >
          <div className="relative">
            <ShoppingBag size={20} color="#fff" />
            <motion.span
              key={count}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white flex items-center justify-center text-xs font-extrabold"
              style={{ color: '#C4603A' }}
            >
              {count}
            </motion.span>
          </div>
          <span className="text-sm font-extrabold text-white">
            <AnimatedNumber value={subtotal} prefix="$" suffix="+" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
