import React from 'react'
import { IoSearch } from "react-icons/io5";


function Widgets() {
  return (
    <div className=" col-span-2 hidden lg:inline pt-2 ">
      <div className="flex  bg-gray-200 p-2 text-gray-500 rounded-full">
        <IoSearch className="w-[2rem] h-[2rem]   " />
        <input
          className="bg-gray-200 outline-none  "
          type="text"
          placeholder="Search Twitter"
        />
      </div>
    </div>
  );
}

export default Widgets