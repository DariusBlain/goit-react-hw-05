import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesById } from "../../api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetchMoviesById(movieId);
        console.log(data);
        setMovie(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  if (!movie) {
    return <h2>Loading ...</h2>;
  }

  const { title, release_date, vote_average, backdrop_path, overview, genres } =
    movie;

  const genreNames = genres.map((genre) => genre.name).join(" ");

  return (
    <div>
      <h1>
        {title} ({release_date.split("-")[0]})
      </h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        alt={title}
      />
      <p>User Score: {(vote_average * 10).toFixed(0)}%</p>
      <h2>Overview</h2>
      <p>{overview}</p>
      <h2>Genres</h2>
      <p>{genreNames}</p>
    </div>
  );
};

export default MovieDetailsPage;
