import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const END_POINT_POPULAR = "/trending/movie/day";
const END_POINT_SEARCH = "/search/movie";
const END_POINT_ID = "/movie/";
const END_POINT_CREDITS = "/credits";
const END_POINT_REVIEWS = "/reviews";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzBkNzc3YjQ4OTNkOWJjMjRiM2UwM2EzZjhiZTMzYSIsIm5iZiI6MTcyMTc2MDc1My43MjgyOTUsInN1YiI6IjY2OWZmYjJjMWRkMDEwYjU1ZGRkYWRjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ngq7KtGxxC-mbULr_uuoi8baCxR7jZt4Ln1kon3vLfo",
  },
  params: {
    query: "",
    include_adult: false,
    language: "en-US",
    page: 1,
  },
};

export const fetchMoviesPopular = async () => {
  const url = `${BASE_URL}${END_POINT_POPULAR}`;

  const { data } = await axios.get(url, options);
  return data.results;
};

export const fetchMoviesWithSearch = async (searchQuery) => {
  const url = `${BASE_URL}${END_POINT_SEARCH}`;

  const { data } = await axios.get(url, {
    ...options,
    params: { query: searchQuery },
  });
  return data.results;
};

export const fetchMoviesById = async (id) => {
  const url = `${BASE_URL}${END_POINT_ID}${id}`;

  const { data } = await axios.get(url, options);
  return data;
};

export const fetchMoviesByIdCredits = async (id) => {
  const url = `${BASE_URL}${END_POINT_ID}${id}${END_POINT_CREDITS}`;

  const { data } = await axios.get(url, options);
  return data;
};

export const fetchMoviesByIdReviews = async (id) => {
  const url = `${BASE_URL}${END_POINT_ID}${id}${END_POINT_REVIEWS}`;

  const { data } = await axios.get(url, options);
  return data;
};
