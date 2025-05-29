export default function movieResponse(){
  let loading = false;

  const getMovie =async()=>{
    try {
      loading =true
      const response = await fetch('https://yts.mx/api/v2/list_movies.json') 
      const data = await response.json()
      console.log(data.data.movies)
      return data.data.movies
      
    } catch (error) {
      loading = true
      console.log("Error Fetching Movies")
    }finally{
      loading= false
    }
  }
  

  return{
    getMovie,
    loading
  }

}