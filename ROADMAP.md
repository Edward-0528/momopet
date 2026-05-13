# 🐾 MoMoPet — Senior SWE Project Roadmap
### Whimsical Cat Grooming Spa | Irvine, CA | v1.0

> **Engineering Persona:** Senior SWE — pragmatic, component-first, performance-aware, accessibility-conscious. We ship clean, maintainable code with room to scale.

---

## 📐 Tech Stack Decision

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **React 18 + Vite** | Fast HMR, lean bundle, modern defaults |
| Styling | **Tailwind CSS v3** | Utility-first, purged CSS, rapid responsive design |
| Routing | **React Router v6** | SPA routing, future-proof nested routes |
| State | **Zustand** | Lightweight global cart/booking state, no boilerplate |
| Animation | **Framer Motion** | Smooth illustrative micro-interactions |
| Maps | **Google Maps Embed API** | Interactive map, no heavy SDK needed for v1 |
| Forms | **React Hook Form + Zod** | Validation with schema, zero re-renders |
| Date/Calendar | **date-fns + custom calendar component** | Lightweight, no heavy UI lib dependency |
| Icons | **Lucide React** | Consistent, tree-shakeable |
| Font | **Nunito (Google Fonts)** | Playful yet readable; weights 400/600/700/800 |
| Deployment | **Vercel** | Zero-config, preview deploys, fast CDN |

---

## 🎨 Design System

### Color Palette (extracted from mockup)
```
--color-cream:        #F5EDE0   /* Page background */
--color-coral:        #C4603A   /* Primary CTA, badges, accents */
--color-coral-light:  #E07A56   /* Hover states */
--color-brown-dark:   #3D2314   /* Headings, strong text */
--color-brown-mid:    #7A4F35   /* Body text, subheadings */
--color-sand:         #EAD9C5   /* Card backgrounds, dividers */
--color-white:        #FFFFFF   /* Cards, modals */
--color-tag-bg:       #F2E4D4   /* Duration badge background */
--color-green-soft:   #C8DDB4   /* Available date highlights */
--color-red-soft:     #F5C6C0   /* Unavailable/crossed dates */
```

### Typography Scale (Nunito)
```
Display:   800 weight, 2.5–3.5rem  → Hero headline
H1:        700 weight, 2rem         → Section titles
H2:        700 weight, 1.5rem       → Card titles
Body:      400 weight, 1rem         → Descriptions
Caption:   600 weight, 0.875rem     → Badges, labels
Button:    700 weight, 1rem         → CTAs
```

### Spacing & Border Radius
- Cards: `rounded-2xl` (16px), `shadow-md`
- Buttons: `rounded-full` (pill shape)
- Modals/Cart: `rounded-t-3xl` on mobile (bottom sheet)

---

## 🗺️ Site Architecture

```
/                          → Landing Page (Hero + Services Preview + CTA)
/services                  → Full Services Grid with Cart
/book                      → Booking Flow (Calendar + Time + Cat Info)
/confirmation              → Appointment Confirmation Receipt
```

---

## 🏗️ Phase Breakdown

---

### ✅ Phase 0 — Project Scaffolding
**Estimated time: 0.5 days**

- [ ] `npm create vite@latest momopet -- --template react`
- [ ] Install & configure Tailwind CSS v3
- [ ] Install dependencies: `zustand`, `framer-motion`, `react-router-dom`, `react-hook-form`, `zod`, `date-fns`, `lucide-react`
- [ ] Set up folder structure (see below)
- [ ] Configure Google Fonts (Nunito) in `index.html`
- [ ] Set up global CSS variables for color tokens
- [ ] Add `tailwind.config.js` with custom theme extensions (colors, fonts, border-radius)
- [ ] Drop in pre-built assets: hero image, secondary image, 10x service images
- [ ] Seed `data/services.json` with full MoMoPet service catalog
- [ ] Seed `data/companyInfo.json` with business details and policies

