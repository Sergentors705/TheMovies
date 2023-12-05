import React from 'react';
import { useEffect, useState } from 'react';

export default function Crew({movieId}) {
  const [crew, setCrew] = useState(null);
  const [director, setDirector] = useState(null);
  const [producer, setProducer] = useState(null);
  const [starring, setStarring] = useState([]);

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
        <ul className='starring'>
          {
            starring?.map(element => <li className='starring-item' key={element.id}>{element.name}</li>)
          }
        </ul>
    </div>
  )
}



