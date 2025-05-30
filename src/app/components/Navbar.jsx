import Link from 'next/link';
import React from 'react'

function Navbar() {
 
  return (
    <div className=" flex items-center justify-center py-8">
      <Link href="/" >
        <h1 className=" font-bold text-4xl ">
          Movies <span className=" text-green-600">Website</span>
        </h1>
      </Link>
    </div>
  );
}

export default Navbar
