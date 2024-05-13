import { useIsAuthenticated } from "@/Utils/auth_provider";
import { useRouter } from "next/router";
import React from "react";
import Login from "../components/auth/Login";

export default function index() {

  return (
    <div className="flex justify-center items-center  min-h-screen bg-gradient-to-b from-gray-100 to-blue-100">
      <Login />
    </div>
  );
}
