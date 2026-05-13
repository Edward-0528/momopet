import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CartDrawer from './components/booking/CartDrawer';
import CartFAB from './components/booking/CartFAB';
import ScrollToTop from './components/ui/ScrollToTop';

const LandingPage      = lazy(() => import('./pages/LandingPage'));
const ServicesPage     = lazy(() => import('./pages/ServicesPage'));
const BookingPage      = lazy(() => import('./pages/BookingPage'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'));

const PageLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      fontFamily: 'Nunito, sans-serif',
      backgroundColor: '#F5EDE0',
    }}
  >
    <motion.span
      style={{ fontSize: '2.5rem' }}
      animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }}
    >
      🐾
    </motion.span>
    <motion.p
      style={{ color: '#C4603A', fontSize: '1rem', fontWeight: 700 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    >
      Loading…
    </motion.p>
  </motion.div>
);

/* Wraps each page with a fade + slight Y slide */
const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/"             element={<LandingPage />} />
            <Route path="/services"     element={<ServicesPage />} />
            <Route path="/book"         element={<BookingPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <>
      <AnimatedRoutes />
      {/* Global cart — persists across all page transitions */}
      <CartFAB />
      <CartDrawer />
    </>
  );
}

export default App;
