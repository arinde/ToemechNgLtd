import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthContext";
import { Toaster } from "react-hot-toast";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toemech Nigeria Ltd | Engineering & Industrial Solutions in Nigeria",
  description:
    "Toemech Nigeria Ltd is a trusted engineering company in Nigeria delivering innovative Electrical, Mechanical engineering, construction, industrial automation, and CCTV installation services for businesses and governments.",
  icons: {
  icon: "/Logo.png",
  shortcut: "/Logo.png",
  apple: "/Logo.png",
  },
  keywords: [
    "engineering company in Nigeria",
    "Electrica; engineering company in Nigeria",
    "Electrical engineering services",
    "Mechanical engineering services",
    "industrial automation Nigeria",
    "construction solutions Nigeria",
    "CCTV installation Nigeria",
    "engineering contractors Lagos",
    "engineering contractors Ogun",
    "engineering sales Nigeria"
  ],
  openGraph: {
    title: "Toemech Nigeria Ltd | Engineering & Industrial Solutions",
    description:
      "Leading engineering company in Nigeria. We provide industrial Electrical and Mechanical engineering solutions, construction, automation, and CCTV solutions.",
    url: "https://www.toemechngltd.com",
    siteName: "Toemech Nigeria Ltd",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Toemech Nigeria Ltd",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toemech Nigeria Ltd | Engineering & Industrial Solutions",
    description:
      "Trusted engineering company in Nigeria delivering civil engineering, construction, and CCTV solutions.",
    images: ["/Logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
