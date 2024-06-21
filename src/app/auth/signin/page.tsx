"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     // window.location.href = "/dashboard";
  //   }
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      setMessage("Login successful!");
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      // window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error) {
      setMessage("Login failed.");
    }
  };
  if(message == "Login failed."){
    router.push("/failed")
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sign In" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                {/* <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                /> */}
                {/* <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                /> */}
              </Link>
              <p className="2xl:px-20">
                <h2>This is the sign in page.</h2>
              </p>
              <span className="mt-15 inline-block">
                <svg
                  width="350"
                  height="350"
                  viewBox="0 0 350 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG Content */}
                </svg>
              </span>
            </div>
          </div>
          <div className="w-full xl:w-1/2 p-12.5 sm:p-20.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white">
              Sign In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white"
              >
                Sign In
              </button>
            </form>
            {message && (
              <div className="mt-4 text-red-500">{message}</div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
