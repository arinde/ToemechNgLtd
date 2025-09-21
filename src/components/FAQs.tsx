"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What services does Toemach provide?",
    answer:
      "Toemech offers end-to-end electrical and mechanical engineering solutions, including power system design, industrial automation, HVAC and ventilation, plumbing installations, and preventive maintenance.",
  },
  {
    question: "Do you handle custom electrical and mechanical projects?",
    answer:
      "Yes. We design, fabricate, and install custom systems tailored to your requirements — from load calculations to commissioning, ensuring safety, reliability, and performance.",
  },
  {
    question: "How do you ensure adherence to safety and regulations?",
    answer:
      "All our projects follow Nigerian and international engineering standards (IEC, IEEE), undergo risk assessments, testing, and periodic inspections. Our team is trained for compliance at every stage.",
  },
  {
    question: "Can you support renewable energy solutions and efficiency improvements?",
    answer:
      "Definitely. Toemech implements solar PV systems, LED lighting retrofits, energy audits, and smart controls to reduce energy consumption and carbon footprint.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "You can fill out our Contact form, or send us a message via phone or email. We'll schedule a site visit if needed and provide you a detailed estimate with timelines.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optional: animate accordion open/close via GSAP
  useEffect(() => {
    if (!containerRef.current) return;

    faqs.forEach((_, index) => {
      const contentEl = containerRef.current?.querySelector<HTMLDivElement>(`#faq-content-${index}`);
      if (!contentEl) return;

      if (activeIndex === index) {
        // Expand
        gsap.to(contentEl, {
          height: "auto",
          duration: 0.4,
          ease: "power2.out",
          paddingTop: 12,
          paddingBottom: 12,
        });
      } else {
        // Collapse
        gsap.to(contentEl, {
          height: 0,
          duration: 0.4,
          ease: "power2.out",
          paddingTop: 0,
          paddingBottom: 0,
        });
      }
    });
  }, [activeIndex]);

  return (
    <section
      id="faq"
      className="w-full bg-gray-50 text-gray-800 py-16 px-4 md:px-8"
    >
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-serif md:text-4xl font-bold">FAQs</h2>
        <p className="mt-2 text-gray-600">
          Answers to common questions about our services
        </p>
      </div>

      <div ref={containerRef} className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-0 border-gray-300 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center px-4 py-4 bg-white hover:bg-gray-100 transition-colors"
              onClick={() =>
                setActiveIndex((prev) => (prev === idx ? null : idx))
              }
            >
              <span className="md:text-lg text-md text-left font-medium">{faq.question}</span>
              <ChevronDown
                className={`transform transition-transform duration-300 ${
                  activeIndex === idx ? "-rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <div
              id={`faq-content-${idx}`}
              className="px-6 overflow-hidden"
              style={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
            >
              <p className="py-2 text-gray-700 text-sm">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
