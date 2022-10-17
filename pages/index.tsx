import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // useEffect(() => {
  //     if (!session?.user) {
  //       router.push("/auth/signin");
  //     } 
  // }
  // ,[])

  return (
    <div className=" max-h-screen overflow-hidden  max-w-5xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? (
        <main className="grid grid-cols-9 ">
          <SideBar />
          <Feed />
          <Widgets />
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
