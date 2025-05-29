"use client"
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
function SearchBar() {
  const [ query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery]= useState(query)
  const [result , onResult ] = useState([])
  const [genre, SetGenre] = useState(false)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedQuery(query)
    },300)
    return ()=> clearTimeout(timer)
  },[query, setQuery])


  useEffect(() => {
    if (!debouncedQuery) {
      onResult([])
      return
    };
    const callSearch = async () => {
      try {
        const url = genre ?  `https://yts.mx/api/v2/list_movies.json?genre=${debouncedQuery}&limit=6`
        : `https://yts.mx/api/v2/list_movies.json?query_term=${debouncedQuery}&limit=6`;
        const res = await fetch(url);
        const data = await res.json();
        onResult(data?.data?.movies || []);
        console.log(data);
      } catch (error) {
        alert("Error fetching movies");
        onResult([]);
      }
      };

    callSearch();
  }, [debouncedQuery, setDebouncedQuery]);

  const handleGenre = ()=>{
    SetGenre((prev)=> !prev)
  }
  return (
    <div className="flex flex-col items-center justify-center p-8 mx-8 z-10 gap-3">
      <div className="bg-black w-[16rem] h-12 rounded-full relative flex items-center justify-between gap-3 px-4 sm:w-[16rem] md:w-[32rem]">
        <CiSearch className="text-white text-xl " />
        {genre ? (
          <input
            placeholder="Search by genre"
            className="flex w-[16rem] bg-transparent outline-none text-white placeholder:text-gray-400 order-first sm:w-[16rem] md:w-[32rem]"
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : (
          <input
            placeholder="Search by Title"
            className="flex w-[16rem] bg-transparent outline-none text-white placeholder:text-gray-400 order-first sm:w-[16rem] md:w-[32rem]"
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
      </div>
     
        <button onClick={handleGenre} className=" bg-amber-600 px-4 h-[2rem] rounded-md">
          {genre ? 'Search by Title' : 'Search by Genre'}
        </button>
      
      {result.length === 0 && debouncedQuery && (
        <p className=" text-white text-sm mt-4">No result found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 rounded-md p-4 w-full max-w-6xl">
        {result.map((item, index) => {
          return (
            <div
              className=" bg-[#121212] rounded-md m-2 p-6 flex flex-col items-center justify-between w-auto h-[16rem] "
              key={index}
            >
              <Link href={`/Details/${item.id}`}>
                <Image
                  src={item.large_cover_image}
                  height="100"
                  width="100"
                  alt={item.title}
                />
              </Link>
              <div className=" flex flex-row gap-3 items-center justify-between">
                <p className="text-center text-white text-sm ">
                  {item.title || "No movies found"}
                </p>
                <p className=" flex flex-row gap-3 items-center ">
                  <FaStar size={22} color="#ffcc00" />
                  {item.rating}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar
