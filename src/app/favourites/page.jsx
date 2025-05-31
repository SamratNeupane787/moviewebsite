"use client"
import React, { useEffect, useState } from 'react'
import ListMovie from '../components/ListMovie'

function page() {
  const  [fav, setFav] = useState([])

  const loadFavourites = () => {
    try {
      const favMovies = JSON.parse(localStorage.getItem("favourites")) || [];
      setFav(favMovies);
    } catch (error) {
      alert("Error getting favourite movie");
    }
  };

  useEffect(() => {
    loadFavourites();
    const interval = setInterval(() => {
      loadFavourites();
    }, 500); 
    return () => clearInterval(interval);
  }, []);

  console.log(fav)

  if(fav.length == 0){
    return (
      <p className=" text-4xl  text-center">
        No movies added to <span className=' text-green-600'>Favourites</span>
      </p>
    );
  }
  
  return (
    <>
      <h2 className=" text-3xl font-semibold text-center py-5 ">
        Your <span className=" text-green-500">Favourites</span>
      </h2>
      <div className="  grid grid-cols-1 place-items-center sm:grid-cols-1 md:grid-cols-4">
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
