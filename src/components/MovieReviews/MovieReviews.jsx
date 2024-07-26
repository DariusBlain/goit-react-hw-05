import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesByIdReviews } from "../../api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        const data = await fetchMoviesByIdReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError("Failed to fetch reviews. Please try again later.");
      }
    };
    fetchData();
  }, [movieId]);

  if (reviews.length === 0) {
    return <h2>No reviews available.</h2>;
  }

  return (
    <div className={s.container}>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className={s.reviewList}>
          {reviews.map((item) => (
            <li key={item.id} className={s.reviewItem}>
              <h3 className={s.reviewAuthor}>Author: {item.author}</h3>
              <p className={s.reviewContent}>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
