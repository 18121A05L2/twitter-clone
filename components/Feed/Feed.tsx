import { HiOutlineRefresh } from "react-icons/hi";
import DisplayTweets from "./DisplayTweets/DisplayTweets";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TweetBox from "./TweetBox/TweetBox";
import { useSelector } from "react-redux";

type arrType = {
  _id: string;
  createAt: Date;
  userEmail: string;
  userId: string;
  userImage: string;
  userName: string;
  userInput: string;
};

function Feed({allPostsData} : any) {
  const [allPosts, setAllPosts] = useState<arrType[]>([] as arrType[]);
  const tweetAdded = useSelector((state: any) => state.global.tweetAdded);
  const dataChanged = useSelector((state :any) => state.global.dataChanged);  

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch("http://localhost:5000/tweets").then((res) =>
        res.json()
      );
      // console.log(data);
      setAllPosts(data);
    };
    getPosts();
  }, [tweetAdded , dataChanged ]);

  return (
    <div className=" col-span-7 lg:col-span-5 border-x-[0.1rem] mr-2 overflow-scroll max-h-screen scrollbar-hide ">
      <div className="flex justify-between p-2 ">
        <h2>Home</h2>
        <HiOutlineRefresh />
      </div>
      {/* Tweet box  */}
      <TweetBox />
      {allPosts?.map((post : any) => {
        // console.log(post._id)

        return <DisplayTweets key={uuidv4()} post={post}  />;
      })}
    </div>
  );
}

export default Feed;

// need to implement data fetching in the getserver side props

// export async function getStaticProps() {
//     const data = await fetch("http://localhost:5000/tweets").then((res) =>
//       res.json()
//     );
//   console.log("😇 data"+data)
  
  
//   return {
//     props: {
//       allPostsData : data
//     }
//   }
// }
