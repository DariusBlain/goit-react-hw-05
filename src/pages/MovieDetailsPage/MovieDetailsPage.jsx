import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMoviesById } from "../../api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const location = useLocation();
  const goBackRef = useRef(location?.state || "/movies");

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  if (!movie) {
    return <h2>Loading ...</h2>;
  }

  const { title, release_date, vote_average, backdrop_path, overview, genres } =
    movie;
  const genreNames = genres.map((genre) => genre.name).join(", ");

  return (
    <div className={s.container}>
      <Link to={goBackRef.current} className={s.backLink}>
        Go back!
      </Link>
      <div className={s.movieDetails}>
        <img
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
              : defaultImg
          }
          alt={title}
          className={s.movieImage}
        />
        <div className={s.movieInfo}>
          <h1 className={s.movieTitle}>
            {title}{" "}
            <span className={s.releaseDate}>
              ({release_date.split("-")[0]})
            </span>
          </h1>
          <p className={s.userScore}>
            User Score: {(vote_average * 10).toFixed(0)}%
          </p>
          <h2>Overview</h2>
          <p className={s.overview}>{overview}</p>
          <h2>Genres</h2>
          <p className={s.genres}>{genreNames}</p>
        </div>
      </div>
      <ul className={s.navList}>
        <li className={s.navItem}>
          <NavLink to="casts" className={s.navLink}>
            Casts
          </NavLink>
        </li>
        <li className={s.navItem}>
          <NavLink to="reviews" className={s.navLink}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
