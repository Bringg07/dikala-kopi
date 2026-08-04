import Link from "next/link";
import { MapPin, Camera, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-cream/20 pb-12 mb-8">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="font-serif text-2xl mb-4 text-gold">DIKALA KOPI</h2>
          <p className="text-cream/70 text-sm leading-relaxed mb-6">
            Every cup tells a story. Nikmati kopi premium dalam balutan suasana hangat yang tak terlupakan.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-cream/70 hover:text-gold transition-colors"><Camera size={20} /></a>
            <a href="#" className="text-cream/70 hover:text-gold transition-colors"><Phone size={20} /></a>
            <a href="#" className="text-cream/70 hover:text-gold transition-colors"><Mail size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-medium text-lg mb-4 text-white">Eksplorasi</h3>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><Link href="#tentang" className="hover:text-gold transition-colors">Tentang Kami</Link></li>
            <li><Link href="#menu" className="hover:text-gold transition-colors">Signature Menu</Link></li>
            <li><Link href="#reservasi" className="hover:text-gold transition-colors">Reservasi Meja</Link></li>
            <li><Link href="/blog" className="hover:text-gold transition-colors">Blog & Artikel</Link></li>
          </ul>
        </div>

        {/* Jam Operasional */}
        <div>
          <h3 className="font-medium text-lg mb-4 text-white">Jam Buka</h3>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="flex justify-between border-b border-cream/10 pb-2">
              <span>Senin - Jumat</span>
              <span>08:00 - 22:00</span>
            </li>
            <li className="flex justify-between border-b border-cream/10 pb-2">
              <span>Sabtu - Minggu</span>
              <span>07:00 - 23:00</span>
            </li>
          </ul>
        </div>

        {/* Lokasi */}
        <div>
          <h3 className="font-medium text-lg mb-4 text-white">Lokasi</h3>
          <div className="flex items-start space-x-3 text-sm text-cream/70 mb-4">
            <MapPin size={20} className="shrink-0 text-gold" />
            <p>Jl. S. Parman No. 45, Semarang, Jawa Tengah, Indonesia</p>
          </div>
          {/* Tombol Arah */}
          <a href="#" className="inline-block px-5 py-2 border border-gold text-gold rounded-full text-sm hover:bg-gold hover:text-espresso transition-all">
            Buka di Google Maps
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center text-sm text-cream/50">
        <p>&copy; {new Date().getFullYear()} DIKALA KOPI S. Parman. All rights reserved.</p>
      </div>
    </footer>
  );
}