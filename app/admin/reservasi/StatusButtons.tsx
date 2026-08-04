"use client";

import { useTransition } from "react";
import { Check, X } from "lucide-react";
import { updateReservationStatus } from "./actions";

interface Props {
  id: string;
  currentStatus: string;
}

export default function StatusButtons({ id, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  // Sembunyikan tombol jika status sudah dikonfirmasi atau dibatalkan
  if (currentStatus !== "PENDING") {
    return <span className="text-xs text-gray-400 font-medium">Selesai</span>;
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => startTransition(() => updateReservationStatus(id, "CONFIRMED"))}
        disabled={isPending}
        title="Konfirmasi"
        className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
      >
        <Check size={16} />
      </button>
      <button
        onClick={() => startTransition(() => updateReservationStatus(id, "CANCELLED"))}
        disabled={isPending}
        title="Tolak"
        className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
      >
        <X size={16} />
      </button>
    </div>
  );
}