import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/moviesApi";
import s from "./Review.module.css";

const Review = () => {
  const [movieReview, setMovieReview] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    renderReviewMovie();
  }, [movieId]);

  const renderReviewMovie = () => {
    api.fetchReviewMovie(movieId).then(setMovieReview);
  };

  return (
    <>
      {movieReview.length > 0 ? (
        <>
          <h2 className={s.title}>Review</h2>
          <ul>
            {movieReview.map(({ id, content, author }) => (
              <li key={id} className={s.listItem}>
                <h3 className={s.subTitle}>{author}</h3>
                <p className={s.text}>{content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={s.error}>Don't have review for this movie</p>
      )}
    </>
  );
};

export default Review;
