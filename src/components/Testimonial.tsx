"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(Draggable, ScrollTrigger);

const testimonials = [
  {
    name: "Sandeep Mali",
    role: "Project Manager, Reliance Chemical Product Limited",
    comment:
      "Toemech Nigeria delivered our structural welding and pipework with professionalism, meeting our tight deadlines and quality standards.",
    image: "/Services.jpg",
  },
  {
    name: "Mario",
    role: "Area Manager Agbara, Vita Construction",
    comment:
      "They exceeded our safety expectations. Their on-site procedures were top-notch, and the team was well-trained.",
    image: "/Services.jpg",
  },
  {
    name: "Facility Engineer",
    role: "Nigerian Breweries",
    comment:
      "The attention to detail and communication throughout the project was impressive. I’d recommend them anytime.",
    image: "/Services.jpg",
  },
  {
    name: "Linda Johnson",
    role: "Procurement Lead, Dangote Subsidiary",
    comment:
      "Reliable, timely, and transparent. Westmat is our go-to contractor for fabrication and erection projects.",
    image: "/Services.jpg",
  },
];

export default function Testimonial() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation when section is in view
      // Use fromTo() to ensure the elements animate from opacity: 0 to opacity: 1
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      // Make the track draggable horizontally
      if (trackRef.current && containerRef.current) {
        const wrapperWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        const maxDrag = Math.max(0, trackWidth - wrapperWidth);

        Draggable.create(trackRef.current, {
          type: "x",
          bounds: { minX: -maxDrag, maxX: 0 },
          inertia: true,
          edgeResistance: 0.85,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gray-50 overflow-hidden relative"
      ref={containerRef}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Hear from the people who trust us to deliver outstanding engineering
          services across Nigeria.
        </p>
      </div>

      {/* Draggable track */}
      <div className="overflow-hidden px-6 cursor-grab active:cursor-grabbing">
        <div
          ref={trackRef}
          className="flex gap-6 w-max select-none"
          style={{ touchAction: "pan-y" }}
        >
          {testimonials.map((item, i) => (
            <div
              key={i}
              // The testimonial-card class now has no initial opacity class
              className="testimonial-card bg-white rounded-xl shadow-md border border-gray-200 w-[280px] md:w-[300px] p-6 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <p className="text-md md:text-lg text-gray-600 mb-4 leading-relaxed">
                “{item.comment}”
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-blue-600"
                  width={40}
                  height={40}
                />
                <div>
                  <h4 className="text-sm font-semibold text-blue-600">
                    {item.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}