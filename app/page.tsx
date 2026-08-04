import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";

export default async function Home() {
  let menus: Array<{ id: string; name: string; description: string; price: number; category: string; image: string; isBestSeller: boolean }> = [];

  try {
    menus = await prisma.menu.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil data menu publik:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": "DIKALA KOPI S. Parman",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. S. Parman No. 45",
      "addressLocality": "Semarang",
      "addressRegion": "Jawa Tengah",
      "postalCode": "50232",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.9932,
      "longitude": 110.4203
    },
    "url": "https://dikalakopi.com",
    "telephone": "+6281234567890",
  };

  return (
    <main className="min-h-screen bg-[#121110] text-gray-100 selection:bg-amber-500 selection:text-black antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <AboutSection />
      
      <MenuSection initialMenus={menus} />
      
      <GallerySection />

      {/* Bagian Reservasi Meja */}
      <section id="reservasi" className="py-24 px-4 bg-[#181615] relative border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Online Booking
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold tracking-tight">
              Pesan Meja Anda
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto font-light">
              Pastikan Anda mendapatkan tempat terbaik. Silakan isi form di bawah ini untuk melakukan reservasi di Dikala Kopi.
            </p>
          </div>
          
          {/* Form langsung dipanggil di sini tanpa kontainer putih bertumpuk */}
          <ReservationForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}