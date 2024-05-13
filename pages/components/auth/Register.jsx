// import axiosService from "@/utils/axios/AxiosService";
// import { getPublicIpAddress } from "@/utils/axios/get_user_ip";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SuccessWidget from "../SuccessWidget";
import Link from "next/link";
import axios from "axios";
import { setAccessToken } from "@/Utils/token_management";
import useAuthRedirect from "@/pages/hooks/useAuthRedirect";
import { useRouter } from "next/router";

const RegisterUser = async (userData, onError, setLoading) => {
  try {
    setLoading(true);
    const ip = await getPublicIpAddress();
    userData.ip_address = ip;
    const response = await axiosService.post("/user/signUp", userData);

    return response;
  } catch (error) {
    if (error.response) {
      onError(error.response.data.message);
    } else {
      onError("An error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};
const requestOTP = async (data, onOTPError, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosService.post("/user/send-otp", {
      number: data,
    });

    return response?.data;
  } catch (error) {
    if (error.response) {
      onOTPError(error.response.data.message);
    } else {
      onOTPError("An error occurred. Please try again.");
    }
  }
};
export default function Register({ onClose }) {
  useAuthRedirect({ redirectTo: "/home" });
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const router = useRouter();

  const [success, setSuccess] = useState("");

  //success

  const onSuccess = (str) => {
    setSuccess(str);
    setTimeout(() => {
      setSuccess("");
      onClose(); // Clear the error state after 3000 milliseconds (3 seconds)
    }, 3000);
  };

  //handle OTP errors
  const onError = (str) => {
    setError(str);
    setTimeout(() => {
      setError(""); // Clear the error state after 3000 milliseconds (3 seconds)
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        onError("Passwords do not match");
      }
      const response = await axios.post("/api/signup", {
        email,
        password,
        name,
      });
      console.log("RES", response);
      if (!response.data.token) {
        throw new Error("Failed to sign in");
      }

      const { token, id, username } = response.data;
      setSuccess('Registration successfull')
      setAccessToken(token, id, username);
      router.push("/signin");
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
    <div className=" p-4 rounded-lg md:w-1/4 w-[90%]  bg-gradient-to-b from-blue-100 to-gray-100 shadow-lg">
      <form onSubmit={handleSubmit}>
        <input
          className="bg-gray-700 text-white px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-gray-700 text-white px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="bg-gray-700 text-white px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="bg-gray-700 text-white px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />

        {error && (
          <div className="p-2 bg-red-400 text-white rounded m-3 flex justify-between items-center">
            {" "}
            <p>{error}</p>
            <XMarkIcon
              className="h-5 w-5 text-white"
              onClick={() => setError("")}
            />
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 mt-4 rounded-lg"
            type="submit"
          >
            Register
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
            href="/signin"
            className="text-emerald-500 underline"
            onClick={onClose}
          >
            sign in
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
