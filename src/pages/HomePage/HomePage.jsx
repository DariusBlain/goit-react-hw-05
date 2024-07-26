import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesPopular } from "../../api";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMoviesPopular();
        setMovies(data);
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className={s.container}>
      <h1>Trending today</h1>
      <div className={s.movieList}>
        {error ? (
          <p>{error}</p>
        ) : (
          <MovieList movies={movies} basePath={"movies/"} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
