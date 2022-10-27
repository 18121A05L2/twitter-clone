import React, { useState, useRef } from "react";
import Icons from "../Icons";
import { useDispatch } from "react-redux";
import { tweetAdded } from "../../../Redux/features/GlobalSlice";
import { tweetBoxModal } from "../../../Redux/features/GlobalSlice";

import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Link from "next/link";

//  var tweetAudio = new Audio("/whistle_tweet.mp3");

function TweetBox() {
  const [input, setInput] = useState<string>("");
  // const filePickerRef = useRef(null);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const tweetBoxModalState = useSelector(
    (state: any) => state.global.tweetBoxModalState
  );

 

  // input ?  (tweetAudio.paused &&   tweetAudio.play() ) :  tweetAudio.pause()

  function addDataToMongo() {
    const data = {
      userName: session?.user?.name,
      userImage: session?.user?.image,
      userEmail: session?.user?.email,
      userId:
        "@" + session?.user?.name?.split(" ").join("").toLocaleLowerCase(),
      timeStamp: new Date(),
      userInput: input,
    };

    fetch("http://localhost:5000/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setInput("");
      dispatch(tweetAdded());
      tweetBoxModalState && dispatch(tweetBoxModal());
      // tweetAudio.play();
      console.log("tweet added to the mongoDB");
    });
  }

  return (
    <div className="flex p-2 ">
      <Link passHref href={"/user/profile"}>
        
        <img
          className="h-[2.5rem] w-[2.5rem] m-2 rounded-full"
          src={session?.user?.image || "https://links.papareact.com/gll"}
        ></img>
      </Link>

      <div className=" flex flex-col flex-1   ">
        <textarea
          className="p-3 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          cols={50}
          rows={tweetBoxModalState ? 7 : 3}
          placeholder={
            `what's happening ` + session?.user?.name?.split(" ")[0] + " ?"
          }
        ></textarea>
        <div
          className={`flex justify-between mt-auto ${
            tweetBoxModalState && " border-t-2 "
          }`}
        >
          {/* Icons */}
          <Icons />
          <section className="flex items-center">
            {input && (
              <p className={` ${input.length > 256 && " text-red-500 "}   `}>
                {256 - input?.length}
              </p>
            )}

            <button
              className="bg-twitter font-bold px-3 p-1 m-2 text-white rounded-full disabled:opacity-60"
              disabled={!input || input.length > 256}
              onClick={addDataToMongo}
            >
              Tweet
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
