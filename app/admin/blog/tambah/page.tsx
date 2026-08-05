"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addPost } from "../actions";
import { UploadButton } from "@/lib/uploadthing";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TambahBlogPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    if (imageUrl) formData.append("image", imageUrl);

    try {
      await addPost(formData);
      router.push("/admin/blog");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal menyimpan artikel");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/blog" className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-serif font-bold text-espresso">Tulis Artikel Baru</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel</label>
          <input 
            type="text" 
            name="title" 
            placeholder="Contoh: Mengenal Biji Kopi Arabika Robusta" 
            required 
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select name="category" required className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-gold bg-white">
            <option value="">Pilih Kategori</option>
            <option value="Coffee Knowledge">Coffee Knowledge</option>
            <option value="Brewing Tips">Brewing Tips</option>
            <option value="Event Café">Event Café</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sampul Gambar Artikel</label>
          <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between bg-gray-50">
            <span className="text-sm text-gray-500">
              {imageUrl ? "Gambar berhasil diunggah ✅" : "Unggah foto sampul (Maks 4MB)"}
            </span>
            {!imageUrl && (
              <UploadButton
                endpoint="imageUploader" /* HARUS ADA: sesuaikan dengan nama di core.ts Anda jika berbeda */
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    setImageUrl(res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`Gagal mengunggah gambar: ${error.message}`);
                }}
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Konten Artikel</label>
          <textarea 
            name="content" 
            rows={8} 
            placeholder="Tulis isi artikel lengkap di sini..." 
            required 
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-gold resize-none"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-amber-800 text-white py-3.5 rounded-xl font-medium hover:bg-amber-900 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Menyimpan..." : "Publikasikan Artikel"}
        </button>
      </form>
    </div>
  );
}