import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import api from "../../services/moviesApi";
import s from "./MovieDetailsPage.module.css";
import movieDefault from "../../img/movie.jpg";
import Download from "../Download/Download";

const Review = lazy(() =>
  import("../Review/Review" /* webpackChunkName: "Cast" */)
);
const Cast = lazy(() =>
  import("../Cast/Cast" /* webpackChunkName: "Review" */)
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    renderMovieDetails();
  }, [movieId]);

  const renderMovieDetails = () => {
    api.fetchMovieDetails(movieId).then(setMovie);
  };

  return (
    <>
      {movie && (
        <>
          <Link
            type="button"
            to={location?.state?.from ?? "/"}
            className={s.button}
          >
            Go back
          </Link>
          <div className={s.wrapper}>
            <div className={s.imageWrapper}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={s.image}
                />
              ) : (
                <img src={movieDefault} alt={movie.title} className={s.image} />
              )}
            </div>
            <div className={s.textWrapper}>
              <h2 className={s.title}>
                {movie.title} ({movie.release_date.split("-")[0]})
              </h2>
              <p className={s.text}>
                Use score: <span>{movie.vote_average * 10}%</span>
              </p>
              <h3 className={s.subTitle}>Overview</h3>
              <p className={s.text}>{movie.overview}</p>
              <h3 className={s.subTitle}>Genres</h3>
              <p className={s.text}>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <h3 className={s.subTitle}>Additional information</h3>
              <ul className={s.list}>
                <li className={s.listItem}>
                  <NavLink
                    to={`${url}/cast`}
                    className={s.link}
                    activeClassName={s.activeLink}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={s.listItem}>
                  <NavLink
                    to={`${url}/review`}
                    className={s.link}
                    activeClassName={s.activeLink}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <Suspense fallback={<Download message={"Downloading..."} />}>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/review`}>
              <Review />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
