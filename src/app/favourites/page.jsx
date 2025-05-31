"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ListMovie from '../components/ListMovie'
import Link from 'next/link'
import { FaDumpster } from 'react-icons/fa'
function page() {
  const  [fav, setFav] = useState([])


  useEffect(()=>{
    try {
      const favmovies =JSON.parse( localStorage.getItem('favourites'))
      setFav(favmovies || [])
    } catch (error) {
     
      alert("Error getting favourite movie")
    }
  },[fav])
  console.log(fav)

  if(fav.length == 0){
    return (
      <p className=" text-4xl h-screen text-center">
        No movies added to <span className=' text-green-600'>Favourites</span>
      </p>
    );
  }
  
  return (
    <>
      <h2 className=" text-3xl font-semibold text-center py-5 ">
        Your <span className=" text-green-500">Favourites</span>
      </h2>
      <div className="  grid grid-cols-1 place-items-center    sm:grid-cols-1 md:grid-cols-4">
        {fav.map((item, index) => (
          <ListMovie
            key={index}
            image={item.image}
            title={item.title}
            rating={item.rating}
            year={item.year}
            id={item.id}
          />
        ))}
      </div>
    </>
  );
}

export default page
