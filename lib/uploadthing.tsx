"use client";

import { useState, useEffect } from "react";

export const UploadButton = ({
  onClientUploadComplete,
}: {
  onClientUploadComplete?: (res: Array<{ url: string }>) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mencegah perbedaan render server vs client pada pemuatan awal
  if (!isMounted) {
    return (
      <div className="inline-flex rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-400">
        Memuat...
      </div>
    );
  }

  const inputId = "custom-upload-input-file";

  return (
    <label
      htmlFor={inputId}
      className="inline-flex cursor-pointer rounded-lg border border-[#3c2a21]/20 bg-white px-3 py-2 text-sm font-medium text-[#3c2a21] transition hover:bg-[#fdfbf7]"
    >
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            onClientUploadComplete?.([{ url: reader.result as string }]);
          };
          reader.readAsDataURL(file);
        }}
      />
      Pilih Gambar
    </label>
  );
};

export const UploadDropzone = UploadButton;
export const Uploader = UploadButton;