**Folder Structure:**
```
src/
├── assets/
│   ├── hero.png
│   ├── secondary.png
│   └── services/           ← 10 individual service images
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── Card.jsx
│   │   └── Modal.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── ServicesGrid.jsx
│   │   ├── MapSection.jsx
│   │   └── PolicyBanner.jsx
│   ├── booking/
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── CalendarPicker.jsx
│   │   ├── TimePicker.jsx
│   │   ├── CatInfoForm.jsx
│   │   └── BookingModal.jsx
│   └── confirmation/
│       ├── ReceiptCard.jsx
│       └── PolicyWarnings.jsx
├── data/
│   ├── services.json
│   └── companyInfo.json
├── store/
│   └── useBookingStore.js  ← Zustand store
├── pages/
│   ├── LandingPage.jsx
│   ├── ServicesPage.jsx
│   ├── BookingPage.jsx
│   └── ConfirmationPage.jsx
├── hooks/
│   ├── useCart.js
│   └── useAvailability.js
└── utils/
    ├── formatCurrency.js
    └── dateHelpers.js
```

---

### ✅ Phase 1 — Landing Page (Hero + Nav + Footer)
**Estimated time: 1 day**

**Navbar**
- [ ] Logo text "MoMoPet" in Nunito 800, coral color
- [ ] Desktop nav links: Home, Grooming (dropdown), Petting, Blog
- [ ] Right side: "Log in" text link + "Sign Up" coral pill button
- [ ] Mobile: hamburger menu → full-screen slide-down drawer
- [ ] Sticky on scroll with subtle `backdrop-blur` background

**Hero Section**
- [ ] Warm cream background full-bleed
- [ ] Left: headline "MoMoPet: Premium Grooming for Your Beloved Feline" in Nunito 800
- [ ] "Learn More" coral pill CTA button → scrolls to services
- [ ] Right: hero illustration image (pre-built asset)
- [ ] Responsive: stacks vertically on mobile, side-by-side on `md+`
- [ ] Framer Motion: fade-in + slight upward translate on page load

**Cat Cloud Section (below hero)**
- [ ] Full-width secondary illustration
- [ ] "Cat Cloud" badge overlay
- [ ] Subtle parallax or float animation (Framer Motion `animate` loop)

**Store Info Strip**
- [ ] Address: 17145 Von Karman Ave Ste 104, Irvine, CA 92614-0907
- [ ] Phone: +1 626-216-6878
- [ ] Two map thumbnail preview cards
- [ ] Links to `/book` CTA

**Footer**
- [ ] Logo, address, phone, email
- [ ] Policy snippets (health, late fee)
- [ ] Social links placeholders

---

### ✅ Phase 2 — Services Grid Page
**Estimated time: 1.5 days**

**Services Grid**
- [ ] Section header: "Explore Our Curated Services"
- [ ] Responsive CSS Grid: 1 col mobile → 2 col tablet → 3 col desktop
- [ ] `ServiceCard` component:
  - Illustrated image (top, rounded)
  - Service title (Nunito 700)
  - Short description (2-line clamp, expandable)
  - Price chip (`$75.00+`) in coral
  - Duration badge (clock icon + time) in sand/tag-bg
  - "Add to Cart" button (+ icon, coral fill)
  - Animated check state when added
- [ ] "Add-on" services visually distinguished (smaller cards)
- [ ] Service total ticker at bottom of page: **"SERVICE TOTAL: $0.00"** — live updating

**Service Data (all 10 services from JSON):**
```
01 Standard Bath & Care     $75+     1h 30m
02 ISB Deluxe Bath & Care   $109     2h
03 Lion Cut                 $90      1h
04 Nail Trimming            $15      10m
05 Ear Cleaning             $15      10m
06 Brush Teeth              $20      15m
07 De-Shedding              $25      20m
08 De-Matting               $20–100  30m
09 Paw & Sanitary Trim      $25      20m
10 Degrease Balm            $20      25m
```

---

### ✅ Phase 3 — Dynamic Cart (Global State)
**Estimated time: 1 day**

