"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addPhoto } from "../actions";
import { UploadButton } from "@/lib/uploadthing";
import { ImagePlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TambahGaleriPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageUrl) {
      alert("Harap unggah foto galeri terlebih dahulu!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("image", imageUrl);

    try {
      await addPhoto(formData);
      router.push("/admin/galeri");
      router.refresh();
    } catch (error) {
      alert("Gagal menyimpan foto ke database.");
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Tombol Kembali */}
      <div className="mb-6">
        <Link 
          href="/admin/galeri" 
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm"
        >
          <ArrowLeft size={16} /> Kembali ke Kelola Galeri
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold text-espresso">Tambah Foto Galeri Baru</h2>
          <p className="text-gray-500 text-sm mt-1">Unggah dokumentasi foto kegiatan atau suasana kafe Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Keterangan Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keterangan / Judul Foto (Opsional)
            </label>
            <input 
              type="text" 
              name="title" 
              placeholder="Cth: Suasana Malam di Dikala Kopi" 
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-slate-900 text-sm"
            />
          </div>

          {/* Upload Foto via UploadThing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Foto
            </label>
            <div className="p-4 border border-gray-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50">
              <span className="text-sm text-gray-500 truncate max-w-xs">
                {imageUrl ? "Foto berhasil diunggah! ✅" : "Pilih file foto (Maks 4MB)"}
              </span>
              
              {!imageUrl ? (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      setImageUrl(res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Gagal upload: ${error.message}`);
                  }}
                />
              ) : (
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                  Ready to Save
                </span>
              )}
            </div>

            {/* Preview Gambar */}
            {imageUrl && (
              <div className="mt-4 relative h-48 w-full rounded-xl overflow-hidden border border-gray-200">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit" 
            disabled={isLoading || !imageUrl}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            <ImagePlus size={18} /> {isLoading ? "Menyimpan ke Database..." : "Simpan Foto Galeri"}
          </button>
        </form>
      </div>
    </div>
  );
}