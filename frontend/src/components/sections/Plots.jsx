import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Grid3X3, Map, X, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { plotsData } from '../../data/mock';

const featuresData = [
  "12 Metre Paver Roads with Pedestrian Walkway",
  "Parks & Recreation Zones",
  "Themed Landscape",
  "Neo Classical Architecture Theme",
  "Rain Water Harvesting",
  "Sewage System with Treatment Plant",
  "CCTV Surveillance",
  "Entrance Gate with Security Cabins",
  "Underground Electricity Infrastructure",
  "Underground Water Infrastructure",
  "Street Lights",
  "EV Charging Station"
];

const amenitiesData = [
  "Walking Tracks",
  "Yoga and Meditation Deck",
  "Open Air Gym",
  "Padel Court",
  "Barbeque Area",
  "Kids Play Area",
  "Tennis Court",
  "Basketball Court",
  "Kitchen and Herb Garden",
  "Bonfire Pit",
  "Staff Lounge",
  "Mini Golf"
];

const Plots = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('plots');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Close modal on escape key and reset zoom
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setZoomLevel(1);
      }
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setZoomLevel(1);
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sitePlanImage = "https://customer-assets.emergentagent.com/job_vv-hill-retreat/artifacts/i7w3vtim_master%20plan2.jpg";

  return (
    <section id="plots" ref={ref} className="py-24 md:py-32 bg-[#084a61]">
      <div className="container-custom">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">
            Plot Options
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4 mb-4">
            {plotsData.title}
          </h2>
          <p className="text-white/70 text-xl">{plotsData.subtitle}</p>
        </div>

        {/* Tab Menu */}
        <div className={`flex justify-center mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 inline-flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('plots')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeTab === 'plots'
                  ? 'bg-[#9B9068] text-white shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              Available Plot Sizes
            </button>
            <button
              onClick={() => setActiveTab('siteplan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeTab === 'siteplan'
                  ? 'bg-[#9B9068] text-white shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
              Master Plan
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeTab === 'features'
                  ? 'bg-[#9B9068] text-white shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Features & Amenities
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'plots' && (
          <>
            {/* Plot Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {plotsData.plots.map((plot, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#9B9068]/50 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="font-display text-4xl text-white mb-2">{plot.size}</div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[#9B9068] text-2xl font-semibold">{plot.sqft} Sq.ft</div>
                    <div className="text-white text-xl font-bold">{plot.cost}</div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-white/70">
                      <span>Available Units</span>
                      <span className="text-white font-semibold">{plot.units}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Category</span>
                      <span className="text-white font-semibold">{plot.price}</span>
                    </div>
                  </div>

                  <Button
                    onClick={scrollToContact}
                    className="w-full bg-transparent border-2 border-white/30 text-white hover:bg-[#9B9068] hover:border-[#9B9068] transition-all group-hover:border-[#9B9068]"
                  >
                    Enquire Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className={`text-center text-white/60 text-sm transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              *{plotsData.note}
            </p>
          </>
        )}

        {activeTab === 'siteplan' && (
          /* Site Plan Tab */
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-4xl mx-auto">
              {/* Clickable Image */}
              <div 
                onClick={() => setIsModalOpen(true)}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              >
                <img
                  src={sitePlanImage}
                  alt="Vacation Village Master Plan"
                  className="w-full h-auto object-contain bg-white"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4 shadow-lg">
                    <ZoomIn className="w-8 h-8 text-[#084a61]" />
                  </div>
                </div>
              </div>
              <p className="text-center text-white/60 text-sm mt-4">
                Click on the image to expand and view full details
              </p>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          /* Features & Amenities Tab */
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-6xl mx-auto">
              {/* Features Section */}
              <div className="mb-8">
                <h3 className="font-display text-xl text-white mb-5 text-center">
                  <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm">
                    <Sparkles className="w-4 h-4 text-[#9B9068]" />
                    Features
                  </span>
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {featuresData.map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all duration-300 group border border-white/5 hover:border-[#9B9068]/30"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#9B9068]/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#9B9068]/30 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#9B9068]" />
                      </div>
                      <span className="text-white/90 text-xs leading-tight block">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Section */}
              <div>
                <h3 className="font-display text-xl text-white mb-5 text-center">
                  <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm">
                    <Grid3X3 className="w-4 h-4 text-[#9B9068]" />
                    Amenities
                  </span>
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {amenitiesData.map((amenity, index) => (
                    <div 
                      key={index} 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all duration-300 group border border-white/5 hover:border-[#9B9068]/30"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#9B9068]/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#9B9068]/30 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#9B9068]" />
                      </div>
                      <span className="text-white/90 text-xs leading-tight block">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal/Lightbox */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image */}
          <img
            src={sitePlanImage}
            alt="Vacation Village Master Plan"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Plots;
