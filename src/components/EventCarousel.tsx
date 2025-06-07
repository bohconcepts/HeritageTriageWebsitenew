import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getActiveEvents } from '../services/eventService';
import { Event } from '../lib/types';

const EventCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch active events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const activeEvents = await getActiveEvents();
        setEvents(activeEvents);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Automatically change images every 45 seconds
  useEffect(() => {
    if (events.length === 0) return;
    
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 45000); // 45 seconds

    return () => clearInterval(intervalId);
  }, [events.length]);

  // Go to previous image
  const goToPrevious = () => {
    if (events.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1));
  };

  // Go to next image
  const goToNext = () => {
    if (events.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  return (
    <section id="event" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">Upcoming Events</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No upcoming events at this time.</div>
        ) : (
          <div className="relative rounded-lg overflow-hidden shadow-xl w-full max-w-4xl mx-auto">
            {events[currentIndex].registration_link ? (
              <a href={events[currentIndex].registration_link} target="_blank" rel="noopener noreferrer">
                <img
                  src={events[currentIndex].image_url}
                  alt={`Event ${currentIndex + 1}`}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
              </a>
            ) : (
              <img
                src={events[currentIndex].image_url}
                alt={`Event ${currentIndex + 1}`}
                className="w-full h-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />
            )}

            {events.length > 1 && (
              <>
                {/* Left Arrow */}
                <button 
                  onClick={goToPrevious} 
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 focus:outline-none"
                  title="Previous image"
                  aria-label="View previous event image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Arrow */}
                <button 
                  onClick={goToNext} 
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 focus:outline-none"
                  title="Next image"
                  aria-label="View next event image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Pagination Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {events.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 w-2 rounded-full focus:outline-none ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
                      aria-label={`Go to event ${index + 1}`}
                      title={`Event ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventCarousel;
