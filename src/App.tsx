import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CarGrid from './components/CarGrid';
import PriceTable from './components/PriceTable';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <CarGrid />
      <PriceTable />
      <Features />
      <Testimonials />
      <Contact />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
