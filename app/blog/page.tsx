import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Calendar, BookOpen } from "lucide-react";

export default async function PublicBlogPage() {
  let posts: Array<{ id: string; title: string; slug: string; category: string; image: string | null; content: string; createdAt: Date }> = [];

  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil data blog publik:", error);
  }

  return (
    <div className="min-h-screen bg-cream text-espresso py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigasi Kembali */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-espresso/70 hover:text-espresso transition-colors">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
        </div>

        {/* Header Blog */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">Dikala Stories</h1>
          <p className="text-espresso/70 font-light">
            Eksplorasi wawasan seputar dunia kopi, tips penyeduhan manual, gaya hidup, dan cerita di balik cangkir Anda.
          </p>
        </div>

        {/* Grid Artikel */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-cream/50">
            <BookOpen className="w-12 h-12 mx-auto text-espresso/40 mb-3" />
            <p className="text-espresso/70">Belum ada artikel yang dipublikasikan saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden border border-cream/60 shadow-sm hover:shadow-soft transition-all duration-300 group flex flex-col"
              >
                {post.image ? (
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-espresso/80 backdrop-blur-md text-cream text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                ) : (
                  <div className="h-52 bg-espresso/10 flex items-center justify-center relative">
                    <span className="text-espresso/50 font-serif">DIKALA KOPI</span>
                    <span className="absolute top-4 left-4 bg-espresso text-cream text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-espresso/50 mb-3">
                      <Calendar size={14} />
                      {new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(post.createdAt))}
                    </div>
                    <h2 className="font-serif text-xl font-medium text-espresso mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-espresso/70 line-clamp-3 font-light">
                      {post.content}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-cream/55 text-sm font-medium text-espresso flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Baca Selengkapnya &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}