import { logOut } from "@/Utils/token_management";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <h1
        className="text-4xl font-extrabold text-slate-600 tracking-tight font-montserrat"
        onClick={() => router.push("/home")}
      >
        Todos
      </h1>
      <div className="flex gap-2">
      
        <Link
          href={"/signin"}
      
          className="flex items-center px-4 py-2 bg-transparent border border-emerald-500 text-emerald-500 rounded-lg hover:bg-gray-300"
        >
          Sign In
        </Link>
        <Link
          href={"/signup"}
      
          className="flex items-center px-4 py-2 bg-transparent border border-emerald-500 text-emerald-500 rounded-lg hover:bg-gray-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Header;
