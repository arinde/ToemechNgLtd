import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/AuthContext";
import "../globals.css";
import DashboardShell from "@/components/DashboardShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Toemech Nigeria Ltd",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <DashboardShell>{children}</DashboardShell>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </AuthProvider>
  );
}
