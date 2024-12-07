import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      )
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.description_full}</p>
          <ul>
            {movie.genres.map((g, index) => (
              <li key={index}>{g}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
