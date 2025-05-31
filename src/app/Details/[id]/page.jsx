"use client"
import Image from "next/image";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import movieResponse from "@/app/hooks/fetchImage";
import { InfinitySpin } from "react-loader-spinner";
import { CiClock1 } from "react-icons/ci";
import { FaCalendar, FaStar } from "react-icons/fa";
function SinglePage() {
  const params= useParams()
  const {id} = params
  const {getMovieDetails} = movieResponse()
  const [moviedetail,setMoviedetail] = useState([])
  const [loading ,setLoading]= useState(false)
  const [genre, setGenre]= useState([])
  useEffect(()=>{
   try {
    setLoading(true)
     const callMovieApi = async()=>{
       const response = await getMovieDetails(id);
       setMoviedetail(response)
       setGenre(response.genres)
     }
 
     callMovieApi();
   } catch (error) {
    
   }finally{
    setLoading(false)
   }

  },[])
  console.log(moviedetail)
  if(loading){
    return <div className=" flex flex-row items-center  justify-center">
      <InfinitySpin/>
    </div>
  }
  return (
    <div className="  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 px-4 py-10 lg:px-20">
      <div className="flex justify-center ">
        <Image
          src={moviedetail.large_cover_image}
          height={250}
          width={350}
          alt={moviedetail.title_long}
          className=" rounded-md shadow-lg h-fit w-fit "
        />
      </div>
      <div className="md:col-span-2 flex flex-col justify-center ">
        <div className="flex flex-col items-center justify-center  gap-6 sm:items-center md:items-start  ">
          <div className=" flex flex-row items-center gap-3">
            {genre.map((item, index) => (
              <div className=" bg-green-700 px-3 rounded-full" key={index}>
                {item}
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left text-white tracking-wide">
              {moviedetail.title_long}
            </h1>
          </div>
          <div className=" flex flex-row gap-4 items-center">
            <div className=" flex flex-row gap-2 items-center">
              <FaStar color="#eab308" />
              {moviedetail.rating}
            </div>
            <div className=" flex flex-row gap-2 items-center">
              <CiClock1 />
              {moviedetail.runtime}
            </div>
            <div className=" flex flex-row gap-2 items-center">
              <FaCalendar />
              {moviedetail.year}
            </div>
          </div>
          <div>
          {moviedetail.description_intro === ""?"Movie Description Not found" : moviedetail.description_intro}
      </div>
    </div>
    </div>
    </div>
)}
export default SinglePage

