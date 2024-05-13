// import { useAppContext } from "@/utils/contexts/AppContext";
// import axiosService from "@/utils/axios/AxiosService";
import { setAccessToken } from "@/Utils/token_management";
import useAuthRedirect from "@/pages/hooks/useAuthRedirect";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SuccessWidget from "../SuccessWidget";

export default function Login({ onLogin, onClose, onForgotPassword }) {
  useAuthRedirect({ redirectTo: "/home" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/signin", {
        email,
        password,
      });
      console.log("RES", response);
      if (!response.data.token) {
        throw new Error("Failed to sign in");
      }
      //destructing
      const { token, id, username } = response.data;
      setSuccess("Login successfull");
      setAccessToken(token, id, username);
      router.push("/home");
      // handle successful login
    } catch (e) {
      const error = e.response;
      console.log("ERROR", error);
      if (error.data) {
        setError(error.data.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg md:w-1/4 w-[90%]  bg-gradient-to-b from-blue-100 to-gray-100 shadow-lg">
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          className="bg-gray-700 text-slate-600 px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          className="bg-gray-700 text-slate-600 px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="p-2 bg-red-400 text-slate-600 rounded m-3 flex justify-between items-center">
            {" "}
            <p>{error}</p>
            <XMarkIcon
              className="h-5 w-5 text-slate-600"
              onClick={() => setError("")}
            />
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 mt-6 rounded-lg w-full "
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="flex justify-between my-4">
          {/* <Link
            href="/todos"
            className="text-emerald-500 underline"
            onClick={onClose}
          >
            todos
          </Link> */}
          <Link
            href="/signup"
            className="text-emerald-500 underline"
            onClick={onClose}
          >
            sign up
          </Link>
        </div>
        {success && (
          <div className="mt-2">
            {" "}
            <SuccessWidget
              message={success}
              onClickSuccess={() => setSuccess(null)}
            />
          </div>
        )}
      </form>
    </div>
  );
}
