import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;

  let post: { id: string; title: string; slug: string; category: string; image: string | null; content: string; createdAt: Date } | null = null;

  try {
    post = await prisma.post.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Gagal mengambil detail blog:", error);
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-cream text-espresso py-16 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Tombol Kembali */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-espresso/70 hover:text-espresso transition-colors">
            <ArrowLeft size={16} /> Kembali ke Daftar Blog
          </Link>
        </div>

        {/* Header Artikel */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-espresso/60 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-cream/80 text-espresso font-medium text-xs">
              <Tag size={12} className="text-gold" /> {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} /> {new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(post.createdAt))}
            </span>
          </div>
          
          <h1 className="font-serif text-3xl md:text-5xl font-medium text-espresso leading-tight mb-6">
            {post.title}
          </h1>
        </div>

        {/* Gambar Sampul Utama */}
        {post.image && (
          <div className="mb-10 rounded-3xl overflow-hidden shadow-soft h-[350px] md:h-[450px]">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Konten Artikel */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-cream/50 space-y-6">
          <div className="text-espresso/80 leading-relaxed font-light text-lg whitespace-pre-line space-y-4">
            {post.content}
          </div>
        </div>

      </div>
    </article>
  );
}