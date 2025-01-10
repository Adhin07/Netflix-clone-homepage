import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import {  API_KEY, imageUrl } from "../../constants/constants";

function Banner() {
  const [movie, setMovie] = useState(null);


 console.log(API_KEY);
 

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`);
      const movies = response.data.results;

      if (movies && movies.length > 0) {
        setMovie(movies[Math.floor(Math.random() * movies.length)]);
      }
    } catch (error) {
      console.error("Error fetching banner movie:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
    const interval = setInterval(fetchMovies, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${movie?.backdrop_path ? imageUrl + movie.backdrop_path : ""})`,
      }}
      className="Banner"
    >
      <div className="content">
        <h1 className="title">{movie?.original_title || movie?.title || movie?.name}</h1>
        <div className="banner-buttons">
          <button className="button">Play</button>
          <button className="button">My List</button>
        </div>
        <h1 className="description">{movie?.overview}</h1>
      </div>
      <div className="fade-bottom"></div>
    </div>
  );
}

export default Banner;
