"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, Coffee, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username atau password salah.");
        setIsLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#121110] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-50 text-amber-700 rounded-2xl mb-3 shadow-sm">
            <Coffee size={28} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Admin Area</h1>
          <p className="text-gray-500 text-sm mt-1">Masuk untuk mengelola Dikala Kopi</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center font-medium animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-amber-600 text-sm text-gray-800 bg-gray-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-amber-600 text-sm text-gray-800 bg-gray-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-600 text-white py-3.5 rounded-xl font-medium hover:bg-amber-700 transition-all duration-200 disabled:opacity-50 text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
          >
            {isLoading ? (
              "Memeriksa..."
            ) : (
              <>
                Masuk Dashboard <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}