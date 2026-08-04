import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, whatsapp, email, guests, date, time, notes } = body;

    // Validasi sederhana di sisi server
    if (!name || !whatsapp || !guests || !date || !time) {
      return NextResponse.json(
        { error: "Data wajib belum lengkap" },
        { status: 400 }
      );
    }

    // Simpan ke database menggunakan Prisma
    const reservation = await prisma.reservation.create({
      data: {
        name,
        whatsapp,
        email: email || "tidak-ada@email.com", // Mencegah error database jika email kosong
        guests: parseInt(guests, 10),
        date: new Date(date), // Konversi string ke DateTime
        time,
        notes: notes || "",
      },
    });

    return NextResponse.json(
      { message: "Reservasi berhasil disimpan", reservation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat menyimpan reservasi:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}