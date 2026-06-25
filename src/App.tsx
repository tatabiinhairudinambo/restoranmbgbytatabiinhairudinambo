import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Coverage from './components/Coverage';
import CarGrid from './components/CarGrid';
import PriceTable from './components/PriceTable';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import CarsList from './pages/admin/CarsList';
import CarForm from './pages/admin/CarForm';
import Prices from './pages/admin/Prices';
import TestimonialsList from './pages/admin/TestimonialsList';
import AdminContacts from './pages/admin/Contacts';
import AdminLayout from './components/admin/AdminLayout';

function LandingPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Coverage />
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

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { borderRadius: '12px', fontSize: '14px', fontWeight: 500 },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cars" element={<CarsList />} />
          <Route path="cars/new" element={<CarForm />} />
          <Route path="cars/:id/edit" element={<CarForm />} />
          <Route path="prices" element={<Prices />} />
          <Route path="testimonials" element={<TestimonialsList />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
