import React from "react";
import PropTypes from "prop-types";
import "./card.scss";

const Card = ({ movie }) => {
  return (
    <div className="card">
      <img src={movie.Poster} alt={movie.Title} className="card__image" />
      <h3 className="card__title">{movie.Title}</h3>
      <p className="card__year">{movie.Year}</p>
    </div>
  );
};

Card.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
