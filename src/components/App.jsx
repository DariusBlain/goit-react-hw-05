import { lazy, useEffect, useState, Suspense } from "react";
import {
  fetchMoviesWithSearch,
  fetchMoviesPopular,
  fetchMoviesById,
} from "../api";
import "./App.css";
import { Routes, Route } from "react-router-dom";
const Navigation = lazy(() => import("./Navigation/Navigation"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetchMoviesPopular();
        setMovies(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchMoviesWithSearch(query);
  //       setMovies(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // }, [query]);

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />

          <Route path="/movies" element={<p>Movies</p>} />
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage movies={movies} />}
          />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
