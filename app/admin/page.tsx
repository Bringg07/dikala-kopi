import { prisma } from "@/lib/prisma";
import { Coffee, Calendar, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  let totalMenu = 0;
  let totalReservations = 0;
  let pendingReservations = 0;
  let recentReservations: Array<{ id: string; name: string; whatsapp: string; date: Date; time: string; guests: number; status: string }> = [];

  try {
    [totalMenu, totalReservations, pendingReservations, recentReservations] = await Promise.all([
      prisma.menu.count(),
      prisma.reservation.count(),
      prisma.reservation.count({ where: { status: "PENDING" } }),
      prisma.reservation.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);
  } catch (error) {
    console.error("Gagal mengambil data admin:", error);
  }

  return (
    <div>
      {/* Header Sambutan */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-espresso">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Selamat datang kembali, Admin. Berikut ringkasan operasional Dikala Kopi.</p>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Total Reservasi */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Reservasi</p>
            <h3 className="text-3xl font-bold text-espresso">{totalReservations}</h3>
          </div>
          <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-espresso">
            <Calendar size={24} />
          </div>
        </div>

        {/* Card 2: Reservasi Pending */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Perlu Dikonfirmasi</p>
            <h3 className="text-3xl font-bold text-yellow-600">{pendingReservations}</h3>
          </div>
          <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
            <Users size={24} />
          </div>
        </div>

        {/* Card 3: Total Menu */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Katalog Menu</p>
            <h3 className="text-3xl font-bold text-espresso">{totalMenu}</h3>
          </div>
          <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-espresso">
            <Coffee size={24} />
          </div>
        </div>

      </div>

      {/* Bagian Aktivitas Terbaru */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-xl font-bold text-espresso">Reservasi Masuk Terbaru</h3>
          <Link href="/admin/reservasi" className="text-sm font-medium text-gold hover:underline flex items-center gap-1">
            Lihat Semua <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-medium rounded-tl-lg">Nama</th>
                <th className="p-4 font-medium">WhatsApp</th>
                <th className="p-4 font-medium">Jadwal</th>
                <th className="p-4 font-medium">Tamu</th>
                <th className="p-4 font-medium rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentReservations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">Belum ada aktivitas reservasi.</td>
                </tr>
              ) : (
                recentReservations.map((res) => (
                  <tr key={res.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-900">{res.name}</td>
                    <td className="p-4 text-gray-600">{res.whatsapp}</td>
                    <td className="p-4 text-gray-600">
                      {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(res.date))} ({res.time})
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}