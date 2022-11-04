import Link from "next/link";
import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Actions from "./Feed/DisplayTweets/Actions";
import { useSession } from "next-auth/react";
import CommentDesign from "./CommentDesign";
import { clicked } from "../Redux/features/GlobalSlice";
import { useRouter } from "next/router";

// type replyState = {
//   _id: string,
//   replyData: string,
//   userImage: string | null | undefined,
//   userId: string | null | undefined,
//   tweetUserId: string,
//   userName: string,
// };

function SpecificTweetDisplay({ post }) {
  const [replyInput, setReplyInput] = useState("");
  const { data: session } = useSession();
  const router = useRouter()
  const dispatch = useDispatch();

  console.log("post from server side props " + post);

  const data = {
    postId: post?._id,
    replyData: replyInput,
    userImage: session?.user?.image,
    userId: session?.user?.name?.split(" ")[0].toLocaleLowerCase(),
    tweetUserId: post?.userId,
    userName: post?.userName,
  };

  async function handleReply() {
    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setReplyInput("");
      dispatch(clicked());
      console.log("reply added successfully");
    });
  }

  return (
    <div className=" col-span-7 lg:col-span-5 border-x-[0.1rem] mr-2  overflow-scroll max-h-screen scrollbar-hide p-2 ">
      <section className="flex items-center gap-6 mb-2">
  
          <a>
          <IoArrowBackSharp
            onClick={() => router.back()}
              title="back"
              className="text-[2.3rem] cursor-pointer hover:bg-gray-300 p-1 rounded-full"
            />
          </a>
        
        <p className="font-bold text-black text-[1.3rem]">Tweet</p>
      </section>

      <div className="flex gap-4 items-center ">
        <Image
          className="rounded-full"
          height={50}
          width={50}
          src={post?.userImage || "https://links.papareact.com/drq"}
        ></Image>
        <div>
          <p className="font-[600]">{post?.userName}</p>
          <p className="text-gray-500">{post?.userId}</p>
        </div>
        <BsThreeDots className="ml-auto text-gray-600" />
      </div>
      <p className="p-3 text-[1.5rem]">{post?.userInput}</p>
      <div className="border-y-2 flex p-2 gap-4 ">
        <p>{post?.comments?.length} Comments</p>
        <p>{post?.likes?.length} Likes</p>
      </div>

      <Actions post={post} />
      <div className="flex items-center gap-4 border-y-2 p-4 ">
        <Image
          className="rounded-full"
          src={session?.user?.image || "https://links.papareact.com/drq"}
          width="45"
          height="45"
        ></Image>
        <input
          value={replyInput}
          onChange={(e) => setReplyInput(e.target.value)}
          className="outline-none"
          type="text"
          placeholder="Tweet Your Reply"
        ></input>
        <p
          className={`text-white font-bold bg-twitter p-2 px-6 rounded-full ml-auto ${
            replyInput || " opacity-50  "
          } `}
          onClick={handleReply}
        >
          Reply
        </p>
      </div>
      {post?.comments?.map((data) => (
        <CommentDesign key={uuidv4()} data={data} />
      ))}
    </div>
  );
}

export default SpecificTweetDisplay;
