"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../dashboard/loading";
import { Eye, EyeOff } from "lucide-react"; // 👈 Eye icons

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading === false && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unknown error occurred";
      toast.error("Kindly check your email or password");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('@/Logo.png')` }}
    >
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 m-4 space-y-6 backdrop-blur-xl bg-white/30 rounded-3xl shadow-lg border border-white/50">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Toemech Nigeria Limited
        </h1>
        <p className="text-blue-600 text-center font-serif font-medium">
          Kindly enter your Login details
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md
                         focus:ring-blue-500 focus:border-blue-500 bg-white/50
                         text-gray-900 placeholder-gray-500 transition-colors"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-800">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"} // ✅ toggle type
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md
                           focus:ring-blue-500 focus:border-blue-500 bg-white/50
                           text-gray-900 placeholder-gray-500 transition-colors pr-10"
              />
              {/* Eye Icon Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md
                       hover:bg-blue-700 focus:outline-none focus:ring-2
                       focus:ring-offset-2 focus:ring-blue-500 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
