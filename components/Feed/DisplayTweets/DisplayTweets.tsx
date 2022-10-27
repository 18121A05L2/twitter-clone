import React from "react";
import Moment from "react-moment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Link from "next/link";
import Actions from "./Actions";
import { useDispatch } from "react-redux";
import { tweetContent } from "../../../Redux/features/CommentSlice";


type postType = {
  post: {
    _id: string;
    createdAt: Date;
    userEmail: string;
    userId: string;
    userImage: string;
    userName: string;
    userInput: string;
  };
};

function DisplayTweets({ post }: any) {
  const dispatch = useDispatch();
  

  function handleMainClick(e: any) {
    // const id = e.target.id
    
  }
  return (
    <Link passHref href={`/${post.userId.slice(1)}/status/${post._id}`}>
      <div
        onClick={handleMainClick}
        className="flex border-t-[0.1rem] p-2 hover:bg-gray-100"
      >
        <img
          className="w-[3rem] h-[3rem] rounded-full m-1 "
          src={post?.userImage}
        ></img>
        <div className="w-full px-2 ">
          {/* Top  */}
          <section className="flex  items-center ">
            <p>
              {post?.userId} . <Moment fromNow>{post?.createdAt}</Moment>{" "}
            </p>
            <BiDotsHorizontalRounded className="ml-auto w-[1.2rem] h-[1.2rem]" />
          </section>
          <section className="p-4">{post?.userInput}</section>
          {/* icons */}
          <Actions post={post} />
        </div>
      </div>
    </Link>
  );
}

export default DisplayTweets;
