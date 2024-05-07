import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import Loading from '../../components/ui/loading';

export default function PersonPage() {
  const [person, setPerson] = useState(null);
  const {personId} = useParams();
  const [credits, setCredits] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMonthName = (monthNumber) => {
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return monthNames[monthNumber];
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${personId}`, {
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
    .then((object) => {setPerson(object);
      });
  }, [personId])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits`, {
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
    .then((object) => {
      console.log(object);
      setCast(object.cast.sort((a, b) => a.vote_average - b.vote_average).reverse());
      setCrew(object.crew.sort((a, b) => a.vote_average - b.vote_average).reverse());
      setCredits(credits.concat(object.cast, object.crew).sort((a, b) => a.vote_average - b.vote_average).reverse())
      setLoading(false);
    });
  }, [personId])

  if (loading) return <Loading />

  return (
    <div className='person-page'>
      <div className='person-page__header'>
        <div className='person-page__info'>
          <img className='person-page__image' width={300} height={450} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${person?.profile_path}`} alt=''/>
          <div className='person-page__birthday'>
            <span className='person-page__birthday-title'>Birthday:</span>
            <p className='person-page__birthday-date'>{new Date(person?.birthday).getDate()} {getMonthName(new Date(person?.birthday).getMonth())} {new Date(person?.birthday).getFullYear()}</p>
          </div>
          <div className='person-page__birthplace'>
            <span className='person-page__birthplace-title'>Birthplace:</span>
            <p className='person-page__birthplace-location'>Birthplace: {person?.place_of_birth}</p>
          </div>
          {
            person?.deathday
            ? <div className='person-page__deathday'>
                <span className='person-page__deathday-title'>Day of death:</span>
                <p className='person-page__deathday-date'>{new Date(person?.deathday).getDate()} {getMonthName(new Date(person?.deathday).getMonth())} {new Date(person?.deathday).getFullYear()}</p>
              </div>
            : <></>
          }
        </div>
        <div className='person-page__about'>
          <h2 className='person-page__title'>{person?.name}</h2>
            <h3 className='person-page__about-title'>About</h3>
            <p className='person-page__biography'>{person?.biography}</p>
        </div>
      </div>
      <ul className='person-page__popular-movies'>
        {
          credits?.filter(item => !item.genre_ids.includes(10767) && !item.genre_ids.includes(10763) && item.vote_count >= 500).slice(0, 9).map((item) =>
              <li key={item.id} className='person-page__popular-movie'>
              {
                item.media_type === 'movie' ?
                <Link to={`/movie/${item.id}`} className='popular-movie__link'>
                  <img className='popular-movie__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={150} height={225} alt=''/>
                  <h3 className='popular-movie__title'>{item.title}</h3>
                </Link>
                :
                <Link to={`/tv-show/${item.id}`} className='popular-movie__link'>
                  <img className='popular-movie__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={150} height={225} alt=''/>
                  <h3 className='popular-movie__title'>{item.name}</h3>
                </Link>
              }
              </li>
          )
        }
        <li className='person-page__popular-movie person-page__popular-movie--show-all'>
          <Link className='person-page__show-all-link' to={`/all-movies/${personId}`} cast={cast} crew={crew}>Show All</Link>
        </li>
      </ul>
    </div>
  )
}
