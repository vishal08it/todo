import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function TodoWidget({ todo, onClickUpdate, onClickDelete }) {
  return (
    <div className="bg-gradient-to-b from-blue-950 to-gray-900 rounded-lg shadow-xl p-4">
      <h2 className="text-white text-lg font-semibold">{todo?.Title}</h2>
      <p className="text-gray-300 text-sm">{todo?.Description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-400 text-xs">
          Due Date: {new Date(todo?.Due_Date).toLocaleDateString()}
        </p>
        <div className="flex  gap-2">
          <PencilSquareIcon
            className="text-emerald-500 h-5 w-5 "
            onClick={onClickUpdate}
          />

          <TrashIcon
            className="text-red-500 h-5 w-5 "
            onClick={onClickDelete}
          />
        </div>
      </div>
    </div>
  );
}
