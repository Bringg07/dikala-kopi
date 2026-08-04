"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateReservationStatus(id: string, newStatus: string) {
  try {
    await prisma.reservation.update({
      where: { id },
      data: { status: newStatus },
    });
    
    // Refresh halaman secara otomatis agar data terbaru langsung tampil
    revalidatePath("/admin/reservasi");
  } catch (error) {
    console.error("Gagal mengubah status:", error);
    throw new Error("Gagal mengubah status reservasi");
  }
}