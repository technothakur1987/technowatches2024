// src/components/WatchLoader.jsx
import React, { useEffect, useState, memo } from 'react';
import { BsWatch } from "react-icons/bs";
import startimage from '../assets/startimage.gif'

const WatchLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4200); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    loading ? (
      <div className="fixed inset-0 flex items-center justify-center z-[9997] font-playfair w-screen overflow-hidden h-screen ">
        <div className="relative w-full h-screen">
          <img 
            src={startimage} 
            alt="Loading" 
            className="w-full h-full object-cover"
          />
          {/* Darker overlay */}
          <div className="absolute inset-0 bg-black opacity-75"></div>
          {/* Centered text */}
          <div className="absolute inset-0 flex flex-col items-start justify-start  pt-[5vh] sm:pt-[25vh] text-center  px-2 sm:px-6">
            <h1 className="text-[#ffdc00]  text-3xl sm:text-6xl font-bold mb-8 animate-fade-up">Welcome to Techno-Watches</h1>
            <p className="text-[#ffdc00]   text-xl sm:text-3xl font-semibold mb-2 animate-fade-up animate-delay-200">Explore our exclusive collection of modern timepieces.</p>
            <p className="text-[#ffdc00]  text-xl sm:text-3xl  font-semibold mb-10 animate-fade-up animate-delay-400">Where innovation meets timeless elegance and Luxury.</p>
            {/* <BsWatch className='text-[#ffdc00]  text-9xl font-bold ml-[10%] animate-fade-up animate-delay-600' /> */}
            <img 
          src='https://i.ibb.co/1KcTqwG/technowatches-high-resolution-logo-transparent-2.png' 
          alt="Logo" 
          className='h-[12vh] sm:h-[20vh] md:h-[30vh] object-contain ml-[10%] animate-fade-up animate-delay-60'
        />
          </div>
        </div>
      </div>
    ) : null
  );
};

export default memo(WatchLoader);
