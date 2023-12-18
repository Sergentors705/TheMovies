import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Crew({movieId}) {
  const [crew, setCrew] = useState(null);
  const [director, setDirector] = useState(null);
  const [producer, setProducer] = useState(null);
  const [starring, setStarring] = useState([]);
console.log(starring);
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
  useEffect(() => setStarring(crew?.cast.slice(0, 10)), [crew]);

  return (
    <div>
        <p className='director'>Director: {director?.name}</p>
        <ul className='starring-list'>
          {
            starring?.map( item =>
              <li key={item.id} className='starring-card'>
                <Link to={`/person/${item.id}`} className='starring-link'>
                  <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} width={100} height={150} />
                  <h3 className='starring-title'>{item.name}</h3>
                  <p className='starring-character-name'>{item.character}</p>
                </Link>
              </li>
            )}
        </ul>
    </div>
  )
}



