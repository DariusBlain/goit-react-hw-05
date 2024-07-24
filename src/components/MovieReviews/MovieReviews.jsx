import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesByIdReviews } from "../../api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        const data = await fetchMoviesByIdReviews(movieId);
        setMovie(data.results);
        console.log(data);
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
    <div>
      <ul>
        {movie.map((item) => {
          return (
            <li key={item.id}>
              <h3>Author: {item.author}</h3>
              <p>{item.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieReviews;
