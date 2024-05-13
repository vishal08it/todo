import { ME } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import HomeHeader from "../components/HomeHeader";

export default function index() {
  const [id, setId] = useState("");
  const [user, setUser] = useState({});

  const { loading, error, data, refetch } = useQuery(ME, {
    variables: {
      id: id,
    },
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "network-only",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      setId(id);
      if (data && data.Userss_by_pk) {
        setUser(data.Userss_by_pk);
      }
    }
  }, [data]);
  return (
    <div className="min-h-screen">
      <HomeHeader />
      <main className="flex flex-col items-center justify-center  bg-gradient-to-b from-gray-100 to-blue-100 h-screen">
        <div className="p-8 bg-gradient-to-b from-blue-100 to-gray-100 rounded-lg shadow-lg text-center ">
          <h1 className="text-4xl font-bold text-slate-600 mb-4">
            Name: {user?.Name}
          </h1>
          <p className="text-lg text-slate-600 mb-8">Email: {user?.Email}</p>
        </div>
      </main>
    </div>
  );
}
