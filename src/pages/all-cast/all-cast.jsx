import React, { useEffect, useState } from 'react';
import './script.css';
import { Link, useParams } from 'react-router-dom';
import { Flex, Image } from '@mantine/core';

export default function AllCast() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState(null);
  const [crew, setCrew] = useState(null);
  const [art, setArt] = useState([]);
  const [lighting, setLighting] = useState([]);
  const [sound, setSound] = useState([]);
  const [production, setProduction] = useState([]);
  const [actors, setActors] = useState([]);
  const [costume, setCostume] = useState([]);
  const [directing, setDirecting] = useState([]);
  const [camera, setCamera] = useState([]);
  const [writting, setWritting] = useState([]);
  const [team, setTeam] = useState([]);
  const [editing, setEditing] = useState([]);
  const [visualEffects, setVisualEffects] = useState([]);

  const PeopleListCreator = (array, title) => {
    console.log(crew)
    return <div className='crew__list'>
      {
        array?.length > 0
        ? <>
          <h3 className='all-cast-page__list-title'>{title}</h3>
          <ul className='actors-list'>
            {array.map((item) =>
              <li className='actor-card' key={Math.random()}>
                <Link className='actor-link' to={`/person/${item.id}`}>
                  <img className='actor-card__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} width={100} height={150} />
                  <div className='actor-card__content'>
                    <h3 className='actor-title'>{item.name}</h3>
                    <p className='actor-character-name'>{item.job}</p>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </>
        :<></>
      }
    </div>
  }

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

  useEffect(() => {
    setArt(crew?.crew.filter((item) => item.department === 'Art'));
    setLighting(crew?.crew.filter((item) => item.department === 'Lighting'));
    setSound(crew?.crew.filter((item) => item.department === 'Sound'));
    setProduction(crew?.crew.filter((item) => item.department === 'Production'));
    setActors(crew?.crew.filter((item) => item.department === 'Actors'));
    setCostume(crew?.crew.filter((item) => item.department === 'Costume & Make-Up'));
    setDirecting(crew?.crew.filter((item) => item.department === 'Directing'));
    setCamera(crew?.crew.filter((item) => item.department === 'Camera'));
    setWritting(crew?.crew.filter((item) => item.department === 'Writing'));
    setTeam(crew?.crew.filter((item) => item.department === 'Crew'));
    setEditing(crew?.crew.filter((item) => item.department === 'Editing'));
    setVisualEffects(crew?.crew.filter((item) => item.department === 'Visual Effects'));
  }, [crew])

  return (
    <div className='all-cast-page'>
      <div className='all-cast__header'>
        <Link className='all-cast__back-to-movie' to={`/movie/${movie?.id}`}>
          <img className='all-cast__movie-image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`} width={100} height={150} />
          Back to {movie?.title}
        </Link>
      </div>
      <div className='all-cast-page__content'>
        <div className='actors-container'>
          <h3 className='all-cast-page__list-title'>Cast</h3>
          <ul style={{listStyleType: 'none'}}>
            {
              crew?.cast.map( item =>
                <li key={item.id} >
                  <Link to={`/person/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Flex gap={20}>
                      <Image src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} w={75} h='auto' />
                      <div className='actor-card__content'>
                        <h3 className='actor-title'>{item.name}</h3>
                        <p className='actor-character-name'>As {item.character}</p>
                      </div>
                    </Flex>
                  </Link>
                </li>
            )}
          </ul>
        </div>
        <div className='crew-container'>
          {PeopleListCreator(art, 'Art')}
          {PeopleListCreator(lighting, 'Lighting')}
          {PeopleListCreator(sound, 'Sound')}
          {PeopleListCreator(production, 'Production')}
          {PeopleListCreator(actors, 'Actors')}
          {PeopleListCreator(costume, 'Costume & Make-Up')}
          {PeopleListCreator(directing, 'Directing')}
          {PeopleListCreator(camera, 'Camera')}
          {PeopleListCreator(writting, 'Writing')}
          {PeopleListCreator(team, 'Crew')}
          {PeopleListCreator(editing, 'Editing')}
          {PeopleListCreator(visualEffects, 'Visual Effects')}
        </div>
      </div>
    </div>
  )
}
