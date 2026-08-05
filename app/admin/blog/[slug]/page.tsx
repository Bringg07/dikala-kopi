import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        
        {/* Tombol Kembali */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={16} /> Kembali ke Blog
          </Link>
        </div>

        {/* Kotak Konten Utama */}
        <div style={{ backgroundColor: "#ffffff", color: "#000000", opacity: 1 }} className="rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Header Artikel */}
          <div className="flex flex-wrap items-center gap-4 text-sm mb-4" style={{ color: "#444444" }}>
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-medium text-xs">
              <Tag size={12} /> {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} /> 
              {new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(post.createdAt))}
            </span>
          </div>

          {/* Judul Artikel */}
          <h1 style={{ color: "#000000" }} className="text-3xl sm:text-4xl font-serif font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Gambar Sampul */}
          {post.image && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-md max-h-[400px]">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Isi Konten Artikel (Dipaksa hitam legam dan tebal) */}
          <div style={{ color: "#111111" }} className="leading-relaxed text-base sm:text-lg space-y-6 whitespace-pre-line font-medium opacity-100">
            {post.content}
          </div>

        </div>

      </article>
    </main>
  );
}