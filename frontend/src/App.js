import React from 'react';
import "./App.css";
import { Toaster } from './components/ui/sonner';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Location from './components/sections/Location';
import Plots from './components/sections/Plots';
import Manor from './components/sections/Manor';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
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
    </div>
  );
}

export default App;
