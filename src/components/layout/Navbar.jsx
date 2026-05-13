import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useBookingStore from '../../store/useBookingStore';

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'Services',  to: '/services' },
  { label: 'Book Now',  to: '/services' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const cartItems  = useBookingStore((s) => s.cartItems);
  const openCart   = useBookingStore((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-[#F5EDE0]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-extrabold text-2xl tracking-tight"
            style={{ color: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
          >
            Momopet
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-[#C4603A]'
                      : 'text-[#7A4F35] hover:text-[#C4603A]'
                  }`
                }
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative p-2 rounded-full hover:bg-[#EAD9C5] transition-colors"
            >
              <ShoppingBag size={20} color="#7A4F35" />
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C4603A] text-white text-xs font-bold flex items-center justify-center"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {cartItems.length}
                </motion.span>
              )}
            </button>

            {/* Sign Up — desktop */}
            <Link
              to="/services"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
            >
              Book Now
            </Link>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-[#EAD9C5] transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} color="#7A4F35" /> : <Menu size={22} color="#7A4F35" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-16 left-0 right-0 z-40 bg-[#F5EDE0] shadow-lg px-6 py-6 flex flex-col gap-5"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-bold transition-colors ${
                      isActive ? 'text-[#C4603A]' : 'text-[#3D2314]'
                    }`
                  }
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/services"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex justify-center items-center px-5 py-3 rounded-full text-base font-bold text-white"
                style={{ backgroundColor: '#C4603A', fontFamily: 'Nunito, sans-serif' }}
              >
                Book Appointment
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
