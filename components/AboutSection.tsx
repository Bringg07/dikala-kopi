"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="tentang" className="py-24 px-4 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Bagian Teks & Storytelling */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-espresso mb-6">
              Lebih Dari Sekadar <br/> Secangkir Kopi
            </h2>
            <p className="text-espresso/80 leading-relaxed mb-6 font-light">
              DIKALA KOPI S. PARMAN lahir dari sebuah filosofi sederhana: setiap waktu yang dihabiskan untuk menyesap kopi adalah momen yang berharga. Kami merancang tempat ini bukan hanya sebagai kedai kopi, melainkan ruang ketiga Anda antara rumah dan tempat kerja.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-espresso mb-1">Kualitas Premium</h3>
                <p className="text-sm text-espresso/70">Biji kopi pilihan yang di-*roasting* dengan standar tertinggi untuk menghasilkan profil rasa yang konsisten.</p>
              </div>
              <div>
                <h3 className="font-medium text-espresso mb-1">Suasana Hangat</h3>
                <p className="text-sm text-espresso/70">Desain interior yang memadukan elemen kayu dan cahaya natural, menciptakan harmoni yang menenangkan.</p>
              </div>
            </div>
          </motion.div>

          {/* Bagian Gambar / Timeline Singkat */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-soft"
          >
            <img 
              src="/kala.png" 
              alt="Suasana Cafe" 
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}