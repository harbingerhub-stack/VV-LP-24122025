import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FloatingCTA = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on EOI page
  if (location.pathname === '/eoi') {
    return null;
  }

  return (
    <button
      onClick={() => navigate('/eoi')}
      className="fixed bottom-6 right-6 z-50 bg-[#9B9068] hover:bg-[#7a7352] text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
    >
      <span className="font-semibold">Register Now</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

export default FloatingCTA;
