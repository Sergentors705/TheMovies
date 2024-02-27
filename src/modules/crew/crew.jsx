import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Image, Paper, Skeleton, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/ui/button/button';
import useLoading from '../../hooks/use-loading';
import './style.css';

export default function Crew({movieId}) {
  const [crew, setCrew] = useState(null);
  const [director, setDirector] = useState(null);
  const [producer, setProducer] = useState(null);
  const [starring, setStarring] = useState([]);
  const navigate = useNavigate();
  const [fetchMovies, isLoadingMovies] = useLoading(
    async () => {
      await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
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
    }
  )

  useEffect(() => {
    fetchMovies();
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
                  <Skeleton
                    visible={isLoadingMovies}
                    mih={225}
                    miw={150}
                    mb={10}
                  >
                    <Image
                      w={150}
                      h={225}
                      radius='md'
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
                    />
                  </Skeleton>
                  <Skeleton
                    visible={isLoadingMovies}
                    mih={20}
                    mb={6}
                  >
                    <Title order={3}>{item.name}</Title>
                  </Skeleton>
                  <Skeleton
                    visible={isLoadingMovies}
                    mih={20}
                    mb={6}
                  >
                    <Text size='md'>{item.character}</Text>
                  </Skeleton>
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