**Zustand Store (`useBookingStore`)**
```js
{
  cartItems: [],          // selected services
  subtotal: 0,
  appointmentDate: null,
  appointmentTime: null,
  catName: '',
  addService(service),
  removeService(id),
  clearCart(),
  setAppointment(date, time),
  setCatName(name),
}
```

**Cart Drawer/Modal**
- [ ] Floating cart button (bottom-right, mobile) with item count badge
- [ ] Desktop: slide-in right panel
- [ ] Mobile: bottom sheet (`rounded-t-3xl`, swipe-to-dismiss)
- [ ] Shows: RECEIPT header, date, each service line item with price
- [ ] Subtotal → "Service Total" → "Estimated Grand Total"
- [ ] Store address display on receipt
- [ ] "Cancel" and "Book" CTA buttons
- [ ] Live price updates with Framer Motion number animation
- [ ] Empty state illustration when cart is empty

---

### ✅ Phase 4 — Booking Flow (Calendar + Time Picker)
**Estimated time: 2 days**

**Booking Modal / Page**
- [ ] Triggered from Cart "Book" button
- [ ] Step indicator: Services → Date & Time → Cat Info → Confirm

**Calendar Component (custom, no lib)**
- [ ] Month grid: Mon–Sat columns (business days only)
- [ ] Navigation: `<` prev / next `>` month arrows
- [ ] Available dates: normal with hover highlight (coral ring)
- [ ] Selected date: filled coral circle
- [ ] Unavailable/past dates: crossed out (×), muted red-soft tint
- [ ] Today highlight: subtle underline
- [ ] `date-fns` for all date math and formatting
- [ ] Availability logic: hook `useAvailability(month)` — for v1, mock a set of unavailable dates

**Time Picker**
- [ ] Row of pill buttons: `9:00 AM`, `11:00 AM`, `1:00 PM`, `2:00 PM`, `3:00 PM`
- [ ] Selected time: coral fill, white text
- [ ] Unselected: sand bg, brown text
- [ ] Grayed-out: booked slots
- [ ] Two rows if needed (wrap on mobile)

**Cat Info Form**
- [ ] Cat's Name text input
- [ ] React Hook Form + Zod validation (required, max 50 chars)
- [ ] Animated field focus with coral underline

**"Done" CTA**
- [ ] Coral full-width pill button
- [ ] Disabled until date + time + cat name are all filled
- [ ] On submit: stores to Zustand, navigate to `/confirmation`

---

### ✅ Phase 5 — Confirmation & Receipt Page
**Estimated time: 1 day**

**MoMoPet Confirmation Receipt**
- [ ] Card-style receipt layout (white card on cream bg)
- [ ] Header: "MoMoPet Confirmation Receipt" in Nunito 700
- [ ] Date + Time line
- [ ] Cat's Name field
- [ ] Itemized services list with prices
- [ ] Service Total + Estimated Grand Total
- [ ] Divider line separating receipt from policies

**Health Requirements Block**
- [ ] Coral/sand warning card
- [ ] Icon: paw or heart
- [ ] Full policy text from `companyInfo.json`

**Late Fee Policies Block**
- [ ] Bullet list:
  - 30+ min late → $25 fee
  - No-show → $50 fee

**Actions**
- [ ] "Book Another Appointment" → clears cart, back to `/services`
- [ ] "Print / Save" → `window.print()` with print-specific CSS

---

### ✅ Phase 6 — Interactive Map Section
**Estimated time: 0.5 days**

- [ ] Embedded Google Maps iframe (no API key for embed)
  ```
  https://www.google.com/maps/embed?pb=...17145+Von+Karman+Ave+Ste+104+Irvine+CA
  ```
- [ ] Styled container: rounded card, `shadow-lg`
- [ ] Overlay info card (absolute positioned): name, address, phone
- [ ] "Get Directions" link → opens Google Maps in new tab
- [ ] Mobile: full-width map, info card below
- [ ] Desktop: map left, info card right (side-by-side)

---

### ✅ Phase 7 — Polish, Animations & Accessibility
**Estimated time: 1 day**

