import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-slate-500">
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="z-50 bg-gray-200 p-4 rounded-lg shadow-lg w-[26rem]">
        <div className="flex justify-between">
          {title && <h2 className="uppercase font-medium">{title}</h2>}
          <XMarkIcon className="h-6 w-6 text-emerald-500" onClick={onClose} />
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
