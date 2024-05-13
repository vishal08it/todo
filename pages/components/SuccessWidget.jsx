import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const SuccessWidget = ({ message, onClickSuccess }) => {
  return (
    <div className="py-1 px-2 bg-emerald-100 rounded-md flex justify-between items-center">
      <p className="text-base font-normal mb-2 text-green-700">{message}</p>
      <XMarkIcon
        className="h-5 w-5 text-emerald-500 cursor-pointer"
        onClick={onClickSuccess}
      />
    </div>
  );
};

export default SuccessWidget;
