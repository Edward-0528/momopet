import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Plus, Check } from 'lucide-react';
import useBookingStore from '../../store/useBookingStore';

export default function ServiceCard({ service }) {
  const cartItems  = useBookingStore((s) => s.cartItems);
  const addService = useBookingStore((s) => s.addService);
  const removeService = useBookingStore((s) => s.removeService);

  const inCart = cartItems.some((item) => item.id === service.id);

  const handleToggle = () => {
    if (inCart) {
      removeService(service.id);
    } else {
      addService(service);
    }
  };

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#fff',
        boxShadow: inCart
          ? '0 0 0 2px #C4603A, 0 8px 24px rgba(61,35,20,0.12)'
          : '0 4px 16px rgba(61,35,20,0.09)',
        fontFamily: 'Nunito, sans-serif',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: inCart
        ? '0 0 0 2px #C4603A, 0 12px 32px rgba(61,35,20,0.16)'
        : '0 8px 28px rgba(61,35,20,0.14)'
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Image */}
      <div
        className="w-full overflow-hidden"
        style={{ backgroundColor: '#F2E4D4', aspectRatio: '1 / 1' }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category pill */}
        {service.category === 'addon' && (
          <span
            className="self-start mb-2 px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: '#F2E4D4', color: '#7A4F35' }}
          >
            Add-on
          </span>
        )}

        <h3
          className="text-sm sm:text-base font-extrabold mb-1.5 leading-snug"
          style={{ color: '#3D2314' }}
        >
          {service.title}
        </h3>

        {service.description && (
          <p
            className="text-xs leading-relaxed mb-3 flex-1"
            style={{
              color: '#7A4F35',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {service.description}
          </p>
        )}

        {/* Price + duration row */}
        <div className="flex items-center justify-between mt-auto mb-3">
          <span
            className="text-base sm:text-lg font-extrabold"
            style={{ color: '#C4603A' }}
          >
            {service.priceDisplay}
          </span>
          <span
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: '#F2E4D4', color: '#7A4F35' }}
          >
            <Clock size={11} />
            {service.duration}
          </span>
        </div>

        {/* Add / Remove button */}
        <motion.button
          onClick={handleToggle}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
          style={{
            backgroundColor: inCart ? '#F2E4D4' : '#C4603A',
            color: inCart ? '#C4603A' : '#fff',
          }}
          aria-label={inCart ? `Remove ${service.title} from cart` : `Add ${service.title} to cart`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {inCart ? (
              <motion.span
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Check size={15} strokeWidth={3} /> Added
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Plus size={15} strokeWidth={3} /> Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
