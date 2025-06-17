import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  title: string;
  description: string;
  image: string;
}

interface CarouselProps {
  items?: CarouselItem[];
}

const carouselItems = [
  {
    title: "Understanding Global Market Trends",
    description: "Stay ahead of the curve with insights into emerging global trends, consumer behaviors, and industry forecasts. Our commercial guide provides up-to-date analysis on key sectors, helping your business make informed decisions on where and when to expand. Our services are designed to break down barriers and open doors for businesses seeking to expand internationally within the African region. With our expert guidance, market insights, and direct connections, your local companies can confidently navigate new markets and thrive on a global scale.",
    image: "/images/Understanding Global Market Trends.jpeg"
  },
  {
    title: "Market Entry Strategies & Planning",
    description: "Facilitate a clear, actionable market entry strategy with our comprehensive resources. From choosing the right entry mode (e.g., joint ventures, direct investment, partnerships) to understanding local business customs, our guide helps you craft a tailored plan that aligns with your business goals. We create connections through targeted matchmaking programs that pair businesses with the right international partners, suppliers, and buyers. Our tailored trade missions offer curated networking opportunities, direct meetings, and valuable market insights that drive export growth.",
    image: "/images/Market Entry.jpeg"
  },
  {
    title: "Cross-Cultural Communication and Negotiations",
    description: "Success in international markets requires cultural sensitivity and strong negotiation skills. Our guide offers tips on how to navigate cross-cultural differences, build trust with foreign partners, and effectively negotiate contracts, ensuring long-term business success. Ready to take the region's growth to the next level? Connect with one of our experts to explore tailored strategies, insights, and solutions that can unlock your investment potential.",
    image: "/images/Cross Cultural Communication.webp"
  },
  {
    title: "Building Local Partnerships and Distribution Networks",
    description: "Many businesses establish a strong presence in foreign markets by identifying and partnering with local distributors, agents, and resellers. Our guide details how to select the right partners, negotiate agreements, and build efficient supply chains that ensure your products reach the right audience. Expanding internationally can be challenging due to a lack of market knowledge, resources, and connections, limiting the ability to compete on a global scale. Without the right support, entering new markets can be overwhelming, costly, and fraught with risks.",
    image: "/images/Building Local Partnership.webp"
  },
  {
    title: "Marketing and Brand Positioning Abroad",
    description: "Build a global brand that resonates with international consumers. Our guide provides strategies for adapting marketing, advertising, and product positioning to meet local preferences, cultural nuances, and legal restrictions, ensuring your brand connects authentically with new markets. We equip businesses with strategic insights and hands-on support needed to confidently enter new markets. From comprehensive market entry reports to curated trade missions and B2B matchmaking, we provide the tools and connections to successfully navigate international trade complexities.",
    image: "/images/Market Position.jpeg"
  }
];

export const Carousel: React.FC<CarouselProps> = ({ items = carouselItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div id="market-insights" className="pt-20 bg-gray-50">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-wide uppercase mb-6">Market Insights</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Highlights on International Trade, Foreign Direct Investment, and Industry Trends
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative" data-aos="fade-right">
            <img
              className="w-full h-[500px] object-contain rounded-xl"
              src={items[currentIndex].image}
              alt={items[currentIndex].title}
            />
          </div>

          {/* Text Section */}
          <div className="mt-12 lg:mt-0" data-aos="fade-left">
            <div className="text-4xl font-bold tracking-wide uppercase mb-6">
              {items[currentIndex].title}
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {items[currentIndex].description}
            </p>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={goToPrevious}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 transition-all focus:outline-none"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 transition-all focus:outline-none"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8">
          {items.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 mx-1 rounded-full cursor-pointer transition-all ${
                currentIndex === index ? 'bg-gray-800 scale-125' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
