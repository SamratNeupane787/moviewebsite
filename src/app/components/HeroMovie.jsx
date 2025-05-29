"use client"
import React, { useEffect, useState } from 'react'
import movieResponse from "../hooks/fetchImage";
import Image from 'next/image';
function HeroMovie() {
  const { getMovie } = movieResponse();
  const [movies, setMovies] = useState([])
  useEffect(()=>{
    const callMovieApi = async()=>{
      const response = await getMovie()
      console.log(response[0])
      setMovies(response[0])
    }

    callMovieApi()
  },[])  
  return (
    <div className="relative w-screen ">
      <Image
        src={movies.large_cover_image}
        alt="Movie Background"
        fill
        className="object-cover"
      />
    </div>
  );
}

export default HeroMovie
