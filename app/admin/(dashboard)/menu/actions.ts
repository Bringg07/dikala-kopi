"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fungsi Tambah Menu
export async function addMenu(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string, 10);
    const category = formData.get("category") as string;
    const image = formData.get("image") as string;
    const isBestSeller = formData.get("isBestSeller") === "on";

    await prisma.menu.create({
      data: { name, description, price, category, image, isBestSeller },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/"); // Refresh halaman utama juga
  } catch (error) {
    console.error("Gagal menambah menu:", error);
    throw new Error("Gagal menambah menu");
  }
}

// Fungsi Hapus Menu
export async function deleteMenu(id: string) {
  try {
    await prisma.menu.delete({
      where: { id },
    });
    
    revalidatePath("/admin/menu");
    revalidatePath("/"); // Refresh halaman utama
  } catch (error) {
    console.error("Gagal menghapus menu:", error);
    throw new Error("Gagal menghapus menu");
  }
}