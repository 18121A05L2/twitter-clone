import React, { useEffect, useRef, useState, useTransition } from "react";
import { BiSend } from "react-icons/bi";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import { useRouter } from "next/router";
import Message from "./Message";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {settingOnlineUsers} from "../../Redux/features/GlobalSlice"


function Messages() {
  const [input, setInput] = useState("");
  const socket = useRef();
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [receiverProfileData, setReceiverProfileData] = useState({});
  const router = useRouter();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  console.log(allMessages)

  const conversationId = router?.query?.component && router.query?.component[1];
  const routerArr =
    router?.query?.component && router.query?.component[1]?.split("-");
  let receiverId;

  const senderId = JSON.parse(window.sessionStorage.getItem("userId"))?.userId;

  if (router?.query.component && routerArr && senderId !== routerArr[0]) {
    receiverId = routerArr[0];
  } else if (
    router?.query.component &&
    routerArr &&
    senderId !== routerArr[1]
  ) {
    receiverId = routerArr[1];
  }
  // -------------------------------------- socket.io implementation ---------------------

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (msg) => {
      setArrivalMessage({
        conversationId: conversationId,
        receiverId,
        senderId: msg.senderId,
        msg: msg.msg,
      });
      console.log("Arrival message : " + arrivalMessage);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      routerArr &&
      routerArr.includes(arrivalMessage.senderId) &&
      setAllMessages((prev) => [...prev, arrivalMessage]);
    
  
  }, [arrivalMessage]);

  useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[allMessages])


  useEffect(() => {
    socket.current?.emit("addUser", senderId);
    socket.current?.on("getUsers", (users) => {
      users && dispatch(settingOnlineUsers(users))
      
      console.log(users);
    });
  }, [senderId, socket, router?.query?.component]);

  useEffect(() => {
    async function fetchingAllMessages() {
      const data = await fetch("http://localhost:5000/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId: conversationId }),
      }).then(async (res) => await res?.json());
      console.log("conversation Id  : " + conversationId);

     setAllMessages(data);
    }
     conversationId && fetchingAllMessages();

    async function fetchingReceiverProfile() {
      const data = await fetch("http://localhost:5000/profiledata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: receiverId }),
      }).then(async (res) => await res?.json());
      setReceiverProfileData(data);
    }
    router?.query.component && routerArr && fetchingReceiverProfile();
  }, [router?.query?.component]);

  async function handleSend() {
    const data = {
      conversationId: conversationId,
      receiverId,
      senderId,
      msg: input,
    };
    await fetch("http://localhost:5000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const data = await res.json();
      // console.log("res : " + data);
      // setAllMessages(data);
    });
    socket?.current.emit("sendMessage", {
      senderId: senderId,
      receiverId: receiverId,
      msg: input,
    });
    setInput("");
  }

  return (
    <div className="flex">
      {receiverId ? (
        <div className="flex flex-col min-h-screen h-full w-full  bg-red-100">
          <div className="hover:bg-red-300 bg-red-200 flex flex-col items-center ">
            <img
              className="h-[5rem] w-[5rem] rounded-full"
              src={receiverProfileData?.userImage}
            ></img>
            <p>{receiverProfileData?.name}</p>
            <p>{receiverProfileData?.userId}</p>

            <p>{receiverProfileData?.bio}</p>
          </div>
          <div  className="  h-full flex flex-col p-2 py-4 ">
            {allMessages?.map((msg) => {
              return (
                // <div ref={scrollRef} >
                  <Message msg={msg} key={msg._id + msg.msg} scrollRef={scrollRef} />
                // </div>
              );
            })}
          </div>
          <div className="text-twitter sticky bottom-0  mt-auto flex items-center gap-4 bg-gray-100 p-4 py-2 rounded-3xl mx-2 text-[1.5rem]     m-1  ">
            <BsCardImage />
            <AiOutlineFileGif />
            <BsEmojiSmile />
            <input
              className="bg-gray-100 text-[1rem] w-full outline-none  "
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Start a new Message"
            ></input>
            <BiSend  className="ml-auto text-[2.5rem] cursor-pointer hover:-rotate-45 transition-transform " onClick={handleSend} />
          </div>
        </div>
      ) : (
        <div className=" h-screen w-full flex flex-col items-center justify-center text-center ">
          <div className=" flex flex-col items-center justify-center">
            <p className=" bg-twitter p-2 text-[1.5rem] rounded-full px-6 ">
              Start Converstion By Clicking on profile
            </p>
            <p className=" text-slate-500 w-[23rem] mt-3  ">
              Choose from your existing conversations, start a new one, or just
              keep swimming
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
