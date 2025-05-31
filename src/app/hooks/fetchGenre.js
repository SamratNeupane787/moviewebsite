export default function getGenre(){

  const getByGenre = async(genre)=>{
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?genre=${genre.toLowerCase()}&limit=50`
      );
      const data = await response.json() 
      console.log(data)
      return data.data.movies
     
    } catch (error) {
      console.Console('error')
    }
  }

  return{
    getByGenre
  }
}