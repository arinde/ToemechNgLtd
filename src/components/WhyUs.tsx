"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";
import {
  ShieldCheck,
  Cog,
  Star,
  Globe,
  HardHat,
} from "lucide-react";

type Card = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  Icon: React.FC<{ className?: string }>;
};

const cards: Card[] = [
  {
    id: "engineering",
    title: "Engineering Excellence",
    description:
      "Decades of combined experience in mechanical & electrical systems — from heavy industry automation to precision building services.",
    bullets: ["ISO-aligned processes", "Peer-reviewed designs", "Field-proven reliability"],
    Icon: Cog,
  },
  {
    id: "safety",
    title: "Safety & Compliance",
    description:
      "Safety is non-negotiable. We design to regulatory standards and maintain a zero-compromise safety culture on site.",
    bullets: ["HSE-certified teams", "Risk-based design reviews"],
    Icon: ShieldCheck,
  },
];

function useCountUp(target: number, start: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  React.useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (t: number) => {
      if (startTime === null) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, start, duration]);
  return count;
}

export default function ToemechWhyUs() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { ref: viewRef, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const projects = useCountUp(128, inView);
  const clients = useCountUp(42, inView);
  const safety = useCountUp(0, inView);

  // ✅ useLayoutEffect so GSAP runs before paint
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".why-heading", { y: 20, duration: 0.6 })
        .from(".why-sub", { y: 20, duration: 0.6 }, "-=0.4")
        .from(".stat", { y: 20, stagger: 0.12, duration: 0.5 }, "-=0.4")
        .from(".card", { y: 30, scale: 0.98, stagger: 0.15, duration: 0.6 }, "-=0.35");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="why-us-heading"
      className="relative overflow-hidden py-12  px-6 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100 opacity-40 blur-3xl rotate-12" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 opacity-40 blur-3xl -rotate-6" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left */}
        <div className="lg:pr-8" ref={viewRef}>
          <h2
            id="why-us-heading"
            className="why-heading text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 opacity-100"
          >
            Why partners choose <span className="text-blue-600">Toemech</span>
          </h2>
          <p className="why-sub mt-4 text-gray-600 max-w-xl opacity-100">
            We fuse mechanical precision with electrical intelligence to deliver
            resilient, efficient and future-ready systems — backed by an
            engineering culture that values safety, schedules and measurable
            impact.
          </p>

          <div className="why-stats mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-8 gap-4">
            <div className="stat flex items-start opacity-100">
              <Star className="w-7 h-7 text-amber-600 mr-3" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">{projects}</span>
                <div className="text-sm text-gray-500">Projects delivered</div>
              </div>
            </div>

            <div className="stat flex items-start opacity-100">
              <Globe className="w-7 h-7 text-indigo-600 mr-3" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">{clients}</span>
                <div className="text-sm text-gray-500">International partners</div>
              </div>
            </div>

            <div className="stat flex items-start opacity-100">
              <HardHat className="w-7 h-7 text-green-600 mr-3" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">{safety}</span>
                <div className="text-sm text-gray-500">Recordable safety incidents</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="why-cards grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((c) => (
            <article
              key={c.id}
              className="card group bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 will-change-transform opacity-100"
              aria-labelledby={`${c.id}-title`}
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white shadow-sm">
                  <c.Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-xs font-semibold uppercase text-gray-400">
                  {c.id === "safety" ? "Trusted" : "Specialist"}
                </div>
              </div>

              <h3 id={`${c.id}-title`} className="mt-4 text-lg font-semibold text-gray-900">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{c.description}</p>

              {c.bullets && (
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  {c.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12l4 4L19 6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4">
                <a
                  href="https://wa.me/2348023444635?text=Hello%20Toemech%2C%20I%27d%20like%20to%20get%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                >
                  Contact our team →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
