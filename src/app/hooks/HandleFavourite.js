import { useEffect, useState } from "react";

export default function addToFavourite(){
  const [favourties, setFavourites] =useState([])

  useEffect(()=>{
    const stored = localStorage.getItem('favorites')
    if(stored){
      setFavourites(JSON.parse(stored))
    }
  },[])


}