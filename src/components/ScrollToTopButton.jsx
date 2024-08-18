// src/components/ScrollToTopButton.jsx
import React, { useState, useEffect, memo } from 'react';
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Adjust visibility threshold as needed
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 z-[45] right-4 bg-[#ffdc00] text-[#000] border-3 border-[#000] p-3 rounded-full shadow-lg hover:bg-yellow-500  transition-colors flex justify-center items-center"
        aria-label="Scroll to top btn"
      >
        <FaArrowUp className="text-xl" />
      </button>
    )
  );
};

export default memo(ScrollToTopButton);
