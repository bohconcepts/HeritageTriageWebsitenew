import React, { useState, useEffect } from 'react';
    import { ChevronLeft, ChevronRight } from 'lucide-react';

    interface CarouselItem {
      title: string;
      description: string;
      image: string;
    }

    interface CarouselProps {
      items: CarouselItem[];
    }

    export const Carousel: React.FC<CarouselProps> = ({ items }) => {
      const [currentIndex, setCurrentIndex] = useState(0);

      const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
      };

      const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
      };

      useEffect(() => {
        const interval = setInterval(() => {
          goToNext();
        }, 5000);

        return () => clearInterval(interval);
      }, [currentIndex, items.length]);

      return (
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {items.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 relative h-[600px]">
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      style={{ filter: 'brightness(60%)' }}
                    />
                  </div>
                  <div className="relative p-12 text-white flex flex-col justify-center h-full">
                    <h3 className="text-3xl font-light mb-4">{item.title}</h3>
                    <p className="text-lg leading-relaxed max-w-2xl">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center">
            <button
              onClick={goToPrevious}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full p-2 focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full p-2 focus:outline-none"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      );
    };
