"use client";
import { graphqlClient } from "@/clients/api";
import { useUser } from "@/context/UserContext";
import { getCurrentUserQuery, loginUserQuery } from "@/graphql/query/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const response = await graphqlClient.request(loginUserQuery, {
      email,
      password,
    });
    console.log(response);

    if (response.loginUser?.token) {
      const token = response.loginUser?.token;
      localStorage.setItem("token", response?.loginUser.token);
      const userResponse = await graphqlClient.request(getCurrentUserQuery);
      console.log(userResponse);
      setUser(userResponse.getCurrentUser);
      toast.success("Logged in Success 🎉");
      router.push("/home");
    } else {
      toast.error("Logged failed 🍥");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            title=""
            className="font-semibold transition-all duration-200 hover:underline"
          >
            Create a free account
          </Link>
        </p>
        <form onSubmit={handleLogin} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-400"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-400"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-white/80"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
