import { NavLink, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies, basePath }) => {
  const location = useLocation();

  return (
    <ul className={s.list}>
      {movies.map((item) => (
        <li key={item.id} className={s.item}>
          <NavLink
            to={`${basePath}${item.id}`}
            state={location}
            className={s.link}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
