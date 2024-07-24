import { Link } from "react-router-dom";

const HomePage = ({ movies }) => {
  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies.map((item) => (
          <li key={item.id}>
            <Link to={`movies/${item.id.toString()}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
