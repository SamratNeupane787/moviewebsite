"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const [navi,setNavi] = useState(false)
  const handleNav = ()=>{
    setNavi(!navi)
  }
  console.log(navi)
  return (
    <>
      <div className="  hidden  items-center justify-between mx-8 py-8 sm:hidden md:flex">
        <Link href="/">
          <h1 className=" font-bold text-4xl ">
            Movies <span className=" text-green-600">Website</span>
          </h1>
        </Link>

        <ul className=" flex flex-row gap-3 items-center justify-between text-green-600">
          <Link href="/favourites">
            <li className="  text-2xl">Favourites</li>
          </Link>
       
        </ul>
      </div>

      <div className="flex items-center justify-between mx-4 py-6 sm:flex md:hidden">
        <div>
          <Link href="/">
            <h1 className=" font-bold text-2xl ">
              Movies <span className=" text-green-600">Website</span>
            </h1>
          </Link>
        </div>
        <div className="z-50">
          {navi ? (
            <div>
              <RxCross2 size={22} onClick={handleNav} className=" z-20" />
            </div>
          ) : (
            <div>
              <RxHamburgerMenu size={22} onClick={handleNav} />
            </div>
          )}
        </div>
      </div>

      {navi && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center z-40 md:hidden">
          <ul className="space-y-6 text-2xl">
            <li onClick={handleNav}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={handleNav}>
              <Link href="/favourites">Favourites</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar
