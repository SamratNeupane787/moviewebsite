"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [result, setResult] = useState([]);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const route = useRouter()
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  const notify = (text) =>
    toast(text, {
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
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery && !selectedGenre) {
      setResult([]);
      return;
    }

    const callSearch = async () => {
      try {
        const res = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${debouncedQuery}&limit=6`);
        const data = await res.json();
        setResult(data?.data?.movies || []);
      } catch (error) {
        notify("Error fetching movies");
        setResult([]);
      }
    };

    callSearch();
  }, [debouncedQuery, selectedGenre]);

  const toggleGenreDropdown = () => {
    setGenreDropdownOpen(!genreDropdownOpen);
  };

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
    route.push(`/Genre/${genre}`)
    setGenreDropdownOpen(false);
    setQuery(""); 
    
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 mx-8  gap-3">
      <div className="bg-black w-[16rem] h-12 rounded-full relative flex items-center justify-between gap-3 px-4 sm:w-[16rem] md:w-[32rem]">
        <CiSearch className="text-white text-xl " />
        <input
          placeholder="Search by Title"
          className="flex w-[16rem] bg-transparent outline-none text-white placeholder:text-gray-400 order-first sm:w-[16rem] md:w-[32rem]"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedGenre(null);
          }}
        />
      </div>

      <div className="relative flex flex-row gap-3">
        <button
          onClick={toggleGenreDropdown}
          className="bg-amber-600 w-auto px-4 h-[2rem] mt-3 rounded-md sm:w-full md:w-auto"
        >
          {selectedGenre ? selectedGenre : "Genre"}
        </button>
        {genreDropdownOpen && (
          <ul className="absolute top-full mt-2 bg-amber-950 rounded-md w-40 max-h-60 overflow-y-auto shadow-lg z-20">
            {genres.map((item, index) => (
              
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-amber-700"
                  onClick={() => selectGenre(item)}
                  target="_blank"
                >
                 {item}
                </li>
              
            ))}
          </ul>
        )}
      </div>

      {result.length === 0 && (debouncedQuery || selectedGenre) && (
        <p className="text-white text-sm mt-4">No results found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 rounded-md p-4 w-full max-w-6xl">
        {result.map((item, index) => (
          <div
            className="bg-[#121212] rounded-md m-2 p-6 flex flex-col items-center justify-between w-auto h-[16rem]"
            key={item.id || index}
          >
            <Link href={`/Details/${item.id}`}>
              <Image
                src={item.large_cover_image}
                height={100}
                width={100}
                alt={item.title}
              />
            </Link>
            <div className="flex flex-row gap-3 items-center justify-between mt-2 w-full">
              <p className="text-center text-white text-sm flex-grow">
                {item.title || "No title"}
              </p>
              <p className="flex flex-row gap-1 items-center text-yellow-400 font-semibold">
                <FaStar size={18} />
                {item.rating}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default SearchBar;
