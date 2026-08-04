"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Coffee } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Username atau password salah.");
      setIsLoading(false);
    } else {
      router.push("/admin/reservasi"); // Arahkan ke halaman reservasi setelah sukses
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-soft border border-cream/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-espresso rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Coffee className="text-gold w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl text-espresso font-semibold">Admin Area</h1>
          <p className="text-sm text-espresso/60 mt-1">Masuk untuk mengelola Dikala Kopi</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-espresso/80 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl bg-cream/30 border border-cream focus:ring-2 ring-gold outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-espresso/80 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-cream/30 border border-cream focus:ring-2 ring-gold outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-espresso text-white py-4 rounded-xl font-medium hover:bg-espresso/90 transition-all disabled:opacity-70 mt-2"
          >
            {isLoading ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}