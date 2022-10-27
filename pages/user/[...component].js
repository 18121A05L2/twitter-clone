import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import Profile from "../../components/Profile";
import Widgets from "../../components/widgets/widgets";
import TweetBoxModal from "../../components/Feed/TweetBox/TweetBoxModal";
import CommentModal from "../../components/Feed/DisplayTweets/CommentModal";
import Bookmarks from "../../components/Bookmarks";
import Lists from "../../components/Lists";
import Explore from "../../components/Explore";
import Messages from "../../components/Messages";
import Notifications from "../../components/Notifications";
import Search from "../../components/Search";
import Feed from "../../components/Feed/Feed"

import { useRouter } from "next/router";

function All() {
  const switchComponent = (arg) => {
    switch (arg) {
      case "Profile":
        return <Profile />;
      case "Lists":
        return <Lists />;
      case "Bookmarks":
        return <Bookmarks />;
      case "Explore":
        return <Explore />;
      case "Messages":
        return <Messages />;
      case "Notifications":
        return <Notifications />;
      case "Search":
        return <Search />;
      case "Home":
        return <Feed />;
    }
  };
  const router = useRouter();
  const Component = router?.query?.component[0];
  const Dynamic = {
    Profile: "<Profile/>",
  };
  
  console.log(router?.query?.component[0]);
  
  return (
    <div className=" max-h-screen overflow-hidden  max-w-6xl mx-auto">
      <main className="grid grid-cols-9 ">
        <SideBar />
        {switchComponent(Component)}
        <Widgets />
        <CommentModal />
        <TweetBoxModal />
      </main>
    </div>
  );
}

export default All;
