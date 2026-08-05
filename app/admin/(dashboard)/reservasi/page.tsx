import { prisma } from "@/lib/prisma";
import StatusButtons from "./StatusButtons";

export default async function ReservasiPage() {
  let reservations: Array<{ id: string; name: string; whatsapp: string; date: Date | string; time: string; guests: number; status: string }> = [];

  try {
    reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil data reservasi:", error);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-espresso">Data Reservasi</h2>
        <p className="text-gray-500 text-sm mt-1">Kelola daftar pelanggan yang memesan meja.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200"><th className="p-4 font-medium rounded-tl-lg">Nama Pelanggan</th><th className="p-4 font-medium">Kontak (WA)</th><th className="p-4 font-medium">Jadwal</th><th className="p-4 font-medium">Tamu</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium rounded-tr-lg">Aksi</th></tr>
          </thead>
          <tbody className="text-sm">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  Belum ada data reservasi masuk.
                </td>
              </tr>
            ) : (
              reservations.map((res) => (
                <tr key={res.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{res.name}</td>
                  <td className="p-4 text-gray-600">{res.whatsapp}</td>
                  <td className="p-4 text-gray-600">
                    {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(res.date))}<br/>
                    <span className="text-xs font-semibold text-espresso">{res.time} WIB</span>
                  </td>
                  <td className="p-4 text-gray-600">{res.guests} Orang</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      res.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                      res.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <StatusButtons id={res.id} currentStatus={res.status} />
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