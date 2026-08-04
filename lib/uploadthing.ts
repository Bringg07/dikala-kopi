import { createUploadthing, type FileRouter } from "uploadthing/next";
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

const f = createUploadthing();

// 1. Definisikan file router langsung di sini (tidak perlu pusing cari folder api)
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload selesai, URL:", file.url);
      return { uploadedBy: "Admin Dikala" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// 2. Buat komponen Upload-nya langsung dari sini
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();