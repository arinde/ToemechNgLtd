import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "About Us | Toemech Nigeria Ltd - Leading Engineering Contractors",
  description:
    "Learn about Toemech Nigeria Ltd, a Nigerian engineering company committed to delivering reliable electrical, mechanical, civil, industrial, and construction solutions.",
  keywords: [
    "engineering contractors Nigeria",
    "engineering company Lagos",
    "electrical engineering firm Nigeria",
  ],
  openGraph: {
    title: "About Us | Toemech Nigeria Ltd",
    description:
      "Toemech Nigeria Ltd is an innovative Nigerian engineering company providing electrical, mechanical, civil, construction, and automation services.",
    url: "https://www.toemechngltd.com/about",
    images: [
      {
        url: "https://www.toemechngltd.com/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "About Toemech Nigeria Ltd",
      },
    ],
    type: "website",
  },
};


export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </div>
    
  );
}
