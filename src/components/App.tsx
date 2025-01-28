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
          title: "Connect Local Businesses to Global Markets",
          description: "Our services are designed to break down barriers and open doors for your businesses seeking to expand internationally within the African region. With our expert guidance, market insights, and direct connections, your local companies can confidently navigate new markets and thrive on a global scale.",
          image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
        },
        {
          title: "Match-Making Services",
          description: "Facilitate meaningful connections through targeted matchmaking programs that pair your businesses with the right international partners, suppliers, and buyers, tailored trade missions, offering curated networking opportunities, direct meetings, and valuable market insights that drive export growth. Our comprehensive market entry reports provide businesses with the insights they need to understand new markets, assess competition, and develop effective entry strategies.",         
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
        },
        {
          title: "Get help from our experts",
          description: "Ready to take your region’s growth to the next level? Connect with one of our experts to explore tailored strategies, insights, and solutions that can unlock your investment potential. Let’s work together to build a roadmap for your success.",
          image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
        },
        {
          title: "Navigating international markets and finding investors is complicated.",
          description: "Many businesses struggle to expand internationally due to a lack of market knowledge, resources, and connections, which limits their ability to compete on a global scale. Without the right support, entering new markets can be overwhelming, costly, and fraught with risks, leading to missed opportunities and stunted growth.",
          image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
        },
         {
          title: "Heritage Triage LLC’s international expansion services",
          description: "Eliminate these challenges by providing your businesses with the strategic insights and hands-on support needed to confidently enter new markets. From comprehensive market entry reports to curated trade missions and B2B matchmaking, we equip your local businesses with the tools and connections to successfully navigate the complexities of international trade. Let us guide your businesses to new heights by opening doors to global opportunities and reducing the risks associated with market expansion.",
          image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
        }
      ];

      return (
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Priorities />
            <Testimonials />
            <div data-aos="fade-up">
              <div className="text-center mb-12">
                <div className="text-base text-blue-600 font-semibold tracking-wide uppercase mb-2">
                  Level Up Your Skills
                </div>
                <h2 className="text-4xl font-light text-gray-900">
                  Unlock Your Potential
                </h2>
              </div>
              <Carousel items={carouselItems} />
            </div>
            <ContactForm />
          </main>
          <Footer />
        </div>
      );
    }

    export default App;
