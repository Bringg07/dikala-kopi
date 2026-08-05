"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string | null;
  imageUrl: string;
}

interface GallerySectionProps {
  initialGalleries: GalleryItem[];
}

export default function GallerySection({ initialGalleries }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Jika belum ada foto di database, kita bisa sediakan fallback atau tampilkan kosong
  const displayGalleries = initialGalleries.length > 0 ? initialGalleries : [];

  return (
    <section className="py-24 px-4 bg-[#121110]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-white mb-4"
          >
            Gallery Experience
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Intip suasana hangat dan momen berharga yang tercipta di setiap sudut Dikala Kopi.
          </p>
        </div>

        {/* Grid Layout Galeri */}
        {displayGalleries.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl text-gray-500">
            Belum ada foto galeri yang diunggah. Silakan tambah melalui halaman Admin.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {displayGalleries.map((img, index) => {
              // Membuat variasi ukuran card grid ala masonry secara otomatis
              const isLarge = index % 3 === 0;
              const className = isLarge 
                ? "col-span-1 md:col-span-2 row-span-2" 
                : "col-span-1 row-span-1";

              return (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
                  onClick={() => setSelectedImage(img.imageUrl)}
                >
                  <img 
                    src={img.imageUrl} 
                    alt={img.title || "Galeri Dikala Kopi"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium tracking-wide bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm text-sm">
                      {img.title || "Lihat"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Enlarged gallery view"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}