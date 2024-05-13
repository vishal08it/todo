import { useIsAuthenticated } from "@/Utils/auth_provider";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { PUBLIC_ROUTES } from "../lib/constants";
import Header from "./components/Header";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    } else {
      if (PUBLIC_ROUTES.includes(router.route)) {
        router.replace(router.route);
      }
    }
  }, [isAuthenticated]);
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center  bg-gradient-to-b from-gray-100 to-blue-200 h-screen">
        <div className="p-8 bg-gradient-to-b from-blue-200 to-gray-100 rounded-lg shadow-lg text-center ">
          <h1 className="text-4xl font-bold text-slate-500 mb-4">
            Welcome to Your Todo App
          </h1>
          <p className="text-lg text-slate-500 mb-8">
            Organize your tasks and get things done!
          </p>
        </div>
      </main>
    </div>
  );
}
