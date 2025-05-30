"use client"
import React, { useEffect, useState } from 'react'
import movieResponse from '../hooks/fetchImage'
import { FaProductHunt, FaStar } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { InfinitySpin } from 'react-loader-spinner';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function MovieList() {
  const { getMovie } = movieResponse();
  const [movies, setMovies] = useState([])
  const [loading ,setLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const callMovieApi = async () => {

      try {
        setLoading(true)
        const response = await getMovie();
        console.log(response);
        setMovies(response);
      } catch (error) {
        setLoading(true);
        alert('Error fetching Movies')
      }
      finally{
        setLoading(false)
      }
    };

    callMovieApi();
  }, [])
  
  const handlePagePage = (selectedPage) => {
    if(selectedPage >=1 && selectedPage<= movies.length/10)
    setPage(selectedPage)
  };
  
 if(loading){
  return (
    <div className=' flex flex-row items-center justify-center'>
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        className=" spinner"
      />
    </div>
  );
}
  return (
    <div className="m-4">
      <div className="grid place-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 ">
        {movies.slice(page * 10 - 10, page * 10).map((item, index) => (
          <div
            key={index}
            className="bg-[#222223]   rounded-md hover:bg-[#414142] duration-100 transition"
          >
            <div className="flex flex-col w-[10rem] sm:w-[11rem] md:w-[12rem] h-[26rem] items-center gap-3 p-4">
              <Link href={`/Details/${item.id}`}>
                <Image
                  src={item.medium_cover_image}
                  height={300}
                  width={200}
                  alt={item.title}
                  className="rounded-md"
                />
              </Link>
              <div className=" flex flex-row gap-3 items-center justify-between">
                <p className="text-center text-white text-sm ">{item.title}</p>
                <p className=" flex flex-row gap-3 items-center ">
                  <FaStar size={22} color="#ffcc00" />
                  {item.rating}
                </p>
              </div>
              <p className=" flex flex-row gap-3 items-center ">{item.year}</p>
            </div>
          </div>
        ))}
      </div>

      <div className=" flex flex-row items-center justify-center gap-3 py-4">
        <span
          className=" bg-slate-500 p-4 rounded-md hover: cursor-pointer"
          onClick={() => handlePagePage(page - 1)}
        >
          <FaAngleLeft />
        </span>
        {[...Array(movies.length / 10)].map((_, index) => (
          <span
            className={
              page === index + 1
                ? "bg-slate-800  p-4 rounded-md"
                : "bg-slate-500 p-4 rounded-md hover: cursor-pointer"
            }
            onClick={() => handlePagePage(index + 1)}
            key={index}
          >
            {index + 1}
          </span>
        ))}
        <span className=" bg-slate-500 p-4 rounded-md hover: cursor-pointer">
          <FaAngleRight onClick={() => handlePagePage(page + 1)} />
        </span>
      </div>
    </div>
  );
}

export default MovieList
