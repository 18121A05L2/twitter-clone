import React from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { commentAdded } from "../../../Redux/features/GlobalSlice";
import { modalStateChainging, tweetContent } from "../../../Redux/features/CommentSlice";
import Like from "./Like";

// type postType = {
//   post: {
//     _id: string;
//     createdAt: Date;
//     userEmail: string;
//     userId: string;
//     userImage: string;
//     userName: string;
//     userInput: string;
    
//   };
// };

const styles = {
  icon: " w-[2.3rem] h-[2.3rem] text-gray-600 cursor-pointer  p-2 ",
};

function Actions({ post }) {
  const dispatch = useDispatch();
  return (
    <div>
      <section className="flex justify-between">
        <div className="flex gap-2 items-center">
          <FaRegComment
            id="comment"
            onClick={(e) => {
              console.log(e.target);
              e.stopPropagation();
              dispatch(modalStateChainging());
              dispatch(tweetContent(post));
              dispatch(commentAdded());
            }}
            className={styles.icon}
          />
          <p>{post?.comments?.length}</p>
        </div>

        <AiOutlineRetweet
          id="retweet"
          className={
            styles.icon +
            " hover:bg-green-200 hover:text-green-700 rounded-full  "
          }
        />
        <div className="flex gap-2 items-center">
          <Like styles={styles} post={post} />
          <p> {post?.likes?.length}   </p>
        </div>

        <IoShareOutline className={styles.icon} />
      </section>
    </div>
  );
}

export default Actions;
