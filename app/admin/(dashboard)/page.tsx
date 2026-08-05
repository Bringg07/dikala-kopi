import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Coffee,
  Calendar,
  Users,
  FileText,
  Image as ImageIcon,
  ArrowUpRight,
  Plus,
} from "lucide-react";

type ReservationRow = {
  id: string;
  name: string;
  whatsapp: string;
  date: Date;
  time: string;
  guests: number;
  status: string;
};

const statCards = [
  {
    label: "Total Menu",
    icon: Coffee,
    iconBg: "bg-cream text-espresso",
    valueKey: "totalMenu" as const,
  },
  {
    label: "Total Reservasi",
    icon: Calendar,
    iconBg: "bg-amber-50 text-amber-600",
    valueKey: "totalReservations" as const,
  },
  {
    label: "Perlu Dikonfirmasi",
    icon: Users,
    iconBg: "bg-yellow-50 text-yellow-600",
    valueKey: "pendingReservations" as const,
  },
  {
    label: "Artikel Blog",
    icon: FileText,
    iconBg: "bg-green-50 text-green-600",
    valueKey: "totalPosts" as const,
  },
  {
    label: "Foto Galeri",
    icon: ImageIcon,
    iconBg: "bg-indigo-50 text-indigo-600",
    valueKey: "totalGallery" as const,
  },
];

const quickActions = [
  { label: "Kelola Menu", href: "/admin/menu", icon: Coffee, desc: "Tambah & edit item menu" },
  { label: "Cek Reservasi", href: "/admin/reservasi", icon: Calendar, desc: "Konfirmasi pemesanan" },
  { label: "Tulis Artikel", href: "/admin/blog", icon: FileText, desc: "Kelola konten blog" },
  { label: "Atur Galeri", href: "/admin/galeri", icon: ImageIcon, desc: "Kelola foto kafe" },
];

export default async function AdminDashboard() {
  let totalMenu = 0;
  let totalReservations = 0;
  let pendingReservations = 0;
  let totalPosts = 0;
  let totalGallery = 0;
  let recentReservations: ReservationRow[] = [];

  try {
    [totalMenu, totalReservations, pendingReservations, totalPosts, totalGallery, recentReservations] =
      await Promise.all([
        prisma.menu.count(),
        prisma.reservation.count(),
        prisma.reservation.count({ where: { status: "PENDING" } }),
        prisma.post.count(),
        prisma.gallery.count(),
        prisma.reservation.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
        }),
      ]);
  } catch (error) {
    console.error("Gagal mengambil data admin:", error);
  }

  const values = {
    totalMenu,
    totalReservations,
    pendingReservations,
    totalPosts,
    totalGallery,
  };

  return (
    <div>
      {/* Header Sambutan */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-espresso">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">
            Selamat datang kembali, Admin. Berikut ringkasan operasional Dikala Kopi.
          </p>
        </div>
        <Link
          href="/admin/reservasi"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-espresso/90 transition-colors self-start sm:self-auto"
        >
          <Plus size={16} /> Cek Reservasi Baru
        </Link>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{card.label}</p>
                <h3 className="text-3xl font-bold text-espresso">{values[card.valueKey]}</h3>
              </div>
              <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Akses Cepat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:border-gold/40 hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 shrink-0 bg-cream text-espresso rounded-xl flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                <Icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
                  {action.label}
                  <ArrowUpRight
                    size={14}
                    className="text-gray-300 group-hover:text-gold transition-colors"
                  />
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{action.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bagian Aktivitas Terbaru */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-xl font-bold text-espresso">Reservasi Masuk Terbaru</h3>
          <Link
            href="/admin/reservasi"
            className="text-sm font-medium text-gold hover:underline flex items-center gap-1"
          >
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
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    Belum ada aktivitas reservasi.
                  </td>
                </tr>
              ) : (
                recentReservations.map((res) => (
                  <tr key={res.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-900">{res.name}</td>
                    <td className="p-4 text-gray-600">{res.whatsapp}</td>
                    <td className="p-4 text-gray-600">
                      {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
                        new Date(res.date)
                      )}{" "}
                      ({res.time})
                    </td>
                    <td className="p-4 text-gray-600">{res.guests} Orang</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          res.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : res.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
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
