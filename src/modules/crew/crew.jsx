import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/ui/button/button';
import './style.css';

export default function Crew({movieId}) {
  const [crew, setCrew] = useState(null);
  const [director, setDirector] = useState(null);
  const [producer, setProducer] = useState(null);
  const [starring, setStarring] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
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
      .then((object) => setCrew(object));
  }, [])

  useEffect(() => setDirector(crew?.crew.find(item => item.job === 'Director')), [crew]);
  useEffect(() => setStarring(crew?.cast.slice(0, 9)), [crew]);

  return (
    <div className='starring'>
        <p className='director'>Director: {director?.name}</p>
        <ul className='starring__list'>
          {
            starring?.map( item =>
              <li key={item.id} className='starring__card'>
                <Link to={`/person/${item.id}`} className='starring__link'>
                  <img className='starring__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} width={150} height={225} />
                  <h3 className='starring__title'>{item.name}</h3>
                  <p className='starring__character-name'>{item.character}</p>
                </Link>
              </li>
          )}
          <li className='starring__card starring__card--show-all'>
            <PrimaryButton classname='red' text='Show all' type='button' onclick={() => navigate(`/all-cast/${movieId}`)} />
          </li>
        </ul>
    </div>
  )
}



