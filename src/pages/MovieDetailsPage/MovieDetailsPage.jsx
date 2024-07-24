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

  return (
    <div>
      <h1>
        {movie.title} ({movie.release_date.split("-")[0]})
      </h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <p>User Score: {(movie.vote_average * 10).toFixed(0)}%</p>
      <h2>Overview</h2>
      <p>{movie.overview}</p>
      <h2></h2>
    </div>
  );
};

export default MovieDetailsPage;
