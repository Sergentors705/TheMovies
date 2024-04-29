import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import { Text, Title } from '@mantine/core';

export default function AllMovies() {
  const [person, setPerson] = useState(null);
  const {personId} = useParams();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
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

  useEffect(() => console.log(crew), [person]);

  useEffect(() => {
    setArt(crew?.filter((item) => item.department === 'Art'));
    setLighting(crew?.filter((item) => item.department === 'Lighting'));
    setSound(crew?.filter((item) => item.department === 'Sound'));
    setProduction(crew?.filter((item) => item.department === 'Production'));
    setActors(crew?.filter((item) => item.department === 'Actors'));
    setCostume(crew?.filter((item) => item.department === 'Costume & Make-Up'));
    setDirecting(crew?.filter((item) => item.department === 'Directing'));
    setCamera(crew?.filter((item) => item.department === 'Camera'));
    setWritting(crew?.filter((item) => item.department === 'Writing'));
    setTeam(crew?.filter((item) => item.department === 'Crew'));
    setEditing(crew?.filter((item) => item.department === 'Editing'));
    setVisualEffects(crew?.filter((item) => item.department === 'Visual Effects'));
  }, [crew])

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
  }, [])

  return (
    <div className='all-movies__wrapper'>
      <div className='all-movies__header'>
        <Link className='all-movies__back-to-person' to={`/person/${person?.id}`}>
          <img className='all-movies__person-image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${person?.profile_path}`} width={100} height={150} />
          Back to {person?.name}
        </Link>
      </div>
      <div className='all-movies__content'>
        <div className='all-movies__cast'>
          {
            cast.length > 0
            ? <>
              <h3 className='all-movies__list-title'>Acting</h3>
              <ul className='all-movies__list'>
                {
                  cast?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} className='cast-movies-list__link' style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <Title order={3}>{item.title}</Title>
                            <Text>{item.character}</Text>
                            <p className='cast-movies__rating-date-container'>
                              <span className='cast-movies__rating'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                  <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                                </svg>
                                {item.vote_average.toFixed(1)}
                              </span>
                              <span className='cast-movies__date'>{new Date(item.release_date).getFullYear()}</span>
                            </p>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            : <></>
          }

        </div>
        <div className='all-movies__crew'>
          {
            art.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Art</h3>
              <ul className='all-movies__list'>
                {
                  art?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            lighting.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Lighting</h3>
              <ul className='all-movies__list'>
                {
                  lighting?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            sound.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Sound</h3>
              <ul className='all-movies__list'>
                {
                  sound?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            production.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Production</h3>
              <ul className='all-movies__list'>
                {
                  production?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            actors.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Actors</h3>
              <ul className='all-movies__list'>
                {
                  actors?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            costume.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Costume & Make-Up</h3>
              <ul className='all-movies__list'>
                {
                  costume?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            directing.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Directing</h3>
              <ul className='all-movies__list'>
                {
                  directing?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            camera.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Camera</h3>
              <ul className='all-movies__list'>
                {
                  camera?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            writting.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Writing</h3>
              <ul className='all-movies__list'>
                {
                  writting?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            team.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Crew</h3>
              <ul className='all-movies__list'>
                {
                  team?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            editing.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Editing</h3>
              <ul className='all-movies__list'>
                {
                  editing?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }
          {
            visualEffects.length >0 ?
            <>
              <h3 className='all-movies__list-title'>Visual effects</h3>
              <ul className='all-movies__list'>
                {
                  visualEffects?.map((item) =>
                      <li key={item.id} className='all-movies__popular-movie'>
                        <Link to={`/movie/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          <img className='cast-movies-list__image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} width={100} height={150} />
                          <div className='cast-movies-list__content'>
                            <h3 className='cast-movies__title'>{item.title}</h3>
                            <h3 className='cast-movies__character'>{item.job}</h3>
                            <span className='cast-movies__rating'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                              </svg>
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </>
            :<></>
          }

        </div>
      </div>
    </div>
  )
}
