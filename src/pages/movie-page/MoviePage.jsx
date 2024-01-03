import React from 'react';
import { useEffect, useState } from 'react';
import Crew from '../../modules/crew/crew.jsx';
import { useParams } from 'react-router-dom';
import './style.css';

export default function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const {movieId} = useParams();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMzZmZiMGJiZDYyMmYxNWEyYzk2ZGI1N2JiNDk5NSIsInN1YiI6IjY1NjYwNGY3ZDk1NDIwMDBmZTMzNDBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_uOQGwm3MJDqxGnJSkPjAXSlGfO6jJU2UbB7GWADc",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((object) => {setMovie(object);console.log(object)});
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMzZmZiMGJiZDYyMmYxNWEyYzk2ZGI1N2JiNDk5NSIsInN1YiI6IjY1NjYwNGY3ZDk1NDIwMDBmZTMzNDBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_uOQGwm3MJDqxGnJSkPjAXSlGfO6jJU2UbB7GWADc",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((object) => setReleaseDate(object));
  }, []);

  console.log(movie);

  return (
    <div className='movie-page'>
      <div className='movie-page__header'>
        <img className='movie-page__image' width={300}height={450} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}></img>
        <div className='movie-page__header-content'>
          <h2 className='movie-page__title'>{movie?.title}</h2>
          <ul className='movie-page__title-info-list'>
            <li className='movie-page__title-info-item'>{new Date(movie?.release_date)?.getFullYear()}</li>
            <li className='movie-page__title-info-item'>{releaseDate?.results.find(item => item.iso_3166_1 === 'US')?.release_dates.find(item => item.type === 3).certification}</li>
            <li className='movie-page__title-info-item'>{Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m</li>
          </ul>
          <p className='movie-page__tagline'>{movie?.tagline}</p>
          <div className='genres'>
            {
              movie?.genres.map(genre => {
                return <a className='movie-page__genre' href={`https://www.themoviedb.org/genre/${genre.id}-${genre.name}/movie`} key={genre.id}>{genre.name}</a>
              })
            }
          </div>
          <p className='movie-page__overview'>{movie?.overview}</p>
        </div>
        <div className='movie-page__header-rating'>
          <div className='movie-page__rating'>
            <p className='movie-page__rating-title'>The Movie Rating</p>
            <div className='movie-page__rating-container'>
              <p className='movie-page__rating-value'>{movie?.vote_average}/10</p>
              <p className='movie-page__rating-count'>{movie?.vote_count} Votes</p>
            </div>
          </div>
        </div>
      </div>
        <div className='movie-page__crew'>
          <p className='movie-page__director'></p>
        </div>
        <Crew movieId={movieId} />
    </div>
  )
}
