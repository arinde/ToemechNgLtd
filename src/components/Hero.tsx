import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const TomechHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation setup (you can replace this with actual GSAP code)
    const animateElements = () => {
      if (headingRef.current) {
        headingRef.current.style.opacity = '0';
        headingRef.current.style.transform = 'translateY(50px)';
        headingRef.current.style.animation = 'slideUp 1s ease-out 0.3s forwards';
      }
      
      if (subheadingRef.current) {
        subheadingRef.current.style.opacity = '0';
        subheadingRef.current.style.transform = 'translateY(30px)';
        subheadingRef.current.style.animation = 'slideUp 1s ease-out 0.6s forwards';
      }
      
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '0';
        ctaRef.current.style.transform = 'translateY(20px)';
        ctaRef.current.style.animation = 'slideUp 1s ease-out 0.9s forwards';
      }
    };

    animateElements();
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          >
            {/* Replace with your Cloudinary video URL */}
            <source src="https://res.cloudinary.com/ddinnivn2/video/upload/v1758375431/From_KlickPin_CF_High_voltage_power_station_View_from_flying_drone_Wide_angle_high_voltage_substation_with_tall_py_Video___Power_station_Wide_angle_High_voltage_i0rqtl.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-500/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-green-500/20 rounded-full animate-pulse delay-2000"></div>

        {/* Hero Content */}
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Main Heading */}
          <div ref={headingRef} className="mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                TOEMECH NIG LTD
              </span>
            </h1>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          {/* Subheading */}
          <div ref={subheadingRef} className="mb-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-4">
              Electrical & Mechanical
              <span className="block font-semibold text-blue-300">Engineering Excellence</span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Delivering innovative engineering solutions across Nigeria with precision, 
              reliability, and cutting-edge technology for over a decade.
            </p>
          </div>

          {/* Call to Action */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Get Quote Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span className="flex items-center gap-3">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                View Projects
              </span>
            </button>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-xs uppercase tracking-wider">Scroll</span>
          </div>
        </div>

      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default TomechHeroSection;