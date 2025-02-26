import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const images = [
    {
      src: '/images/heritage-new-flyer.png',
      link: 'https://forms.gle/tfQnFcUtUg9zrK7x5'
    },
    {
      src: '/images/Memphis_Business_Trade.jpeg',
      link: 'https://forms.gle/tfQnFcUtUg9zrK7x5'
    }
  ];

  // Automatically transition images every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 500); // Match the transition duration
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Manually transition with buttons
  const goToPrevious = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setFade(false);
    }, 500);
  };

  const goToNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(false);
    }, 500);
  };

  return (
    <section id="event" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">Upcoming Event</h2>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-xl w-full max-w-4xl mx-auto">
          <a href={images[currentIndex].link} target="_blank" rel="noopener noreferrer">
            <img
              src={images[currentIndex].src}
              alt="Event"
              className={`w-full h-auto object-contain transition-opacity duration-500 ease-in-out transform ${fade ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            />
          </a>

          {/* Left Arrow */}
          <button 
            onClick={goToPrevious} 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={goToNext} 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 focus:outline-none"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;
