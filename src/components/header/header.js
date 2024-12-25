import React, { useState } from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { fetchMoviesBySearch } from "../../api/movieApi";

const Header = ({ setMovies, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (query.length > 2) {
      try {
        const results = await fetchMoviesBySearch(query);
        setSearchResults(results);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setShowDropdown(false);
    }
  };

  const handleMovieClick = async (query) => {
    setLoading(true);
    try {
      const results = await fetchMoviesBySearch(query);
      setMovies(results);
      navigate("/");
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
      setShowDropdown(false);
      setSearchTerm("");
    }
  };

  const handleSearchButtonClick = async () => {
    if (searchTerm.trim().length > 0) {
      handleMovieClick(searchTerm);
    }
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="IMDB Logo"
          />
        </Link>
      </div>
      <div className="headerSearch">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="header__searchBar"
        />
        <button className="header__searchButton" onClick={handleSearchButtonClick}>
          Search
        </button>
        {showDropdown && searchResults.length > 0 && (
          <div className="header__dropdown">
            {searchResults.map((movie) => (
              <div
                key={movie.imdbID}
                className="header__dropdownItem"
                onClick={() => handleMovieClick(movie.Title)}
              >
                {movie.Title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
