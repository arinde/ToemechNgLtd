// components/DashboardShell.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  // client-side state lives here
  const [activeTab, setActiveTab] = useState<"employees" | "projects" | "clients">("employees");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      // optionally show a toast here (you already have react-hot-toast)
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar expects activeTab, setActiveTab, onLogout */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Main content area (offset for sidebar) */}
      <main className="flex-1 p-6 lg:ml-64">{children}</main>
    </div>
  );
}
