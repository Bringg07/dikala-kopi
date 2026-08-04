"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Coffee, Calendar, FileText, Image as ImageIcon, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Sidebar Navigasi */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="font-serif text-xl text-espresso font-bold">Admin DIKALA</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-cream hover:text-espresso transition-colors">
            <Settings size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/reservasi" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-cream hover:text-espresso transition-colors">
            <Calendar size={20} />
            <span className="font-medium">Reservasi</span>
          </Link>
          <Link href="/admin/menu" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-cream hover:text-espresso transition-colors">
            <Coffee size={20} />
            <span className="font-medium">Kelola Menu</span>
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-cream hover:text-espresso transition-colors">
            <FileText size={20} />
            <span className="font-medium">Artikel Blog</span>
          </Link>
          <Link href="/admin/galeri" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-cream hover:text-espresso transition-colors">
            <ImageIcon size={20} />
            <span className="font-medium">Galeri Foto</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          {/* Perbaikan: Menambahkan onClick={() => signOut()} di sini */}
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 md:hidden">
           {/* Tombol menu mobile bisa ditambahkan di sini nantinya */}
           <h1 className="font-serif text-xl text-espresso font-bold">Admin DIKALA</h1>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}