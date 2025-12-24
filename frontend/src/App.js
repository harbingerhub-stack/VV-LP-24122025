import React from 'react';
import "./App.css";
import { Toaster } from './components/ui/sonner';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Location from './components/sections/Location';
import Plots from './components/sections/Plots';
import Amenities from './components/sections/Amenities';
import Manor from './components/sections/Manor';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="App font-body">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <Hero />
        <About />
        <Location />
        <Plots />
        <Amenities />
        <Manor />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
