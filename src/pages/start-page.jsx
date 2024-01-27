import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/ui/loading';

export default function StartPage() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMzZmZiMGJiZDYyMmYxNWEyYzk2ZGI1N2JiNDk5NSIsInN1YiI6IjY1NjYwNGY3ZDk1NDIwMDBmZTMzNDBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_uOQGwm3MJDqxGnJSkPjAXSlGfO6jJU2UbB7GWADc',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((object) => {
      console.log(object);
      setPopular(object.results);
      setLoading(false);
    })
  },[])

  if (loading) return <Loading />;

  return (
    <>
      <section className='popular'>
        <h2 className='popular__page-title'>What to watch</h2>
        <ul className='popular__list'>
          {
            popular?.map((item) =>
              <li className='popular__item'>
                <Link className='popular__link' to={`/movie/${item.id}`}>
                  <h3 className='popular__title'>{item.title}</h3>
                  <img className='popular__image' src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`} width={200} height={300} />
                </Link>
              </li>
            )
          }
        </ul>
      </section>
    </>
  )
}
