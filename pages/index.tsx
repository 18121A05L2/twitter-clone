import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CommentModal from "../components/Feed/DisplayTweets/CommentModal";
import TweetBoxModal from "../components/Feed/TweetBox/TweetBoxModal";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(" status : " + status);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      console.count("user is not loggged in");
    } else if (status === "authenticated") {
      console.log(" user is logged in");
    }
    const user = {
      userId: "@" + session?.user?.name?.split(" ").join("").toLocaleLowerCase(),
    };
    window.sessionStorage.setItem("userId",JSON.stringify(user) )
  }, [session, status]);

  return (
    <div className=" max-h-screen overflow-hidden  max-w-6xl mx-auto">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && (
        <main className="grid grid-cols-9 ">
          <SideBar />
          <Feed />
          <Widgets />
          <CommentModal />
          <TweetBoxModal />
        </main>
      )}
    </div>
  );
};

export default Home;
