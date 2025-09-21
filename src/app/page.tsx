"use client";

import AboutSection from "@/components/AboutUs";
import ContactPage from "@/components/ContactUs";

import FaqSection from "@/components/FAQs";
import HeroSection from "@/components/Hero";
import Project from "@/components/Projects";
import ServicesSection from "@/components/Services"
import TeamSection from "@/components/Team";
import TestimonialSection from "@/components/Testimonial";
import ToemechWhyUs from "@/components/WhyUs";

export default function Home() {

  //const router = useRouter();
    return(
      <>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ToemechWhyUs />
        <Project />
        <TestimonialSection />
        <TeamSection />
        <ContactPage />
        <FaqSection />
      </>
      
  )
  
}