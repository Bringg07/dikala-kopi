"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPhoto(formData: FormData) {
  const title = formData.get("title") as string;
  const imageUrl = formData.get("image") as string;

  if (!imageUrl) {
    throw new Error("Gambar wajib diunggah!");
  }

  try {
    await prisma.gallery.create({
      data: {
        title: title || "Galeri Kafe",
        imageUrl,
      },
    });
    revalidatePath("/admin/galeri");
  } catch (error) {
    console.error("Gagal menyimpan foto:", error);
    throw new Error("Gagal menyimpan foto ke database");
  }
}

export async function deletePhoto(id: string) {
  try {
    await prisma.gallery.delete({
      where: { id },
    });
    revalidatePath("/admin/galeri");
  } catch (error) {
    console.error("Gagal menghapus foto:", error);
    throw new Error("Gagal menghapus foto");
  }
}