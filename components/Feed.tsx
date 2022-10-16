import { HiOutlineRefresh } from "react-icons/hi";
import DisplayTweets from "./DisplayTweets";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { v4 as uuidv4 } from "uuid";

import TweetBox from "./TweetBox";

type arrType = {
  timeStamp: Timestamp;
  userEmail: string;
  userId: string;
  userImage: string;
  userName: string;
  userInput: string;
};

function Feed() {
  const [allPosts, setAllPosts] = useState<arrType[]>([] as arrType[]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timeStamp", "desc")),
      (snapshot) => {
        const arr: arrType[] = [];
        snapshot.forEach((doc) => {
          arr.push(doc.data() as arrType);
          console.log(arr);
        });
        setAllPosts(arr);
      }
    );

    return unsubscribe;
  }, [db]);

  return (
    <div className=" col-span-7 lg:col-span-5 border-x-[0.1rem] mr-2 overflow-scroll max-h-screen scrollbar-hide ">
      <div className="flex justify-between p-2 ">
        <h2>Home</h2>
        <HiOutlineRefresh />
      </div>

      {/* Tweet box  */}

      <TweetBox />
      {allPosts?.map((post) => {
        console.log("post: " + post);
        return <DisplayTweets key={uuidv4()} post={post} />;
      })}
    </div>
  );
}

export default Feed;

// need to implement data fetching in the getserver side props
