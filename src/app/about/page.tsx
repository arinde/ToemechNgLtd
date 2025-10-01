"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Building2, Users, Cog, Bolt, Package, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".fade-in"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div ref={sectionRef} className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="fade-in text-4xl lg:text-6xl font-extrabold mb-6">
            Powering Progress. Engineering Excellence.
          </h1>
          <p className="fade-in text-lg lg:text-xl text-gray-300 mb-8">
            Toemech Nigeria Limited (RC: 480129) delivers trusted{" "}
            <span className="font-semibold text-white">
              mechanical & electrical engineering
            </span>{" "}
            solutions for industries and homes. Established in 2003 by{" "}
            <strong>Engr. Titus Towoju</strong>, COREN-certified engineer and
            Fellow of NATE.
          </p>
          <div className="fade-in flex flex-wrap justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition">
              Talk to Our Engineers
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition">
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 px-6 lg:px-20 max-w-6xl mx-auto">
        <h2 className="fade-in text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
          Our Story
        </h2>
        <p className="fade-in text-lg leading-relaxed text-gray-700 mb-6">
          Founded in 2003, Toemech Nigeria Limited grew from the vision of{" "}
          <strong>Engr. Titus Towoju</strong>, who began his career as a
          technician in 1992. After years of field experience and furthering his
          education, he became a{" "}
          <span className="font-semibold">
            COREN-certified Engineer and a Fellow of the Nigerian Association of
            Technologists in Engineering (NATE)
          </span>
          . His expertise and passion for progress built the foundation of
          Toemech — a company committed to delivering{" "}
          <em>reliable, safe, and future-ready engineering solutions</em>.
        </p>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16 px-6 lg:px-20">
        <h2 className="fade-in text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-900">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: Cog,
              title: "Mechanical Engineering",
              desc: "Industrial installations, plant maintenance, and machinery upgrades.",
            },
            {
              icon: Bolt,
              title: "Electrical Engineering",
              desc: "Power systems, wiring, backup generators, and industrial electrical setups.",
            },
            {
              icon: Package,
              title: "Materials Supply",
              desc: "High-quality mechanical & electrical materials for projects and operations.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="fade-in bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <item.icon className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 px-6 lg:px-20">
        <h2 className="fade-in text-3xl lg:text-4xl font-bold mb-8 text-center text-gray-900">
          Trusted By
        </h2>
        <p className="fade-in text-center text-lg text-gray-600 mb-10">
          Over the years, we have partnered with leading companies across
          Nigeria, including:
        </p>
        <div className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-gray-700 font-medium">
          <span>Reliance Chemical Products Ltd (Agbara)</span>
          <span>Sil Chemicals (Agbara)</span>
          <span>StrongPack Industries (Agbara)</span>
          <span>Flexi Pack (Agbara)</span>
          <span>Alucan (Agbara)</span>
          <span>PTML</span>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white py-16 px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
          {[
            { icon: Building2, label: "Founded", value: "2003" },
            { icon: Users, label: "Team", value: "50+ Staff" },
            { icon: ShieldCheck, label: "Clients", value: "6+ Major Partners" },
            { icon: Cog, label: "Experience", value: "20+ Years" },
          ].map((stat, idx) => (
            <div key={idx} className="fade-in flex flex-col items-center">
              <stat.icon className="w-10 h-10 text-red-500 mb-3" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-20 text-center">
        <h2 className="fade-in text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
          Ready to Power Your Next Project?
        </h2>
        <p className="fade-in text-lg text-gray-600 mb-8">
          From industrial plants to residential systems, Toemech delivers
          engineering solutions that last. Let’s work together to build the
          future.
        </p>
        <button className="fade-in bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl shadow-lg font-semibold transition">
          Get a Project Quote
        </button>
      </section>
    </div>
  );
}
