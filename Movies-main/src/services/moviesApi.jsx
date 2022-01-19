import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "b74c0dc966c6718b20701d7c34776374";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: "en-US",
};

const fetchTrendingMovies = async () => {
  try {
    const config = {
      url: `trending/movie/week`,
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error("Server does not respond");
  }
};

const fetchQuery = async (query) => {
  try {
    const config = {
      url: "/search/movie",
      params: {
        query,
      },
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error("Server does not respond");
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    const config = {
      url: `/movie/${movieId}`,
    };

    const { data } = await axios(config, movieId);
    return data;
  } catch (error) {
    new Error("Server does not respond");
  }
};

const fetchCastMovie = async (movieId) => {
  try {
    const config = {
      url: `/movie/${movieId}/credits`,
    };

    const { data } = await axios(config, movieId);
    return data.cast;
  } catch (error) {
    new Error("Server does not respond");
  }
};

const fetchReviewMovie = async (movieId) => {
  try {
    const config = {
      url: `/movie/${movieId}/reviews`,
    };
    const { data } = await axios(config, movieId);
    return data.results;
  } catch (error) {
    new Error("Server does not respond");
  }
};

const api = {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchCastMovie,
  fetchReviewMovie,
  fetchQuery,
};
export default api;
