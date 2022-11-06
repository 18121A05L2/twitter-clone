import React, { useEffect } from "react";
import { FiTwitter } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { clicked } from "../../../Redux/features/GlobalSlice";
import { useDispatch } from "react-redux";
import axiosAPI from "../../../axios";

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

  async function handleLikes(e) {
    e.stopPropagation();
    const data = {
      userId: userId,
      postId: postId,
    };

    await axiosAPI.post("/likes", JSON.stringify(data)).then((value) => {
      console.log(
        "%c" + value.data,
        "color: green; background: yellow; font-size: 15px"
      );
      dispatch(clicked());
    });
  }

  return (
    <div>
      <FiTwitter
        id="like"
        onClick={(e) => {
          twitterTone.play();
          handleLikes(e);
        }}
        className={
          styles.icon +
          `  ${
            isLiked?.length && "  fill-twitter text-blue-400 "
          } transition-scale duration-500 ease-in hover:fill-twitter hover:text-twitter active:scale-[5] `
        }
      />
    </div>
  );
}

export default Like;
