import Image from "next/image";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div>
      <SearchBar />
      <MovieList />
    </div>
  );
}
