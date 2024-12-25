import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/header/header';
import Home from './pages/home/Home';
import React, { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header setMovies={setMovies} setLoading={setLoading} />
        <Routes>
          <Route
            index
            element={<Home movies={movies} setMovies={setMovies} loading={loading} setLoading={setLoading} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
