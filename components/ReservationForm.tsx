"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  whatsapp: z.string().min(10, "Nomor WA tidak valid"),
  guests: z.string().min(1, "Pilih jumlah orang"),
  date: z.string().min(1, "Pilih tanggal"),
  time: z.string().min(1, "Pilih jam"),
});

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatusMessage("Reservasi berhasil! Kami akan menghubungi Anda segera.");
        form.reset();
      } else {
        setStatusMessage("Gagal melakukan reservasi. Silakan coba lagi.");
      }
    } catch (error) {
      setStatusMessage("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-[#1c1a18] p-8 md:p-10 rounded-3xl shadow-2xl max-w-xl mx-auto border border-white/10">
      <h3 className="font-serif text-2xl md:text-3xl mb-6 text-white text-center">Formulir Reservasi</h3>
      
      {statusMessage && (
        <div className={`p-4 mb-6 rounded-xl text-center text-sm font-medium ${statusMessage.includes("berhasil") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
          {statusMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Nama Lengkap</label>
          <input {...form.register("name")} placeholder="cth. Budi Santoso" className="w-full p-3.5 rounded-xl bg-black/40 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-sm" required />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Nomor WhatsApp</label>
          <input {...form.register("whatsapp")} placeholder="cth. 08123456789" className="w-full p-3.5 rounded-xl bg-black/40 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-sm" required />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Jumlah Tamu</label>
          <input type="number" {...form.register("guests")} placeholder="Jumlah Orang" className="w-full p-3.5 rounded-xl bg-black/40 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-sm" required min="1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Tanggal Reservasi</label>
            {/* Ditambahkan style color-scheme: dark agar ikon kalender browser aktif dan bisa diklik */}
            <input 
              type="date" 
              {...form.register("date")} 
              style={{ colorScheme: "dark" }}
              className="w-full p-3.5 rounded-xl bg-black/40 text-white border border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-sm cursor-pointer" 
              required 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Jam Kedatangan</label>
            {/* Ditambahkan style color-scheme: dark agar pemilih jam browser aktif dan bisa diklik */}
            <input 
              type="time" 
              {...form.register("time")} 
              style={{ colorScheme: "dark" }}
              className="w-full p-3.5 rounded-xl bg-black/40 text-white border border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-sm cursor-pointer" 
              required 
            />
          </div>
        </div>
        
        <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 text-black py-4 rounded-xl font-semibold transition-all shadow-lg shadow-amber-500/10 mt-6 disabled:opacity-70 transform hover:-translate-y-0.5">
          {isSubmitting ? "Memproses..." : "Konfirmasi Reservasi"}
        </button>
      </div>
    </form>
  );
}