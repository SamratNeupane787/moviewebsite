"use client"
import React, { useEffect, useState } from 'react'
import movieResponse from '../hooks/fetchImage'
import { ClipLoader } from "react-spinners";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ListMovie from './ListMovie';


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
    <div className=" flex flex-row items-center justify-center">
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
}
  return (
    <div className="m-4">
      <div className="grid place-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  xl:grid-cols-5 gap-6 ">
        {movies.slice(page * 10 - 10, page * 10).map((item, index) => (
          <ListMovie key={item.id} id={item.id} image={item.medium_cover_image} title={item.title} rating={item.rating} year={item.year}/>
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
