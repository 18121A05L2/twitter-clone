import React, { useEffect } from "react";
import { FiTwitter } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { clicked } from "../../../Redux/features/GlobalSlice";
import { useDispatch } from "react-redux";

var twitterTone;

function Like({ styles, post }) {
  useEffect(() => {
    twitterTone = new Audio("/twitter-tone.mp3");
  }, []);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const postId = post?._id;
  const userId = "@" + session?.user?.name?.split(" ")[0].toLowerCase();
  const isLiked = post?.likes?.filter((like) => like.userId === userId);
  console.log(" is liked: " + isLiked);
  // console.log(Boolean(isLiked?.length));

  async function handleLikes(e) {
    e.stopPropagation();
    const data = {
      userId: userId,
      postId: postId,
    };

    await fetch("http://localhost:5000/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((value) => {
      console.log("like or unlike is happened : " + value);
      dispatch(clicked());
    });
  }

  return (
    <div>
      <FiTwitter
        id="like"
        onClick={(e) => {
          console.log("tone playing");
          twitterTone.play();
          handleLikes(e);
        }}
        className={
          styles.icon +
          `  ${
            isLiked?.length && "  text-blue-400 fill-twitter "
          } hover:fill-twitter hover:text-twitter active:scale-[5] transition-scale duration-500 ease-in `
        }
      />
    </div>
  );
}

export default Like;
