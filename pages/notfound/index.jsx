// components/NotFoundPage.js
import React from "react";
import Link from "next/link";

const index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Go back to home
      </Link>
    </div>
  );
};

export default index;
