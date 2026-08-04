import { prisma } from "@/lib/prisma";
import { deletePost } from "./actions";
import { Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminBlogPage() {
  let posts: Array<{ id: string; title: string; slug: string; category: string; image: string | null; createdAt: Date }> = [];

  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil data blog:", error);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-espresso">Kelola Artikel Blog</h2>
          <p className="text-gray-500 text-sm mt-1">Tulis artikel untuk meningkatkan SEO dan edukasi pelanggan.</p>
        </div>
        <Link 
          href="/admin/blog/tambah" 
          className="bg-espresso text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-espresso/90 transition-colors flex items-center gap-2"
        >
          <PlusCircle size={18} /> Tulis Artikel Baru
        </Link>
      </div>

      {/* Tabel Daftar Artikel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <th className="p-4 font-medium rounded-tl-lg">Artikel</th>
              <th className="p-4 font-medium">Kategori</th>
              <th className="p-4 font-medium">Tanggal Dibuat</th>
              <th className="p-4 font-medium rounded-tr-lg">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">Belum ada artikel yang ditulis.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    {post.image && (
                      <img src={post.image} alt={post.title} className="w-12 h-12 rounded-lg object-cover" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{post.title}</p>
                      <p className="text-xs text-gray-500">/{post.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2.5 py-1 bg-cream text-espresso rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-xs">
                    {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(post.createdAt))}
                  </td>
                  <td className="p-4">
                    <form action={async () => {
                      "use server";
                      await deletePost(post.id);
                    }}>
                      <button type="submit" className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}