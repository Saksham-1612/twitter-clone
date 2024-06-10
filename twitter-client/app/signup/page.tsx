"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { graphqlClient } from "@/clients/api";
import { signUpMutation } from "@/graphql/query/user";
import toast, { Toaster } from "react-hot-toast";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", { firstName, lastName, email, password });

    const response = await graphqlClient.request(signUpMutation, {
      firstName,
      email,
      password,
      lastName,
    });
    console.log(response);

    if (response.signUp.id) {
      toast.success(response.signUp.status);
      router.push("/");
    } else {
      toast.error(response.signUp.status);
    }

    setFirstName("");
    setEmail("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-18 ">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-200">
          Already have an account?{" "}
          <Link
            href="/"
            title=""
            className="font-medium  transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        <form action="#" method="POST" className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="firstName"
                className="text-base font-medium text-gray-400"
              >
                {" "}
                First Name{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-base font-medium text-gray-400"
              >
                {" "}
                Last Name{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-400"
              >
                {" "}
                Email address{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-400"
                >
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <button
                onClick={handleSignUp}
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-white/80"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
