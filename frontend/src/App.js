import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import "./App.css";
import { Toaster } from './components/ui/sonner';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingCTA from './components/layout/FloatingCTA';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Location from './components/sections/Location';
import Plots from './components/sections/Plots';
import Manor from './components/sections/Manor';
import Contact from './components/sections/Contact';
import EOIForm from './pages/EOIForm';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CompanyProfile from './pages/CompanyProfile';
import AdminDashboard from './pages/AdminDashboard';

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Location />
        <Plots />
        <Manor />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// Wrapper to conditionally show FloatingCTA
function AppContent() {
  const location = useLocation();
  const hideFloatingCTA = location.pathname === '/admin';
  
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      {!hideFloatingCTA && <FloatingCTA />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/eoi" element={<EOIForm />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<CompanyProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
