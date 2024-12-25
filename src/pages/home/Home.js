import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import "./Home.scss";
import { fetchMoviesBySearch } from "../../api/movieApi";

const Home = ({ movies, setMovies, loading, setLoading }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  useEffect(() => {
    if (!movies.length) {
      const getMovies = async () => {
        setLoading(true);
        try {
          const results = await fetchMoviesBySearch("popular");
          setMovies(results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        } finally {
          setLoading(false);
        }
      };
      getMovies();
    }
  }, [movies, setMovies, setLoading]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const moviesToDisplay = movies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="home">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="home__moviesGrid">
          {moviesToDisplay.map((movie) => (
            <Card key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
      <div className="home__pagination">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="home__paginationButton"
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`home__paginationNumber ${
              page === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="home__paginationButton"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
