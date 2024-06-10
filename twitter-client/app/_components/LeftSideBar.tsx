"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsSave } from "react-icons/bs";

interface TwitterSidebarButton {
  title: string;
  icons: React.ReactNode;
}

function LeftSideBar() {
  const { user, setUser } = useUser();
  console.log(user);

  const sideBarMenuItems = [
    {
      title: "Home",
      icon: <BiHomeCircle />,
      location: "/",
    },
    {
      title: "Explore",
      icon: <BiHash />,
      location: "/",
    },
    {
      title: "Notifications",
      icon: <BsBell />,
      location: "/",
    },
    {
      title: "Messages",
      icon: <BsEnvelope />,
      location: "/",
    },
    {
      title: "Bookmarks",
      icon: <BsBookmark />,
      location: "/",
    },
    {
      title: "Profile",
      icon: <BiUser />,
      location: `/profile/${user?._id}`,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <div className="mt-4 text-xl font-semibold px-4 mr-4">
      {/* <h2>{user.firstName}</h2> */}
      <ul>
        {sideBarMenuItems.map((item) => (
          <Link
            href={item.location}
            key={item.title}
            className="flex justify-start items-center gap-4 w-fit hover:bg-white/10 rounded-full  px-5 py-4 "
          >
            <span>{item.icon}</span> <span>{item.title}</span>
          </Link>
        ))}
      </ul>
      <button className="bg-blue-500 p-3 my-2  rounded-full w-full">
        Post
      </button>
      <div className="w-full text-center my-4 ">
        {user && (
          <button
            onClick={handleLogout}
            className="bg-gray-500 p-3 my-2  rounded-full w-full"
          >
            Logout
          </button>
        )}
        {!user && (
          <Link href="/" className="w-full">
            <button className="bg-gray-500 p-3 my-2 rounded-full w-full ">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default LeftSideBar;
