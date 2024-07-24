import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMoviesById } from "../../api";

const MovieDetailsPage = ({ handleClickBack }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        const data = await fetchMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [movieId]);

  if (!movie) {
    return <h2>Loading ...</h2>;
  }

  const { title, release_date, vote_average, backdrop_path, overview, genres } =
    movie;

  const genreNames = genres.map((genre) => genre.name).join(" ");
  return (
    <>
      <button type="button" onClick={handleClickBack}>
        Go back
      </button>
      <div>
        <h1>
          {title} ({release_date.split("-")[0]})
        </h1>
        <img
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
              : defaultImg
          }
          alt={title}
        />
        <p>User Score: {(vote_average * 10).toFixed(0)}%</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h2>Genres</h2>
        <p>{genreNames}</p>
      </div>
      <ul>
        <li>
          <NavLink to="casts">Casts</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
