import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [voteAverage, setVoteAverage] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
        },
      };

      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&vote_average.gte=${voteAverage}&language=en`,
      options
    );

    if (response.ok) {
      const data = await response.json();
      setMovies(data.results || []);
    } else {
      console.error('Error fetching movies:', response.statusText);
      setMovies([]);
    }
  };

  return (
    <div className="App">
      <h1>🎬 Movie Night Planner 🎬</h1>
      <div className="input-container">
        <label>
          Select Genre:
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Minimum Vote Average (1-10):
          <input
            type="number"
            value={voteAverage}
            onChange={(e) => setVoteAverage(e.target.value)}
            min="0"
            max="10"
            step="0.1"
          />
        </label>
      </div>
      <button className="search-button" onClick={handleSearch}>Search Movies</button>
      <div className="movie-list">
        {Array.isArray(movies) && movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>Vote Average: {movie.vote_average}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
