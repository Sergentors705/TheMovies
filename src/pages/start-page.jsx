import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/loading';
import '@mantine/carousel/styles.css';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { rem } from '@mantine/core';
import { Box, Container, Image, Title } from '@mantine/core';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';



export default function StartPage() {
  const [popularMovie, setPopularMovie] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);

  const carouselCreator = (array) => {
    return <Carousel
        getEmblaApi={setEmbla}
        dragFree
        height='min-content'
        slideSize='20%'
        slideGap={{ base: 0, sm: 'md' }}
        align="start"
        mih={400}
        slidesToScroll={1}
        controlSize={40}
        containScroll='trimSnaps'
        nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
        previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
      >
          {array?.map((item) =>
            <Carousel.Slide>
              <Box
                maw={220}
                onClick={() => navigate(`/${item.title ? 'movie': 'tv-show'}/${item.id}`)}
              >
                <Image
                  w={220}
                  h={330}
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                />
                <Title
                  ta='center'
                  order={2}
                  textWrap='wrap'
                >{item.title || item.name}</Title>
              </Box>
            </Carousel.Slide>
          )}
        </Carousel>
  }

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/all/day', {
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
      setTrending(object.results);
      setLoading(false);
    })
  },[])

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
      setPopularMovie(object.results);
      setLoading(false);
    })
  },[])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/tv/popular', {
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
      setPopularTv(object.results);
      setLoading(false);
    })
  },[])

  if (loading) return <Loading />;

  return (
    <Container
      size={1366}
      pt={30}
      pb={50}
    >
      <Title order={1}>Featured today</Title>
      {carouselCreator(trending)}
      <Title order={1}>Popular movie</Title>
      {carouselCreator(popularMovie)}
      <Title order={1}>Popular TV shows</Title>
      {carouselCreator(popularTv)}
    </Container>
  )
}
