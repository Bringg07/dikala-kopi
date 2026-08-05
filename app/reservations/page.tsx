import { prisma } from "@/lib/prisma";

export default async function AdminReservasiPage() {
  let reservations: Array<{
    id: string;
    name: string;
    whatsapp: string;
    guests: number;
    date: Date;
    time: string;
    status: string;
  }> = [];

  try {
    reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal memuat data reservasi:", error);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Daftar Reservasi Meja</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola daftar pesanan meja dari pelanggan Dikala Kopi.</p>
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-gray-500">Belum ada reservasi meja yang masuk.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Nama Pemesan</th>
                  <th className="py-4 px-6">WhatsApp</th>
                  <th className="py-4 px-6">Jumlah Tamu</th>
                  <th className="py-4 px-6">Tanggal & Jam</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {reservations.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{item.name}</td>
                    <td className="py-4 px-6 text-gray-600">{item.whatsapp}</td>
                    <td className="py-4 px-6 text-gray-600">{item.guests} Orang</td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })} - <span className="font-semibold text-gray-800">{item.time}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}