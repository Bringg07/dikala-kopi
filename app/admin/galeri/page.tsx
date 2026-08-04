import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function AdminGaleriPage() {
  let photos: Array<{ id: string; title: string | null; imageUrl: string }> = [];

  try {
    // Pastikan Anda sudah membuat tabel Gallery di Prisma schema, 
    // atau sesuaikan dengan model database Anda nantinya
    photos = await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil data galeri:", error);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-espresso">Kelola Galeri Foto</h2>
          <p className="text-gray-500 text-sm mt-1">Tambah atau hapus foto galeri kafe.</p>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500">Belum ada foto di galeri.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-gray-50">
              <div className="relative h-48 w-full">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title || "Galeri Dikala Kopi"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {photo.title || "Tanpa Judul"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}