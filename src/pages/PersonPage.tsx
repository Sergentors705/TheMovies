import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import useLoading from '../hooks/use-loading';
import requestMaker from '../functions/requestMaker';
import { Title } from '@mantine/core';

export default function PersonPage() {
  const [person, setPerson] = useState(null);
  const [fetchPerson, isLoadingPerson] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/person/${personId}`, setPerson));
  const {personId} = useParams();
  const [credits, setCredits] = useState([]);
  const [fetchCredits, isLoadingCredits] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/person/${personId}/combined_credits`, setCredits));
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const getMonthName = (monthNumber) => {
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return monthNames[monthNumber];
  }
console.log(person)
  useEffect(() => {
    fetchPerson();
    fetchCredits();
  }, [personId])

  // useEffect(() => {
  //     setCast(credits?.cast?.sort((a, b) => a.vote_average - b.vote_average).reverse());
  //     setCrew(credits?.crew?.sort((a, b) => a.vote_average - b.vote_average).reverse());
  //     setCredits([].concat(credits?.cast, credits?.crew).sort((a, b) => a.vote_average - b.vote_average).reverse())
  // }, [credits])

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
          // person?.known_for_department === 'Acting' : 1 ? 0
          []?.concat(credits?.cast, credits?.crew).filter(item => item).sort((a, b) => a.vote_average - b.vote_average).reverse().filter(item => !item?.genre_ids.includes(10767) && !item?.genre_ids.includes(10763) && item?.vote_count >= 500).slice(0, 9).map((item) =>
              <li key={item.credit_id} className='person-page__popular-movie'>
                <Link to={item.title ? `/movie/${item.id}` : `/tv/${item.id}`} style={{textDecoration: 'none'}}>
                  <img className='popular-movie__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={150} height={225} alt=''/>
                  <Title order={3} fz={'listTitle'} c='black'>{item.title || item.name}</Title>
                </Link>
              </li>
          )
        }
        <li className='person-page__popular-movie person-page__popular-movie--show-all'>
          <Link to={`/all-movies/${personId}`}>Show All</Link>
        </li>
      </ul>
    </div>
  )
}
