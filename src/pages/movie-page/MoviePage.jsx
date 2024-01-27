import React from 'react';
import { useEffect, useState } from 'react';
import Crew from '../../modules/crew/crew.jsx';
import { useParams } from 'react-router-dom';
import PrimaryButton from '../../components/ui/button/button.jsx';
import Posters from '../../components/blocks/posters/posters.jsx';
import Loading from '../../components/ui/loading.jsx';

export default function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const {movieId} = useParams();
  const [loading, setLoading] = useState(true);

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
      .then((object) => {setMovie(object);setLoading(false)});
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

  if (loading) return <Loading />;

  return (
    <div className='movie-page'>
      <div className='movie-page__header'>
        <img className='movie-page__image' width={300}height={450} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}></img>
        <div className='movie-page__header-content'>
          <h2 className='movie-page__title'>{movie?.title}</h2>
          <ul className='movie-page__title-info-list'>
            <li className='movie-page__title-info-item'>{new Date(movie?.release_date)?.getFullYear()}</li>
            <li className='movie-page__title-info-item'>{releaseDate?.results.find(item => item.iso_3166_1 === 'US')?.release_dates.find(item => item.type === 3)?.certification}</li>
            <li className='movie-page__title-info-item'>{Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m</li>
          </ul>
          <p className='movie-page__tagline'>{movie?.tagline}</p>
          <div className='genres'>
            {
              movie?.genres.map(genre => {
                return <PrimaryButton text={genre.name} classname='button-primary--yellow' key={genre.id}/>
              })
            }
          </div>
          <p className='movie-page__overview'>{movie?.overview}</p>
        </div>
        <div className='movie-page__header-rating'>
          <div className='movie-page__rating'>
            <p className='movie-page__rating-title'>The Movie Rating</p>
            <div className='movie-page__rating-container'>
              <p className='movie-page__rating-value'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                  <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                </svg>
                {movie?.vote_average.toFixed(1)}/10
              </p>
              <p className='movie-page__rating-count'>{movie?.vote_count} Votes</p>
            </div>
          </div>
          <div className='movie-page__cash'>
            <p className='movie-page__cash-title'>Budget</p>
            <p className='movie-page__cash-value'>${movie?.budget}</p>
            <p className='movie-page__cash-title'>Revenue</p>
            <p className='movie-page__cash-value'>${movie?.revenue}</p>
          </div>
        </div>
      </div>
      <Crew movieId={movieId} />
      <Posters />
    </div>
  )
}
