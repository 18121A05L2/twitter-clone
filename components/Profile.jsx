import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import DisplayTweets from "./Feed/DisplayTweets";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModal } from "../Redux/features/GlobalSlice";
import { useRouter } from "next/router";
import { AiOutlineLink } from "react-icons/ai";
import Moment from "react-moment";

function Profile() {
  const { data: session } = useSession();
  const [profilePosts, setProfilePosts] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const router = useRouter();
  const profileDataChanged = useSelector((state) => state.global.profileDataChanged)
  // console.log("=====================================")
  const newUserId = router?.query?.component && router?.query?.component[1];
 
  const dataChanged = useSelector((state) => state.global.dataChanged);
  // const userId =
  //   "@" + session?.user?.name?.split(" ").join("").toLocaleLowerCase();
  const userId = newUserId || JSON.parse(window.sessionStorage.getItem("userId"))?.userId
  // console.log(userId);
  // console.log(profileData)
  const dispatch = useDispatch();
  useEffect(() => {
    // ----------------------   profile creation if not exists ------------------------------------
    async function profile() {
      const data = {
        userId: userId,
        userImage: session?.user?.image,
        name: session?.user?.name,
      };
      const response = await fetch("http://localhost:5000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    profile();
    // -------------------------------------------- fetching Profile Data --------------------
    async function fetchProfileData() {
      const profileData = await fetch("http://localhost:5000/profiledata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      }).then(async (res) => await res.json());

      setProfileData(profileData);
    }
    fetchProfileData();
  }, [router.query.component,session,profileDataChanged ]);

  useEffect(() => {
    async function fetchingProfilePosts() {
      const profilePosts = await fetch("http://localhost:5000/profileposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      }).then((res) => res.json());

      setProfilePosts(profilePosts);
    }
    fetchingProfilePosts();
  }, [dataChanged, router.query.component]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        <Link passHref href={"/"}>
          <a>
            <IoArrowBackSharp
              title="back"
              className="text-[2.3rem] cursor-pointer hover:bg-gray-300 p-1 rounded-full"
            />
          </a>
        </Link>

        <section>
          <p>{profileData?.name}</p>
          <p>{profilePosts?.length} Tweets</p>
        </section>
      </div>
      <div className="relative flex flex-col ">
        <img
          className="h-[12rem]"
          height="200"
          width="700"
          src={
            profileData?.backgroundImage ||
            "https://thumbs.dreamstime.com/b/technology-banner-background-old-new-using-computer-circuits-old-machine-cogs-37036025.jpg"
          }
        />
        {/* <Image className="rounded-full border absolute -top-10 " width="100" height="100" src={session?.user?.image}></Image> */}
        <img
          className="rounded-full border-4 border-white absolute top-[8rem] left-[2rem]"
          src={profileData?.userImage}
        ></img>
        {newUserId &&
        JSON.parse(window.sessionStorage.getItem("userId")).useId !==
          newUserId ? (
          ""
        ) : (
          <p
            onClick={() => {
              dispatch(editProfileModal());
            }}
            className=" font-semibold  ml-auto border-[0.1rem] p-2 px-4 rounded-3xl mt-2 mr-4 cursor-pointer "
          >
            Edit profile
          </p>
        )}
      </div>
      <div
        className={` flex flex-col pl-4 gap-2 ${
          newUserId &&
          JSON.parse(window.sessionStorage.getItem("userId")).useId !==
            newUserId &&
          " pt-12  "
        }`}
      >
        <p>{profileData?.name}</p>
        <p>{profileData?.userId}</p>
        <p>{profileData?.bio}</p>

        <div className="flex gap-4   ">
          <div className="flex gap-2 items-center  ">
            <MdOutlineBusinessCenter />
            <p>Community</p>
          </div>
          <div className=" flex gap-2 items-center  ">
            <GoCalendar />
            <p>
              Joined
              {/* <Moment fromNow>{profileData.createdAt}</Moment> */}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineLink />
            <a
              href={profileData?.website}
              target="_blank"
              className=" text-twitter "
            >
              website
            </a>
          </div>
        </div>
        <div className="flex gap-4 pb-2 mb-2">
          <div className="flex gap-2">
            <p className="font-bold">0</p>
            <p>Following</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">0</p>
            <p>Followers</p>
          </div>
        </div>
      </div>
      {profilePosts?.map((post) => (
        <DisplayTweets key={post?._id} post={post} />
      ))}
    </div>
  );
}

export default Profile;
