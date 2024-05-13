import { logOut } from "@/Utils/token_management";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Navbar = ({ onAdd }) => {
  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-4xl font-extrabold text-slate-600 tracking-tight font-montserrat">
        Todos
      </h1>
      <div className="flex gap-2">
        <Link
          href={"/home"}
          className="flex items-center px-4 py-2 bg-transparent border border-emerald-500 text-emerald-500 rounded-lg hover:bg-gray-300"
        >
          Dashboard
        </Link>
        <button
          onClick={onAdd}
          className="flex items-center px-4 py-2 bg-transparent border border-emerald-500 text-emerald-500 rounded-lg hover:bg-gray-300"
        >
          <PlusCircleIcon className="h-6 w-6 mr-2 text-emerald-500" />
          Add Todo
        </button>
        <Link
          href={"/signin"}
          onClick={() => logOut()}
          className="flex items-center px-4 py-2 bg-transparent border border-emerald-500 text-emerald-500 rounded-lg hover:bg-gray-300"
        >
          logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
