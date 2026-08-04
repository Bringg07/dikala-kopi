"use client";

import { useRef, useState } from "react";
import { addMenu } from "./actions";
import { UploadButton } from "@/lib/uploadthing";

export default function AddMenuForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        if (!imageUrl) {
          alert("Harap unggah gambar terlebih dahulu!");
          return;
        }
        // Tambahkan imageUrl ke dalam formData sebelum dikirim
        formData.append("image", imageUrl);
        await addMenu(formData);
        
        formRef.current?.reset();
        setImageUrl(""); // Reset gambar
      }} 
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="md:col-span-2">
        <h3 className="font-serif text-lg font-bold text-espresso mb-4">Tambah Menu Baru</h3>
      </div>

      <input type="text" name="name" placeholder="Nama Menu" required className="p-3 border border-gray-200 rounded-xl outline-none focus:border-gold" />
      <input type="number" name="price" placeholder="Harga (misal: 35000)" required className="p-3 border border-gray-200 rounded-xl outline-none focus:border-gold" />
      
      <select name="category" required className="p-3 border border-gray-200 rounded-xl outline-none focus:border-gold bg-white">
        <option value="">Pilih Kategori</option>
        <option value="Coffee">Coffee</option>
        <option value="Manual Brew">Manual Brew</option>
        <option value="Non Coffee">Non Coffee</option>
        <option value="Dessert">Dessert</option>
      </select>
      
      {/* Area Upload Gambar */}
      <div className="p-3 border border-gray-200 rounded-xl flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {imageUrl ? "Gambar berhasil diunggah ✅" : "Pilih Foto Menu:"}
        </span>
        {!imageUrl && (
          <UploadButton
            onClientUploadComplete={(res: Array<{ url: string }>) => {
              setImageUrl(res[0].url);
            }}
          />
        )}
      </div>
      
      <textarea name="description" placeholder="Deskripsi Singkat" required className="p-3 border border-gray-200 rounded-xl outline-none focus:border-gold md:col-span-2 resize-none" rows={2}></textarea>
      
      <div className="md:col-span-2 flex items-center justify-between mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isBestSeller" className="w-5 h-5 accent-gold" />
          <span className="text-sm font-medium text-gray-700">Tandai sebagai Best Seller</span>
        </label>
        
        <button type="submit" className="bg-espresso text-white px-6 py-2.5 rounded-xl font-medium hover:bg-espresso/90 transition-colors">
          Simpan Menu
        </button>
      </div>
    </form>
  );
}