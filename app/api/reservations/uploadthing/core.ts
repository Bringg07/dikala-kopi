import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Tentukan setting untuk upload gambar (maks 4MB)
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload selesai, URL file:", file.url);
      return { uploadedBy: "Admin Dikala" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;