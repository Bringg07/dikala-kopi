import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Image dari foto kafe Anda */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/dikala.png" // Ganti dengan path atau URL gambar Anda
          alt="Dikala Kopi S. Parman"
          fill
          className="object-cover scale-105 animate-pulse duration-1000"
          priority
        />
        {/* Lapisan hitam transparan agar teks di depannya sangat kontras & mudah dibaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/60 to-black/70" />
      </div>

      {/* Konten Teks & Tombol */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <span className="px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 backdrop-blur-md">
          The Finest Coffee Experience
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white leading-tight">
          Every Cup Tells <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">A Story</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg font-light max-w-xl mx-auto">
          Nikmati suasana hangat, kopi berkualitas, dan tempat terbaik untuk bersantai di Dikala Kopi S. Parman Semarang.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="#menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-all shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5"
          >
            Jelajahi Menu
          </Link>
          <Link
            href="#reservasi"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-md border border-white/15 transition-all transform hover:-translate-y-0.5"
          >
            Reservasi Meja
          </Link>
        </div>
      </div>
    </section>
  );
}