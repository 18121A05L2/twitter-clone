import React, { useState } from 'react'
import { IconType } from 'react-icons';

type Props = {
  Icon: IconType;
  text: string;
  onClick?: () => {} ; 
}

function SideBarItem({ Icon, text ,onClick}: Props) {
  const [active,setActive] = useState(false)
  return (
    <div className='flex '>
      <div
        className={` flex justify-center  p-3 rounded-full group hover:bg-slate-100 transition-all duration-300  text-black cursor-pointer lg:mr-auto  ${
          active && "text-blue-700"
        } `}
        // onClick={() => setActive(!active)}
        onClick={() => onClick?.()}
      >
        <Icon className="h-[1.5rem] w-[1.5rem]" />
        <p className="pl-3 group-hover:text-blue-400  hidden lg:inline  ">{text}</p>
      </div>
    </div>
  );
}

export default SideBarItem