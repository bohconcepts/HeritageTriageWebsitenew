import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Event = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageSrc = 'https://i.imgur.com/your_image_id.png'; // Replace with a valid image URL

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(0);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(0);
  };

  const goToNext = () => {
    setCurrentIndex(0);
  };

  return (
    <section id="event" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">Upcoming Event</h2>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ height: '600px' }}>
          <img
            src={imageSrc}
            alt="Ghana Immersion & Exploratory Trip"
            className="w-full h-full object-contain"
          />

          <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <button onClick={goToPrevious} className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 focus:outline-none">
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <button onClick={goToNext} className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 focus:outline-none">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
