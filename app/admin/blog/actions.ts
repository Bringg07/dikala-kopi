"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fungsi untuk membuat slug otomatis dari judul (misal: "Tips Seduh Kopi" -> "tips-seduh-kopi")
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export async function addPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as string;
    const slug = slugify(title) + "-" + Date.now(); // Menambahkan timestamp agar unik

    await prisma.post.create({
      data: { title, slug, content, category, image },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog"); // Refresh halaman publik blog
  } catch (error) {
    console.error("Gagal menambah artikel:", error);
    throw new Error("Gagal menambah artikel");
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });
    
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
  } catch (error) {
    console.error("Gagal menghapus artikel:", error);
    throw new Error("Gagal menghapus artikel");
  }
}