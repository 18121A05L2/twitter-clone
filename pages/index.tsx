import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed/Feed";
import SideBar from "../components/SideBar/SideBar";
import Widgets from "../components/Widgets/Widgets";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CommentModal from "../components/Feed/DisplayTweets/CommentModal";
import TweetBoxModal from "../components/Feed/TweetBox/TweetBoxModal";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const isUserIdExists = router.query.userId
  // useEffect(() => {
  //     if (!session?.user) {
  //       router.push("/");
  //     } else {
  //       router.push("/auth/signin")
  //     }
  // }
  // ,[])

  return (
    <div className=" max-h-screen overflow-hidden  max-w-6xl mx-auto">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? (
        <main className="grid grid-cols-9 ">
          <SideBar />
          <Feed />
          <Widgets />
          <CommentModal />
          <TweetBoxModal/>
        </main>
      ) : (
        <Link href="/auth/signin">
          <div className="flex items-center justify-center min-h-screen">
            <div className=" text-[2rem] p-2 px-6 cursor-pointer bg-twitter rounded-full ">
              Click To Sign In Page Bruh......
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Home;
