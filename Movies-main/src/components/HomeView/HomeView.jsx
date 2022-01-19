import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/moviesApi";
import s from "./HomeView.module.css";

const HomeView = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    trendingMoviesRender();
  }, []);

  const trendingMoviesRender = () => {
    api.fetchTrendingMovies().then((response) => setTrendingMovies(response));
  };

  return (
    <>
      <h1 className={s.title}>Trends of the week</h1>
      <ul className={s.list}>
        {trendingMovies.map(({ id, title, poster_path }) => (
          <li key={id} className={s.listItem}>
            <Link
              className={s.link}
              to={{
                pathname: `movies/${id}`,
                state: {
                  from: location,
                },
              }}
            >
              <div className={s.wrapper}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className={s.image}
                />
              </div>
              <p className={s.text}>{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomeView;
