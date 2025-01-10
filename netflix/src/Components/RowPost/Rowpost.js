import React, { useEffect, useState } from "react";
import "./Rowpost.css";
import axios from "../../axios";
import { API_KEY, imageUrl } from "../../constants/constants";
import YouTube from "react-youtube";

function Rowpost({ title, url, isSmall }) {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noTrailer, setNoTrailer] = useState(false); 


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); 
        const { data } = await axios.get(url);
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMovies();
  }, [url]);

  const handlePlay = async (movieId) => {

    try {
      const { data } = await axios.get(`movie/${movieId}/videos?api_key=${API_KEY}`);
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setNoTrailer(false);
      } else {
        setTrailerKey(null);
        setNoTrailer(true);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      setTrailerKey(null);
      setNoTrailer(true); 
    }
  };


  const playerOptions = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="posters">
        {loading ? (
          <p>Loading...</p> 
        ) : (
          movies.map((movie, index) => (
            <div>
            <img
              key={index}
              onClick={() => handlePlay(movie.id)}
              className={isSmall ? "small-img-poster" : "img-poster"}
              alt={`Poster of ${movie.title || movie.name}`}
              src={`${imageUrl}${movie.poster_path}`}
            />
            <p>{movie.title || movie.name}</p>
            </div>
            
          ))
        )}
      </div>
      {trailerKey && <YouTube videoId={trailerKey} opts={playerOptions} />}
      {noTrailer && !trailerKey && <p>No trailer video available</p>}
    </div>
  );
}

export default Rowpost;
