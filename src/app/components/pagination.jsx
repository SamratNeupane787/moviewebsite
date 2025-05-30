import React, { useEffect, useState } from 'react'

function pagination() {
  const [result , setResult ]= useState([])
  useEffect(()=>{
    const callApi = async()=>{ 
      const response = await fetch("https://yts.mx/api/v2/list_movies.json");
      const data = await response.json()
      setResult(data.data.movies)

    }
    callApi()
  },[])
  return (
    <div>
      
    </div>
  )
}

export default pagination
