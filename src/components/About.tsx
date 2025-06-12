import React, { useEffect } from 'react';
import AOS from 'aos';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div id="about" className="pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold tracking-wide text-gray-900">About Our Founder</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 mb-8"></div>
        </div>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          <div className="relative" data-aos="fade-right">
            <img
              className="w-full h-auto object-cover rounded-xl shadow-lg"
              src="/images/ceo.jpeg"
              alt="Rita Adwoa Adubra Asante - Founder & CEO"
            />
          </div>
          <div className="mt-12 lg:mt-0" data-aos="fade-left">
            <div className="text-3xl font-bold tracking-wide mb-2">
              Meet Rita Adwoa Adubra Asante
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-6">
              Founder & Principal Consultant, Heritage Triage LLC
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Her story doesn't begin in a boardroom but in Accra, Ghana, where Rita learned the power of resilience, hard work, and service early in life. Raised by a widowed mother and guided by purpose, she grew up watching business, diplomacy, and community converge at kitchen tables and local trade fairs. It wasn't long before Rita realized her calling: to build bridges between global markets and local potential.
              </p>
              
              <p>
                Her journey took her from Ghana to Washington, D.C., where she spent nearly a decade with the U.S. Department of Commerce, U.S. Commercial Service helping over 500 U.S. businesses expand into Sub-Saharan Africa. Rita quickly became a trusted advisor, facilitating trade missions, structuring public-private partnerships, and navigating the complex terrain of policy and commerce. Along the way, she helped iconic brands like Pizza Hut, Cisco, and Zipline take root in new markets.
              </p>
              
              <p>
                But she wasn't finished yet.
              </p>
              
              <p>
                In 2024, Rita launched Heritage Triage LLC; a boutique consulting firm rooted in one powerful idea: strategy should be accessible, practical, and transformational. Built during late-night study sessions and early-morning pitch calls, Heritage Triage was born out of grit, vision, and Rita's unwavering belief that businesses can and should thrive across borders.
              </p>
              
              <p>
                Today, she leads the firm with a bold mission:
                <br />
                <span className="italic font-medium">To empower companies, governments, and entrepreneurs to enter new markets, shape policy narratives, and unlock sustainable growth.</span>
              </p>
              
              <p>
                From advising U.S. clients on expansion into Africa, to helping African firms understand global investment pathways, Rita remains deeply committed to commercial diplomacy, economic storytelling, and inclusive development.
              </p>
              
              <p>
                But ask her what makes her proudest, and she'll say this:
              </p>
              
              <p className="italic font-medium">
                "We don't just deliver strategy. We build a legacy; one client, one market, one milestone at a time."
              </p>
              
              <p>
                When she's not advising clients or moderating trade panels, Rita is writing Adubra's Journey, a memoir chronicling her rise from modest beginnings to global boardrooms and dreaming up new ways to help women and small businesses shape the global economy.
              </p>
              
              <p className="font-medium">
                Welcome to Heritage Triage; where strategy meets identity, and business becomes borderless.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
