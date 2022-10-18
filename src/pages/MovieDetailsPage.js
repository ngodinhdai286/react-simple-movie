import React from "react";
import { useParams } from "react-router-dom";
import { fetcher, tmdbAPI } from "../apiConfig/config";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  //   console.log(movieId);
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

  if (!data) {
    return null;
  }
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="pb-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10 ">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="text-center font-bold text-white text-4xl mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border rounded"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MoviesSimilar></MoviesSimilar>
    </div>
  );
};

// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
function MovieCredits() {
  const { movieId } = useParams();
  //   console.log(movieId);
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) {
    return null;
  }
  const { cast } = data;

  if (!cast || cast.length <= 0) {
    return null;
  }

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  //   console.log(movieId);
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  if (!data) {
    return null;
  }
  const { results } = data;
  //   console.log(data);
  if (!results || results <= 0) {
    return null;
  }
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 3).map((item) => (
          <div className="" key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 bg-secondary rounded-xl inline-block">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="1459"
                height="750"
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-fill rounded-xl"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// <iframe width="1459" height="750" src="https://www.youtube.com/embed/GAn3I1daruY" title="Buổi tập Gym đầu tiên của team Refund, Reaction Vlog Hiếu Lợn ăn sập quán nhậu mới toanh của DjChip" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

//api.themoviedb.org/3/movie/${movieId}/similar?api_key=<<api_key>>
function MoviesSimilar() {
  const { movieId } = useParams();
  //   console.log(movieId);
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  if (!data) {
    return null;
  }
  const { results } = data;
  console.log(data);
  if (!results || results <= 0) {
    return null;
  }

  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
