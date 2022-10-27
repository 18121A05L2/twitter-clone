import React from 'react'
import { useRouter } from "next/router"
import SideBar from '../../../components/SideBar/SideBar'
import Feed from '../../../components/Feed/Feed'
import Widgets from '../../../components/Widgets/Widgets'
import CommentModal from '../../../components/Feed/DisplayTweets/CommentModal'
import TweetBoxModal from '../../../components/Feed/TweetBox/TweetBoxModal'
import SpecificTweetDisplay from "../../../components/SpecificTweetDisplay"




function specificTweet({post}) {
  const router = useRouter()
  // console.log(router.query.userId)
  return (
    <div className=" max-h-screen overflow-hidden  max-w-6xl mx-auto" >
      <main className="grid grid-cols-9 ">
        <SideBar />
        <SpecificTweetDisplay post={post} />
        <Widgets />
        <CommentModal />
        <TweetBoxModal />
      </main>
    </div>
  );
}

export default specificTweet

export async function getServerSideProps(context) {
  const data = {
    _id: context.params?.tweetId,
  };

  console.log("🥶 this is context" + context);

  const post = await fetch("http://localhost:5000/tweet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return {
    props: {
      post: post,
    },
  };
}
