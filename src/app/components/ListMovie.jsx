import React, { useEffect, useState } from 'react'
import {  FaDumpster, FaStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Image from 'next/image';
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";


function ListMovie({id,image, title ,rating ,year}) {
  const [added, setAdded] = useState(false)
  const notify = (text) => toast(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    
});

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("favourites")) || [];
    const isAlreadyAdded = existing.some(
      (fav) => fav.title === title && fav.year === year
    );
    if (isAlreadyAdded) {
      setAdded(true);
    }
  }, [title, year]);

  const handleFavourite = () => {
    const existing = JSON.parse(localStorage.getItem("favourites")) || [];
    const isAlreadyAdded = existing.some(
      (fav) => fav.title === title && fav.year === year
    );

    if (!isAlreadyAdded) {
      const updated = [...existing, { id, image, title, rating, year }];
      localStorage.setItem("favourites", JSON.stringify(updated));
      alert("Added to favourite");
      setAdded(true);
     
    } else {
      alert("Already in favorites");

     
    }
  };
  
  const handleRemove = (id)=>{
    const existing  = JSON.parse(localStorage.getItem('favourites'))|| []
    const update =  existing.filter((item)=> item.id !== id)

    localStorage.setItem("favourites", JSON.stringify(update));
    alert("Removed from favourite");
    setAdded(false);
  }



  return (
    <div
      key={year}
      className="bg-[#222223] rounded-md hover:bg-[#414142] duration-100 transition"
    >
      <div className="flex flex-col  w-[14rem] sm:w-[11rem] md:w-[16rem] h-[32rem] items-center justify-center gap-3 p-4">
        <Link href={`/Details/${id}`}>
          <Image
            src={image}
            height={300}
            width={200}
            alt={title}
            className="rounded-md"
          />
        </Link>
        <p className="text-center text-white text-sm ">{title}</p>
        <div className=" flex flex-row gap-3 items-center justify-between">
          <p className=" flex flex-row gap-3 items-center ">
            <FaStar size={22} color="#ffcc00" />
            {rating}
          </p>
          <p className=" flex flex-row gap-3 items-center ">
            <CiCalendar size={22} color="#ffcc00" />
            {year}
          </p>
        </div>

        <div
          className={`${
            added ? "bg-red-800" : "bg-green-600"
          } mt-2 text-center p-2 rounded-md sm:p-1 md:p-3`}
          onClick={() => {
            if(added){
            handleRemove(id)
          }else{
          handleFavourite({ id, image, title, rating, year })}}}
        >
          <button className=" flex flex-row gap-3 items-center justify-center">
            <MdOutlineBookmarkAdd />
            {added ? "Remove from Fav" : "Favourite"}
          </button>
        </div>
      </div>
      {/* <ToastContainer className="z-10" /> */}
    </div>
  );
}

export default ListMovie
