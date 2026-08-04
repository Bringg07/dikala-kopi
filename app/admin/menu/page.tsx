import { prisma } from "@/lib/prisma";
import AddMenuForm from "./AddMenuForm";
import { deleteMenu } from "./actions";
import { Trash2 } from "lucide-react";

export default async function MenuPage() {
  let menus: Array<{ id: string; name: string; description: string; price: number; category: string; image: string; isBestSeller: boolean }> = [];

  try {
    menus = await prisma.menu.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil data menu:", error);
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-espresso">Kelola Menu</h2>
        <p className="text-gray-500 text-sm mt-1">Tambah, lihat, atau hapus menu kafe Anda di sini.</p>
      </div>

      {/* Form Tambah Menu */}
      <AddMenuForm />

      {/* Tabel Daftar Menu */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <th className="p-4 font-medium rounded-tl-lg">Menu</th>
              <th className="p-4 font-medium">Kategori</th>
              <th className="p-4 font-medium">Harga</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium rounded-tr-lg">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {menus.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">Belum ada menu terdaftar.</td>
              </tr>
            ) : (
              menus.map((menu) => (
                <tr key={menu.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={menu.image} alt={menu.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-gray-900">{menu.name}</p>
                      <p className="text-xs text-gray-500 max-w-xs truncate">{menu.description}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{menu.category}</td>
                  <td className="p-4 text-gray-900 font-medium">
                    Rp {menu.price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-4">
                    {menu.isBestSeller && (
                      <span className="px-2 py-1 bg-gold/10 text-gold rounded-full text-xs font-semibold">Best Seller</span>
                    )}
                  </td>
                  <td className="p-4">
                    <form action={async () => {
                      "use server";
                      await deleteMenu(menu.id);
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