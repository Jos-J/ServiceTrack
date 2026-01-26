// client/src/components/ modal
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative w-full max-w-lg rounded bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{title ?? "Modal"}</h3>
          <button className="px-2 py-1 rounded hover:bg-gray-100" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
