"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="bg-gray-100 py-12 px-6 md:px-12 lg:px-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left Side - Text */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600">Who we are</h3>
          <h2 className="text-2xl md:text-5xl font-bold mb-2 mt-2">
            Our Company <span className="text-gray-700">Profile</span>
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
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
          <Link
            href="/about"
            className="inline-block border border-gray-700 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition"
          >
            Learn More →
          </Link>
        </div>

        {/* Right Side - Image Collage */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden shadow-md"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/toemech7.jpeg"
              alt="Industrial Engineering"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="relative w-full h-72 md:h-80 rounded-lg overflow-hidden shadow-md"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <Image
              src="/toemech9.jpeg"
              alt="Electrical Works"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="relative w-full h-72 md:h-80 rounded-lg overflow-hidden shadow-md"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <Image
              src="/toemech5.jpg"
              alt="Engineering Team"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden shadow-md"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          >
            <Image
              src="/toemech4.jpeg"
              alt="Engineering Materials"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
