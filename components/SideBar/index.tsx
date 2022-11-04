import React from "react";
import { IoNotificationsOutline, IoSearch } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { BsBookmark, BsCardList } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { CgMoreO } from "react-icons/cg";
import SideBarItem from "./SideBarItem";
import Link from "next/link";
import { tweetBoxModal } from "../../Redux/features/GlobalSlice";


import { signIn, signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

function SideBar() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  return (
    <div className="col-span-2 h-screen flex flex-col pt-2  ">
      <div className="flex flex-col gap-1 max-w-[12rem] items-center  lg:items-start ">
        <Link passHref href="/">
          <img
            className="h-[3rem] w-[3rem] hover:bg-blue-200 rounded-full p-[0.3rem] ml-4"
            src="https://links.papareact.com/drq"
            alt="twitter"
          ></img>
        </Link>

        <SideBarItem Icon={AiOutlineHome} text="Home" />
        <SideBarItem Icon={IoSearch} text="Search" />
        <SideBarItem Icon={BiHash} text="Explore" />
        <SideBarItem Icon={IoNotificationsOutline} text="Notifications" />
        <SideBarItem Icon={FiMail} text="Messages" />
        <SideBarItem Icon={BsBookmark} text="Bookmarks" />
        <SideBarItem Icon={BsCardList} text="Lists" />
        <SideBarItem Icon={HiOutlineUser} text="Profile" />
        <SideBarItem Icon={CgMoreO} text="More" />
        <div
          onClick={() => dispatch(tweetBoxModal())}
          className="bg-twitter flex-1 lg:min-w-[15rem] cursor-pointer p-3 flex justify-center items-center text-white font-bold rounded-full "
        >
          Tweet
        </div>
      </div>
      <div className="mt-auto mb-3 p-2 flex justify-around items-center hover:bg-gray-300 rounded-full">
        <img
          className="h-[2.5rem] w-[2.5rem] rounded-full"
          src={session?.user?.image || "https://links.papareact.com/gll"}
        ></img>
        <p>@{session?.user?.name?.split(" ")[0].toLowerCase()}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          className="bg-twitter bg-opacity-60 p-1 px-2 rounded-full"
        >
          SignOut
        </button>
      </div>
    </div>
  );
}

export default SideBar;
