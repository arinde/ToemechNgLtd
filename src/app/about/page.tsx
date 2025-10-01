"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Factory, Wrench, Zap, ShoppingCart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800 ">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-28 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-16">
            About Toemech Nigeria Limited
          </h1>
          <p className="text-lg md:text-xl italic font-light">
            Powering Progress and Engineering Excellence
          </p>
        </motion.div>
      </section>

      {/* Our Story with CEO */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            Toemech Nigeria Limited (RC: 480129) was established in 2003 by{" "}
            <strong>Engr. Titus Towoju</strong>, a visionary who started his
            career as a technician in 1992. With years of practical experience
            across different companies, he pursued higher education and became a{" "}
            <strong>COREN certified Engineer</strong> and a{" "}
            <strong>Fellow of the Nigerian Association of Technologists in
            Engineering (FNATE)</strong>.
          </p>
          <p className="leading-relaxed text-gray-700">
            From humble beginnings, Toemech has grown into a leading force in{" "}
            <strong>Mechanical & Electrical Engineering</strong>, serving both
            industries and homes with innovative solutions, and employing over{" "}
            <strong>50 dedicated professionals</strong>.
          </p>
        </motion.div>

        {/* CEO Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Image
            src="/ceo.jpeg"
            alt="Engr. Titus Towoju"
            width={300}
            height={80}
            className="rounded-md shadow-xl object-cover"
          />
          <h3 className="mt-4 text-xl font-semibold">Engr. Titus Towoju</h3>
          <p className="text-sm opacity-80">
            Founder & CEO, COREN Certified, FNATE
          </p>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <motion.div whileHover={{ y: -5 }} className="bg-white shadow-md rounded-xl p-6">
              <Factory className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Industrial Engineering</h3>
              <p className="text-sm leading-relaxed">
                Design, installation, and maintenance of heavy-duty machines,
                production lines, and power systems for industries across Nigeria.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white shadow-md rounded-xl p-6">
              <Zap className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Electrical Solutions</h3>
              <p className="text-sm leading-relaxed">
                Power distribution, control panels, automation, and safety systems
                for both industries and homes.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white shadow-md rounded-xl p-6">
              <Wrench className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mechanical Services</h3>
              <p className="text-sm leading-relaxed">
                HVAC, plumbing, fabrication, industrial piping, repairs, and
                optimization of machinery.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white shadow-md rounded-xl p-6">
              <ShoppingCart className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sales of Materials</h3>
              <p className="text-sm leading-relaxed">
                Supply of quality mechanical & electrical materials, tools, and
                industrial spares for reliable operations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Approach */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Project Approach</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            "Understanding client needs through consultation and site survey.",
            "Designing tailored engineering solutions with cost efficiency.",
            "Procuring only high-quality materials and equipment.",
            "Expert installation, integration, and rigorous testing.",
            "Ongoing monitoring, maintenance, and after-sales support.",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex items-start gap-3"
            >
              <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0" />
              <p className="text-gray-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Clients</h2>
        <p className="max-w-3xl mx-auto mb-10 text-gray-700">
          We are trusted partners to leading organizations across Nigeria.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Reliance Chemical Products Limited (Agbara)",
            "Sil Chemicals (Agbara)",
            "Strongpack Industries (Agbara)",
            "Flexi Pack (Agbara)",
            "Alucan (Agbara)",
            "PTML",
          ].map((client, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partner With Us */}
      <section className="relative py-32 px-6 text-center text-white">
        <Image
          src="/toemech10.jpeg"
          alt="Engineering Background"
          fill
          className="absolute inset-0 object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
          <p className="mb-8 leading-relaxed">
            At Toemech Nigeria Limited, we combine experience, innovation, and
            dedication to deliver engineering excellence. Whether industrial or
            domestic, we are your trusted partner for sustainable solutions.
          </p>
          <button className="px-8 py-3 bg-blue-600 font-semibold rounded-full shadow hover:bg-blue-700 transition">
            Get in Touch
          </button>
        </motion.div>
      </section>
    </div>
  );
}
