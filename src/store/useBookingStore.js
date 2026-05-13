import { create } from 'zustand';

/**
 * useBookingStore — Global Zustand store for Momopet
 * Manages cart items, appointment selection, and cat info.
 */
const useBookingStore = create((set, get) => ({
  // ── Cart ──────────────────────────────────────────────────
  cartItems: [],

  addService: (service) => {
    const { cartItems } = get();
    // Prevent duplicate services
    if (cartItems.find((item) => item.id === service.id)) return;
    set({ cartItems: [...cartItems, service] });
  },

  removeService: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => set({ cartItems: [], appointmentDate: null, appointmentTime: null, catName: '' }),

  // ── Computed ──────────────────────────────────────────────
  getSubtotal: () => {
    return get().cartItems.reduce((sum, item) => sum + item.price, 0);
  },

  getTotalDurationMins: () => {
    return get().cartItems.reduce((sum, item) => sum + (item.durationMins || 0), 0);
  },

  // ── Appointment ───────────────────────────────────────────
  appointmentDate: null,   // JS Date object
  appointmentTime: null,   // string e.g. "2:00 PM"

  setAppointment: (date, time) => set({ appointmentDate: date, appointmentTime: time }),

  // ── Cat Info ──────────────────────────────────────────────
  catName: '',
  setCatName: (name) => set({ catName: name }),

  // ── Booking Step ──────────────────────────────────────────
  // 'services' | 'datetime' | 'catinfo' | 'confirmation'
  bookingStep: 'services',
  setBookingStep: (step) => set({ bookingStep: step }),

  // ── Cart UI ───────────────────────────────────────────────
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // ── Booking Modal ─────────────────────────────────────────
  isBookingOpen: false,
  openBooking: () => set({ isBookingOpen: true, bookingStep: 'datetime' }),
  closeBooking: () => set({ isBookingOpen: false }),
}));

export default useBookingStore;
