import React from 'react'
import Link from 'next/link';

function ViewProfile({ profile, clearInput }) {
    function handleClick() {
        clearInput();
    }
    
    return (
      <Link   passHref href={`/user/Profile/${profile?.userId}`}>
        <div onClick={handleClick} className="h-[5rem] border-[0.1rem]  rounded-xl flex items-center px-2 gap-2 hover:bg-gray-200 cursor-pointer">
          <img
            className="rounded-full w-[3rem] h-[3rem]"
            src={profile?.userImage}
          ></img>
          <div className=" flex flex-col py-6 ">
            <p>{profile?.name}</p>
            <p className="text-gray-500">{profile?.userId}</p>
            <p className="text-gray-500">{profile?.bio}</p>
          </div>
        </div>
      </Link>
    );
}

export default ViewProfile