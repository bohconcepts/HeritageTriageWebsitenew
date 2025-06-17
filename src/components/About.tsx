import { useEffect } from 'react';
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
        
        <div className="flow-root">
          <div className="float-left mr-8 mb-6 w-full sm:w-1/2 md:w-2/5 lg:w-1/3" data-aos="fade-right">
            <img
              className="w-full h-auto object-cover rounded-xl shadow-lg"
              src="/images/ceo.jpeg"
              alt="Rita Adwoa Adubra Asante - Founder & CEO"
            />
          </div>
          <div data-aos="fade-left">
            <div className="text-3xl font-bold tracking-wide mb-2">
              About Rita Adwoa Adubra Asante
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-6">
              Founder & Principal, Heritage Triage LLC
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Rita Adwoa Adubra Asante is a global strategist and commercial diplomacy expert with over a decade of experience helping companies expand across borders and industries. As the founder of Heritage Triage LLC, she leads a boutique consulting firm dedicated to empowering businesses, governments, and investors to navigate new markets, shape policy environments, and unlock sustainable growth.
              </p>
              
              <p>
                Her professional journey spans public, private, and regulatory sectors, giving her a unique ability to bridge the language of business with the demands of government. Early in her career, Rita worked with the Ghana Civil Aviation Authority, where she supported regulatory modernization and stakeholder engagement for one of West Africa's most vital aviation sectors. She later joined PwC Ghana, where she contributed to strategic advisory and operational improvement projects for multinational clients—gaining firsthand experience in corporate governance, risk, and high-performance delivery under pressure.
              </p>
              
              <p>
                Rita spent nearly a decade with the U.S. Department of Commerce, U.S. Commercial Service, where she advised more than 500 U.S. companies seeking growth across Sub-Saharan Africa. From organizing presidential-level trade missions to launching public-private investment platforms, she played a key role in helping brands like Pizza Hut, Cisco, and Zipline establish footholds in new markets. Her focus: delivering results through trusted partnerships, strategic storytelling, and policy navigation.
              </p>
              
              <p>
                In 2024, she founded Heritage Triage LLC with a powerful belief:
                <br />
                <span className="italic font-medium">Strategy should be clear, actionable, and transformational.</span>
              </p>
              
              <p>
                Heritage Triage specializes in market expansion, policy strategy, and investment readiness consulting, serving clients in the U.S., Africa, and the Middle East. Whether advising U.S. firms entering African markets or supporting African companies in structuring international partnerships, Rita's insight and influence continue to drive impact across sectors.
              </p>
              
              <p className="font-medium">
                What Drives Her Work:
              </p>
              
              <p>
                Market Access: Enabling businesses to enter high-growth, underrepresented markets
                <br />
                Policy Influence: Supporting organizations to understand and shape regulatory landscapes
                <br />
                Inclusive Development: Advancing small businesses, women entrepreneurs, and global-local collaboration
              </p>
              
              <p>
                Today, Rita continues to lead with purpose—whether she's designing cross-border growth strategies, moderating trade panels, or shaping thought leadership across commercial diplomacy.
              </p>
              
              <p>
                She is currently authoring Adubra's Journey, a memoir chronicling her rise from modest beginnings in Ghana to influencing boardrooms and bilateral deals around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
