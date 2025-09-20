"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12 lg:px-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left Side - Text */}
        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Who we are</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Company <span className="text-gray-700">Profile</span>
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            <strong>Toemech NG Ltd</strong> is an indigenous{" "}
            <strong>mechanical and electrical engineering solutions company</strong>, 
            providing high-quality services for both{" "}
            <strong>industrial and residential projects</strong>. Our expertise covers:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Industrial & Home Electrical Systems – installation and maintenance.</li>
            <li>Mechanical Systems & Fabrication – HVAC, plumbing, and piping.</li>
            <li>Supply of Quality Engineering and Electrical Materials.</li>
            <li>Complete Project Execution – from design to after-service support.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-8">
            We are a full-fledged engineering company committed to delivering{" "}
            <strong>innovative, safe, and cost-effective solutions</strong> that power 
            industries, support businesses, and enhance homes — all without compromising 
            quality and safety.
          </p>
          <a
            href="#"
            className="inline-block border border-gray-700 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition"
          >
            Learn More →
          </a>
        </div>

        {/* Right Side - Image Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/toemech1.jpeg"
              alt="Industrial Engineering"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/toemech2.jpeg"
              alt="Electrical Works"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/toemech3.jpeg"
              alt="Engineering Team"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/toemech4.jpeg"
              alt="Engineering Materials"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
