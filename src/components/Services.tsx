"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import {
  Wrench,
  Bolt,
  Home,
  Package,
  Factory,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    title: "Industrial Electrical Systems",
    description:
      "Design, installation, and maintenance of reliable electrical systems for factories, plants, and industries.",
    icon: <Bolt className="w-10 h-10 text-gray-400" />,
  },
  {
    title: "Mechanical Solutions",
    description:
      "HVAC, plumbing, piping, and structural fabrication services tailored to industrial and residential needs.",
    icon: <Wrench className="w-10 h-10 text-gray-400" />,
  },
  {
    title: "Residential Engineering",
    description:
      "Electrical and mechanical installations for homes and estates, ensuring safety and efficiency.",
    icon: <Home className="w-10 h-10 text-gray-200" />,
  },
  {
    title: "Material Supply",
    description:
      "Trusted sourcing and supply of top-quality electrical and mechanical materials at competitive rates.",
    icon: <Package className="w-10 h-10 text-gray-400" />,
  },
  {
    title: "Industrial Support Services",
    description:
      "Comprehensive engineering support including inspection, maintenance, and system upgrades.",
    icon: <Factory className="w-10 h-10 text-gray-400" />,
  },
  {
    title: "Safety & Compliance",
    description:
      "Ensuring all projects meet strict safety standards and regulatory compliance for long-term reliability.",
    icon: <ShieldCheck className="w-10 h-10 text-gray-400" />,
  },
];

const ServicesSection = () => {
  useEffect(() => {
    gsap.fromTo(
      ".service-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
    );
  }, []);

  return (
    <section
      className="relative py-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/Services.jpg')" }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-200">
          At Toemech NG Ltd, we deliver cutting-edge mechanical and electrical
          solutions designed to power industries, support businesses, and
          enhance residential living.
        </p>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              <div className="mb-6 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-200">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
