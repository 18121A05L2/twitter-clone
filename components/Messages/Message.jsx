import React from 'react'


function Message({ msg,scrollRef }) {
    const sessoinId = JSON.parse(window.sessionStorage.getItem("userId"))?.userId;
    const blue = sessoinId === msg.senderId
    // console.log("sessionId : " + sessoinId + " msg.senderid : " + msg.senderId)
    // console.log("blue : " + blue)
    // console.log("msg : " + msg.msg)
  return (
      <div ref={scrollRef} className={`  ${blue ? " bg-twitter ml-auto " : " mr-auto bg-gray-100 "   }  rounded-full px-3 m-1  `}>{ msg.msg}</div>
  )
}

export default Message