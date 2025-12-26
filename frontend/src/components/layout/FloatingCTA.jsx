import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
      className="fixed bottom-1/4 right-0 z-50 bg-[#9B9068] hover:bg-[#7a7352] text-white px-3 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
    >
      <span className="font-semibold tracking-wider text-sm">Register Now</span>
    </button>
  );
};

export default FloatingCTA;
