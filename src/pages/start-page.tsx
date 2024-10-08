import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@mantine/carousel/styles.css';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { Paper, rem } from '@mantine/core';
import { Box, Container, Image, Title } from '@mantine/core';
import requestMaker from '../functions/requestMaker';
import useLoading from '../hooks/use-loading';



export default function StartPage() {
  const [popularMovie, setPopularMovie] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [trending, setTrending] = useState(null);
  const [fetchTrending, isLoadingTrending] = useLoading(async () => requestMaker('https://api.themoviedb.org/3/trending/all/day', setTrending));
  const [fetchPopularMovie, isLoadingPopularMovie] = useLoading(async () => requestMaker('https://api.themoviedb.org/3/movie/popular', setPopularMovie));
  const [fetchPopularTv, isLoadingPopularTv] = useLoading(async () => requestMaker('https://api.themoviedb.org/3/tv/popular', setPopularTv));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);

  useEffect(() => {
    fetchTrending();
    fetchPopularMovie();
    fetchPopularTv();
  },[])

  const carouselCreator = (array: Array<any>) => {
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
      >
          {array?.map((item) =>
            <Carousel.Slide key={item.id} mb={30}>
              <Paper
                h='100%'
                withBorder
                shadow='md'
                p='md'
              >
                <Link
                  maw={220}
                  to={`/${item.title ? 'movie': 'tv'}/${item.id}`}
                  style={{textDecoration: 'none'}}
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
                    c='black'
                  >{item.title || item.name}</Title>
                </Link>
              </Paper>
            </Carousel.Slide>
          )}
        </Carousel>
  }

  return (
    <Container
      size={1366}
      pt={30}
      pb={50}
    >
      <Title order={1} mb={10}>Featured today</Title>
      {carouselCreator(trending?.results)}
      <Title order={1} mb={10}>Popular movie</Title>
      {carouselCreator(popularMovie?.results)}
      <Title order={1} mb={10}>Popular TV shows</Title>
      {carouselCreator(popularTv?.results)}
    </Container>
  )
}
