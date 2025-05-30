export default function movieResponse(){

  const getMovie =async()=>{
    try {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json?limit=50') 
      const data = await response.json()
      console.log(data)
      return data.data.movies
      
    } catch (error) {
      console.log("Error Fetching Movies")
    }
  }
  
  const getMovieDetails = async(id)=>{
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`
      );
      const data = await response.json()
      console.log(data)
      return data.data.movie
      
    } catch (error) {
      
    }
  }
  return{
    getMovie,
    getMovieDetails
  }

}