import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" richColors />
        <FloatingCTA />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/eoi" element={<EOIForm />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
