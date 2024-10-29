// src/components/Poll.js
import React, { useState } from 'react';

const Poll = ({ movies }) => {
  const [votes, setVotes] = useState({});

  const handleVote = (movie) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [movie.imdbID]: (prevVotes[movie.imdbID] || 0) + 1,
    }));
  };

  return (
    <div>
      <h2>Vote for a Movie</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <span>{movie.Title}</span>
            <button onClick={() => handleVote(movie)}>Vote</button>
            <span> - {votes[movie.imdbID] || 0} votes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poll;
