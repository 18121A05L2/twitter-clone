import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function ProfileSection({ profile,online }) {
  const { data: session } = useSession();
  const router = useRouter();
  const arr = [
    profile?.userId,
    "@" + session?.user?.name?.split(" ").join("").toLocaleLowerCase(),
  ].sort();
  // console.log("array in profile section : "+arr)

  const conversationId =
    arr[0] +
    "-" +
    arr[1];

  async function conversationCreation() {
    const conversation = await fetch(
      "http://localhost:5000/conversation/creation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId: conversationId }),
      }
    );
  }

  return (
    <Link passHref href={`/user/Messages/${conversationId}`}>
      <div
        onClick={conversationCreation}
        className=" relative  h-[5rem] border-[0.1rem]  rounded-xl flex items-center px-2 gap-2 hover:bg-gray-200 cursor-pointer"
      >
        {online && (
          <span className="h-[1rem] flex w-[1rem] bg-twitter absolute top-0 left-0 rounded-full  ">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          </span>
        )}

        <img
          className="rounded-full w-[3rem] h-[3rem]"
          src={profile?.userImage}
        ></img>
        <div className=" flex flex-col py-6 ">
          <p>{profile?.name}</p>
          <p className="text-gray-500">{profile?.userId}</p>
          <p className="text-gray-500">{profile?.bio}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProfileSection;
