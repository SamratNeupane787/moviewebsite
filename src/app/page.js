import Image from "next/image";
import MovieList from "./components/MovieList";
import HeroMovie from "./components/HeroMovie";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div>
      <SearchBar />
      <MovieList />
    </div>
  );
}
