"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ListMovie from '../components/ListMovie'
import Link from 'next/link'

function page() {
  const  [fav, setFav] = useState([])


  useEffect(()=>{
    try {
      const favmovies =JSON.parse( localStorage.getItem('favourites'))
      setFav(favmovies || [])
    } catch (error) {
     
      alert("Error getting favourite movie")
    }
  },[])
  console.log(fav)

  if(fav.length == 0){
    return(<p>No movies added to Favourites</p>)
  }
  
  return (
    <div className=" pt-8 grid grid-cols-1 place-items-center  gap-3  sm:grid-cols-1 md:grid-cols-4">
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
  );
}

export default page
