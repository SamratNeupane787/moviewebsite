"use client"
import ListMovie from '@/app/components/ListMovie'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import getGenre from "@/app/hooks/fetchGenre";
import { ClipLoader } from 'react-spinners';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import SearchBar from '@/app/components/SearchBar';

function page() {
   const params= useParams()
    const {genre} = params
    const { getByGenre } = getGenre();
    const [genreMov, setGenreMov] = useState([])
    const [loading ,setLoading] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(()=>{
      const callgenreApi = async () => {
        try {
          setLoading(true);
          const response = await getByGenre(genre);
          setGenreMov(response);
        } catch (error) {
          setLoading(true);
          alert("Error fetching Movies");
        } finally {
          setLoading(false);
        }
      };
      callgenreApi()
    },[])

    const handleChangePage = (selectedPage) => {
      if (selectedPage >= 1 && selectedPage <= genreMov.length / 10)
        setPage(selectedPage);
    };
 
    if (loading) {
      return (
        <div className=" flex flex-row items-center justify-center">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      );
    }  
    return (
      <div className="m-4">
        <SearchBar/>
        <h2 className=" text-3xl font-semibold text-center py-5 ">
          Movies in <span className=' text-green-500'>{genre}</span>
        </h2>
        <div className="grid place-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  xl:grid-cols-5 gap-6 ">
          {genreMov.slice(page * 10 - 10, page * 10).map((item, index) => (
            <ListMovie
              key={item.id}
              id={item.id}
              image={item.medium_cover_image}
              title={item.title}
              rating={item.rating}
              year={item.year}
            />
          ))}
        </div>

        <div className=" flex flex-row items-center justify-center gap-3 py-4">
          <span
            className=" bg-slate-500 p-4 rounded-md hover: cursor-pointer"
            onClick={() => handleChangePage(page - 1)}
          >
            <FaAngleLeft />
          </span>
          {[...Array(genreMov.length / 10)].map((_, index) => (
            <span
              className={
                page === index + 1
                  ? "bg-slate-800  p-4 rounded-md"
                  : "bg-slate-500 p-4 rounded-md hover: cursor-pointer"
              }
              onClick={() => handleChangePage(index + 1)}
              key={index}
            >
              {index + 1}
            </span>
          ))}
          <span className=" bg-slate-500 p-4 rounded-md hover: cursor-pointer">
            <FaAngleRight onClick={() => handleChangePage(page + 1)} />
          </span>
        </div>
      </div>
    );
}

export default page
