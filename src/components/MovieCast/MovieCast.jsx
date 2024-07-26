import { useParams } from "react-router-dom";
import { fetchMoviesByIdCredits } from "../../api";
import { useEffect, useState } from "react";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        const data = await fetchMoviesByIdCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError("Failed to fetch cast. Please try again later.");
      }
    };
    fetchData();
  }, [movieId]);

  if (cast.length === 0) {
    return <h2>Loading ...</h2>;
  }

  return (
    <div className={s.container}>
      {error ? (
        <p> {error}</p>
      ) : (
        <ul className={s.castList}>
          {cast.map((item) => {
            const { id, profile_path, character, name } = item;
            return (
              <li key={id} className={s.castItem}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                      : defaultImg
                  }
                  width={250}
                  alt={name}
                  className={s.castImage}
                />
                <div className={s.castInfo}>
                  <p className={s.castName}>{name}</p>
                  <p className={s.castCharacter}>Character: {character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
