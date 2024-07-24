import { Formik, Form, Field } from "formik";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = ({ movies, handleSubmit, query }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  console.log(searchParams);

  return (
    <>
      <Formik initialValues={{ text: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field type="text" name="text" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <MovieList movies={movies} query={query} />
    </>
  );
};

export default MoviesPage;
