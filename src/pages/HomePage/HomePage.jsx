import MovieList from "../../components/MovieList/MovieList";

const HomePage = ({ movies }) => {
  return (
    <>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
