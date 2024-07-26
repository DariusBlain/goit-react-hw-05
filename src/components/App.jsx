import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));
const Navigation = lazy(() => import("./Navigation/Navigation"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="casts" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
