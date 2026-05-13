import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ServicesPreview from '../components/sections/ServicesPreview';
import MapSection from '../components/sections/MapSection';
import PolicyBanner from '../components/sections/PolicyBanner';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesPreview />
        <PolicyBanner />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
