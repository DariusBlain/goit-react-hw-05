import { useParams } from "react-router-dom";
import { fetchMoviesByIdCredits } from "../../api";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        const data = await fetchMoviesByIdCredits(movieId);
        setMovie(data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [movieId]);

  if (!movie) {
    return <h2>Loading ...</h2>;
  }

  return (
    <>
      <ul>
        {movie.map((item) => {
          const { id, profile_path, character, name } = item;
          return (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                alt=""
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieCast;
