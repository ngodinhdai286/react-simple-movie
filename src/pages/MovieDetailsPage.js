import React from "react";
import { useParams } from "react-router-dom";
import { apiKey, fetcher } from "../config";
import useSWR from "swr";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );

  return (
    <>
      <div
        className="w-full h-[600px] bg-cover "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        }}
      ></div>
    </>
  );
};

export default MovieDetailsPage;
