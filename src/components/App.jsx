import { lazy, useEffect, useState, Suspense } from "react";
import { fetchMoviesWithSearch, fetchMoviesPopular } from "../api";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));
const Navigation = lazy(() => import("./Navigation/Navigation"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [moviesWithSearch, setMoviesWithSearch] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = (values, actions) => {
    const searchQuery = values.text.trim();
    if (searchQuery) {
      setQuery(searchQuery);
      navigate(`/movies?query=${searchQuery}`);
    }
    actions.resetForm();
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetchMoviesWithSearch(query);
        setMoviesWithSearch(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [query]);

  const backLink = location.state?.from ?? "/";
  console.log(backLink);

  const handleClickBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />

          <Route
            path="/movies"
            element={
              <MoviesPage
                query={query}
                movies={moviesWithSearch}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage handleClickBack={handleClickBack} />}
          >
            <Route path="casts" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
