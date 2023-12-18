import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PersonPage() {
  const [person, setPerson] = useState(null);
  const {personId} = useParams();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

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
    .then((object) => setPerson(object));
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits`, {
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
      setCast(object.cast.sort((a, b) => a.popularity - b.popularity).reverse());
      setCrew(object.crew);
    });
  })

  return (
    <div className='person-page'>
      <div className='person-page__header'>
        <img className='person-page__image' width={300} height={450} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${person?.profile_path}`} />
        <div className='person-page__info'>
          <h2 className='person-page__title'>{person?.name}</h2>
          <div className='person-page__about'>
            <h3 className='person-page__about-title'>About</h3>
            <p className='person-page__biography'>{person?.biography}</p>
            <p className='person-page__birthday'>Birthday: {new Date(person?.birthday).getDate()} {getMonthName(new Date(person?.birthday).getMonth())} {new Date(person?.birthday).getFullYear()}</p>
            <p className='person-page__birthplace'>Birthplace: {person?.place_of_birth}</p>
          </div>
        </div>
      </div>
      <ul className='person-page__popular-movies'>
        {
          cast?.slice(0, 10).map((item) =>
              <li key={item.id} className='person-page__popular-movie'>
                <Link to={`/movie/${item.id}`} className='popular-movie__link'>
                  <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                  <h3 className='popular-movie__title'>{item.title}</h3>
                </Link>
              </li>
          )}
      </ul>
    </div>
  )
}
