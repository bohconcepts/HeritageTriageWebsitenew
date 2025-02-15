import React, { useEffect } from 'react';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Priorities from './components/Priorities';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { Carousel } from './components/Carousel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import About from './components/About';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const carouselItems = [
    {
      title: "Understanding Global Market Trends",
      description: "Stay ahead of the curve with insights into emerging global trends, consumer behaviors, and industry forecasts. Our commercial guide provides up-to-date analysis on key sectors, helping your business make informed decisions on where and when to expand.ur services are designed to break down barriers and open doors for your businesses seeking to expand internationally within the African region. With our expert guidance, market insights, and direct connections, your local companies can confidently navigate new markets and thrive on a global scale.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
    },
    {
      title: "Market Entry Strategies & Planning",
      description: "Facilitate Create a clear, actionable market entry strategy with our comprehensive resources. From choosing the right entry mode (e.g., joint ventures, direct investment, partnerships) to understanding local business customs, our guide helps you craft a tailored plan that aligns with your business goals. connections through targeted matchmaking programs that pair your businesses with the right international partners, suppliers, and buyers, tailored trade missions, offering curated networking opportunities, direct meetings, and valuable market insights that drive export growth. Our comprehensive market entry reports provide businesses with the insights they need to understand new markets, assess competition, and develop effective entry strategies.",         
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
    },
    {
      title: "Cross-Cultural Communication and Negotiations",
      description: "Ready to take Success in international markets requires cultural sensitivity and strong negotiation skills. Our guide offers tips on how to navigate cross-cultural differences, build trust with foreign partners, and effectively negotiate contracts, ensuring long-term business success. region’s growth to the next level? Connect with one of our experts to explore tailored strategies, insights, and solutions that can unlock your investment potential. Let’s work together to build a roadmap for your success.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
    },
    {
      title: "Building Local Partnerships and Distribution Networks",
      description: "Many businesses establish a strong presence in foreign markets by identifying and partnering with local distributors, agents, and resellers. Our guide details how to select the right partners, negotiate agreements, and build efficient supply chains that ensure your products reach the right audience. to expand internationally due to a lack of market knowledge, resources, and connections, which limits their ability to compete on a global scale. Without the right support, entering new markets can be overwhelming, costly, and fraught with risks, leading to missed opportunities and stunted growth.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
    },
     {
      title: "Marketing and Brand Positioning Abroad",
      description: "Eliminate these Build a global brand that resonates with international consumers. Our guide provides strategies for adapting your marketing, advertising, and product positioning to meet local preferences, cultural nuances, and legal restrictions, ensuring your brand connects authentically with new markets. by providing your businesses with the strategic insights and hands-on support needed to confidently enter new markets. From comprehensive market entry reports to curated trade missions and B2B matchmaking, we equip your local businesses with the tools and connections to successfully navigate the complexities of international trade. Let us guide your businesses to new heights by opening doors to global opportunities and reducing the risks associated with market expansion.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <Priorities />
                <Testimonials />
                <About />
                <div id="understanding-industry-trends" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Understanding Industry Trends</h2>
                  <p className="mt-4 text-xl text-gray-600">
                  Highlights on International Trade, Foreign Direct Invesment and Industry Trends
                  </p>
                </div>
                  <Carousel items={carouselItems} />
                </div>
                <ContactForm />
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