**Micro-interactions (Framer Motion)**
- [ ] Service cards: hover lift (`y: -4`, shadow increase)
- [ ] Cart item add: scale bounce animation
- [ ] Cart total: animated number roll on change
- [ ] Page transitions: fade + slide between routes
- [ ] Modal: spring entrance from bottom (mobile) / right (desktop)
- [ ] Calendar date selection: scale pop

**Accessibility (a11y)**
- [ ] All interactive elements keyboard navigable
- [ ] Proper `aria-label` on icon buttons
- [ ] Focus visible outlines (coral colored)
- [ ] `role="dialog"` on cart modal with `aria-modal="true"`
- [ ] Color contrast ratios pass WCAG AA

**Performance**
- [ ] Lazy-load service images with `loading="lazy"`
- [ ] Vite image optimization
- [ ] Code-split pages with `React.lazy` + `Suspense`
- [ ] Lighthouse score target: 90+ Performance, 100 Accessibility

---

### ✅ Phase 8 — Deployment
**Estimated time: 0.5 days**

- [ ] `vercel.json` config for SPA routing fallback
- [ ] Environment variables setup (if Google Maps key needed later)
- [ ] Connect GitHub repo → Vercel auto-deploy
- [ ] Custom domain (optional, client-provided)
- [ ] Test on real mobile devices (iOS Safari + Android Chrome)

---

## 📅 Timeline Summary

| Phase | Description | Est. Time |
|---|---|---|
| 0 | Scaffolding & Setup | 0.5 days |
| 1 | Landing Page (Hero, Nav, Footer) | 1 day |
| 2 | Services Grid | 1.5 days |
| 3 | Dynamic Cart (Zustand) | 1 day |
| 4 | Booking Flow (Calendar + Time) | 2 days |
| 5 | Confirmation & Receipt | 1 day |
| 6 | Interactive Map | 0.5 days |
| 7 | Polish, Animation, a11y | 1 day |
| 8 | Deployment | 0.5 days |
| **Total** | | **~9 days** |

---

## 🗂️ Data Files

### `src/data/companyInfo.json`
```json
{
  "name": "MoMoPet",
  "phone": "+1 626-216-6878",
  "email": "zwl030524@gmail.com",
  "address": "17145 Von Karman Ave Ste 104, Irvine, CA 92614-0907",
  "policies": {
    "health_requirement": "We kindly accept only healthy cats with calm, friendly temperaments for grooming appointments. Please make sure your cat is free from fleas, ticks, or any health issues before scheduling.",
    "late_fee": "If you arrive more than 30 minutes late, a late fee of $25 will be charged. No-shows will also be charged $50."
  }
}
```

### `src/data/services.json`
Full catalog of all 10 services (id, title, price, duration, description, image path).

---

## 🔮 v2 Backlog (Post-Launch)

- [ ] Real availability calendar via Square Appointments API or backend
- [ ] Email/SMS confirmation (Resend or Twilio)
- [ ] Admin dashboard to manage bookings
- [ ] Multi-cat support (book for multiple cats)
- [ ] Blog section (MDX-based)
- [ ] Loyalty points / referral program
- [ ] Before/After photo gallery
- [ ] WeChat/Line contact integration (bilingual clientele)
- [ ] Chinese language toggle (i18n with `react-i18next`)

---

## 📋 Component Checklist

```
[ ] Navbar
[ ] HeroSection
[ ] CatCloudSection
[ ] StoreInfoStrip
[ ] ServicesGrid
[ ] ServiceCard
[ ] ServiceTotalTicker
[ ] CartButton (floating)
[ ] CartDrawer
[ ] CartItem
[ ] BookingModal
[ ] StepIndicator
[ ] CalendarPicker
[ ] TimePicker
[ ] CatInfoForm
[ ] ConfirmationReceipt
[ ] HealthRequirementsCard
[ ] LateFeeCard
[ ] MapSection
[ ] Footer
[ ] Button (ui primitive)
[ ] Badge (ui primitive)
[ ] Modal (ui primitive)
[ ] PolicyBanner
```

---

*Built with ❤️ for MoMoPet — Irvine's premier whimsical cat grooming spa 🐱*
