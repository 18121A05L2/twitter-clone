import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className=" max-h-screen overflow-hidden  max-w-5xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session?.user && (
        <main className="grid grid-cols-9      ">
          <SideBar />
          <Feed />
          <Widgets />
        </main>
      )}

      {!session?.user && (
        <Link href="/auth/signin">
          <div className="flex items-center justify-center min-h-screen text-[2rem] ">
            Sign In Bruh......
          </div>
        </Link>
      )}
    </div>
  );
};

export default Home;
