import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: '/images/heritage-new-flyer.png',
      link: 'https://forms.gle/tfQnFcUtUg9zrK7x5'
    },
    {
      src: '/images/Memphis_Business_Trade.jpeg',
      // link: 'https://forms.gle/tfQnFcUtUg9zrK7x5'
    }
  ];

  // Automatically change images every 45 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 45000); // 45 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Go to previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Go to next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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
              className="w-full h-auto object-contain"
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
