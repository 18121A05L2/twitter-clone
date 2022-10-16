import React, { useState, useRef } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiOutlineFileGif } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { RiEmotionHappyLine } from "react-icons/ri";
import { VscCalendar } from "react-icons/vsc";
import { FiMapPin } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { db } from "../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const styles = {
  icon: "h-[2rem] w-[1.2rem] hover:scale-150 transition-all cursor-pointer",
};

function TweetBox() {
  const [input, setInput] = useState<string>("");
  const filePickerRef = useRef(null);
  const { data: session } = useSession();
  console.count(input);

  async function handlePost() {
    const data = {
      userName: session?.user?.name,
      userImage: session?.user?.image,
      userEmail: session?.user?.email,
      // userUniqueId: session?.user?.userid,
      userId:
        "@" + session?.user?.name?.split(" ").join("").toLocaleLowerCase(),
      timeStamp: serverTimestamp(),
      userInput: input,
    };
    await addDoc(collection(db, "posts"), data);

    setInput("");
  }
  return (
    <div className="flex p-2">
      <img
        className="h-[2.5rem] w-[2.5rem] m-2 rounded-full"
        src={session?.user?.image || "https://links.papareact.com/gll"}
      ></img>
      <div className=" flex flex-col flex-1  ">
        <input
          className="p-3 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder={`what's happening ` + session?.user?.name + " ?"}
        ></input>
        <div className="flex justify-between">
          {/* Icons */}
          <section className="flex items-center text-twitter gap-3  ">
            {/* uploading images  */}
            <HiOutlinePhotograph
              className={styles.icon}
              onClick={() => {
                filePickerRef?.current?.click();
                console.log("clicked photo icon");
              }}
            >
              <input ref={filePickerRef} hidden type="file"></input>
            </HiOutlinePhotograph>

            <AiOutlineFileGif className={styles.icon} />
            <BiPoll className={styles.icon} />
            <RiEmotionHappyLine className={styles.icon} />
            <VscCalendar className={styles.icon} />
            <FiMapPin className={styles.icon} />
          </section>
          <section className="flex items-center">
            {input && <p>{256 - input?.length}</p>}

            <button
              className="bg-twitter font-bold px-3 p-1 m-2 text-white rounded-full disabled:opacity-60"
              disabled={!input}
              onClick={handlePost}
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
