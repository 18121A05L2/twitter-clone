import React from "react";
import Moment from "react-moment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import { IoShareOutline } from "react-icons/io5";



type post = {
  timeStamp: Date;
  userEmail: string;
  userId: string;
  userImage: string;
  userName: string;
};
const styles = {
  icon : "w-[1.3rem] h-[1.3rem] text-gray-600"
}
function DisplayTweets({ post }) {
  // console.log("post" + post.document)

  return (
    <div className="flex border-t-[0.1rem] p-2">
      <img
        className="w-[3rem] h-[3rem] rounded-full m-1 "
        src={post?.userImage}
      ></img>
      <div className="w-full px-2 ">
        {/* Top  */}
        <section className="flex  items-center ">
          <p>
            {post.userId} . <Moment fromNow>{post?.timeStamp?.toDate()}</Moment>{" "}
          </p>
          <BiDotsHorizontalRounded className="ml-auto w-[1.2rem] h-[1.2rem]" />
        </section>
        <section className="p-4">{post?.userInput}</section>
        {/* icons */}
        <section className="flex justify-between">
          <FaRegComment className={styles.icon} />
          <AiOutlineRetweet className={styles.icon} />
          <FiTwitter className={styles.icon} />
          <IoShareOutline className={styles.icon} />
        </section>
      </div>
    </div>
  );
}

export default DisplayTweets;
