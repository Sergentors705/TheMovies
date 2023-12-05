import React from 'react';
import { useEffect, useState } from 'react';
import Crew from '../modules/crew.jsx';

export default function MoviePage({movieId}) {
  const [movie, setMovie] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);

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
      .then((object) => setMovie(object));  
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
        <h2 className='movie-page__title'>{movie?.title}</h2>
        <ul className='movie-page__title-info-list'>
          <li className='movie-page__title-info-item'>{new Date(movie?.release_date).getFullYear()}</li>
          <li className='movie-page__title-info-item'>{releaseDate?.results.find(item => item.iso_3166_1 === 'US').release_dates[0].certification}</li>
          <li className='movie-page__title-info-item'>{Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m</li>
        </ul>
      </div>
        <img className='movie-page__image' width={300}height={450} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}></img>
        <p className='movie-page__overview'>{movie?.overview}</p>
        <div className='movie-page__crew'>
          <p className='movie-page__director'></p>
        </div>
        <div className='genres'>
        {
          movie?.genres.map(genre => {
            return <a className='movie-page__genre' href={`https://www.themoviedb.org/genre/${genre.id}-${genre.name}/movie`} key={genre.id}>{genre.name}</a>
          })
        }
        </div>
        <div className='movie-page__rating'>
          <p className='movie-page__rating-title'>The Movie Rating</p>
          <div className='movie-page__rating-container'>
            <p className='movie-page__rating-value'>{movie?.vote_average}/10</p>
            <p className='movie-page__rating-count'>{movie?.vote_count} Votes</p>
          </div>
        </div>
        <Crew movieId={movieId} />
    </div>
  )
}
