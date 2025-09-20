"use client";

import AboutSection from "@/components/AboutUs";
import HeroSection from "@/components/Hero";
import Project from "@/components/Projects";
import ServicesSection from "@/components/Services"
import TestimonialSection from "@/components/Testimonial";
import ToemechWhyUs from "@/components/WhyUs";

export default function Home() {

  //const router = useRouter();
    return(
      <>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <Project />
        <ToemechWhyUs />
        <TestimonialSection />
      </>
      
  )
  
}