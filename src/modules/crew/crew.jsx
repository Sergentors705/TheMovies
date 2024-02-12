import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/ui/button/button';
import './style.css';
import { Image, Title, Text, Paper } from '@mantine/core';
import { Carousel, CarouselSlide } from '@mantine/carousel';

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
        <Carousel
          slideSize='20%'
          align='start'
          slideGap='md'
          containScroll='trimSnaps'
        >
          {
            starring?.map( item =>
              <CarouselSlide
                key={item.id}
                flex
                align='center'
                onClick={() => navigate(`/person/${item.id}`)}
              >
                <Paper
                  h='100%'
                  shadow='xs'
                  p='md'
                >
                  <Image
                    w={150}
                    h={225}
                    radius='md'
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
                  />
                  <Title order={3}>{item.name}</Title>
                  <Text size='md'>{item.character}</Text>
                  </Paper>
              </CarouselSlide>
          )}
        </Carousel>
        <ul className='starring__list'>

          <li className='starring__card starring__card--show-all'>
            <PrimaryButton classname='button-primary--red' text='Show all' type='button' onclick={() => navigate(`/all-cast/${movieId}`)} />
          </li>
        </ul>
    </div>
  )
}



