import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesWithSearch } from "../../api";
import s from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";

const MoviesPage = () => {
  const [moviesWithSearch, setMoviesWithSearch] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("query") ?? "";

  const notify = () => toast.error("Please enter search term!");
  const FeedbackSchema = Yup.object().shape({
    search: Yup.string(),
  });

  const handleSubmit = (values, actions) => {
    const searchQuery = values.search?.trim();
    if (!searchQuery) {
      notify();
      setMoviesWithSearch([]);
      setSearchParams({});
      return;
    }
    searchParams.set("query", searchQuery);
    setSearchParams(searchParams);
    actions.resetForm();
  };

  useEffect(() => {
    try {
      if (!searchValue) {
        return;
      }
      const fetchData = async () => {
        const data = await fetchMoviesWithSearch(searchValue);
        setMoviesWithSearch(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [searchValue]);

  return (
    <div className={s.container}>
      <Toaster />
      <Formik
        validationSchema={FeedbackSchema}
        initialValues={{ search: "" }}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <Field
            type="search"
            name="search"
            className={s.input}
            placeholder="Search movies..."
          />
          <button type="submit" className={s.button}>
            Search
          </button>
        </Form>
      </Formik>
      <MovieList movies={moviesWithSearch} basePath={""} />
    </div>
  );
};

export default MoviesPage;
