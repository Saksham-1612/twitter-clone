"use client";
import { graphqlClient } from "@/clients/api";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState(() => {
    if (typeof localStorage !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } else {
      return null;
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !path.includes("signup")) router.push("/");
    else {
      if (path === "/signup" || path === "/") router.push("/home");
    }
  }, [user]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const response = await graphqlClient.request(getCurrentUserQuery, {
              token,
            });
            console.log(response);
            setUser(response.getCurrentUser);
          } catch (error) {
            console.error("Error fetching current user:", error);
          }
        }
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
