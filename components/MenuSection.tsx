"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Menu = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isBestSeller: boolean;
  image: string;
};

const categories = ["Semua", "Coffee", "Manual Brew", "Non Coffee", "Dessert"];

export default function MenuSection({ initialMenus }: { initialMenus: Menu[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredMenu = activeCategory === "Semua" 
    ? initialMenus 
    : initialMenus.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-4 bg-[#121110] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Our Selections
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-white font-bold tracking-tight"
          >
            Signature Menu
          </motion.h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-light">
            Kurasi rasa terbaik dari barista kami, disajikan khusus untuk melengkapi hari Anda.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-semibold"
                  : "bg-[#1c1a18] text-gray-300 hover:bg-[#262320] border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredMenu.length === 0 ? (
              <p className="text-center col-span-full text-gray-400 py-12 border border-white/10 rounded-2xl bg-[#181615]">
                Menu belum tersedia untuk kategori ini.
              </p>
            ) : (
              filteredMenu.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#1c1a18] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
                >
                  <div className="relative h-56 overflow-hidden bg-black/40">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {item.isBestSeller && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Best Seller
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-white font-medium mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2 font-light">{item.description}</p>
                    </div>
                    <p className="text-amber-400 font-semibold text-lg">Rp {item.price.toLocaleString("id-ID")}</p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}