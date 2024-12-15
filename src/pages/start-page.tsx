import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Container, Image, Paper, SegmentedControl, Skeleton, Title } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrending } from '../api';

interface iCreationData {
  id: number,
  media_type: string,
  name?: string,
  original_name?: string,
  overview: string,
  poster_path?: string,
  backdrop_path?: string,
  profile_path?: string,
  adult: boolean,
  original_language: string,
  genre_ids: number[]
  popularity: number,
  first_air_date?: string,
  vote_average: number,
  vote_count: number,
  origin_country?: string[],
  title?: string,
  original_title?: string,
  release_date?: string,
  video?: string[],
}

export default function StartPage() {
  const [period, setPeriod] = useState('day')
  const [trending, isLoadingTrending] = useTrending({period, type: 'all'})
  const [popularMovie, isLoadingPopularMovie] = useTrending({period, type: 'movie'})
  const [popularTv, isLoadingPopularTv] = useTrending({period, type: 'tv'})

  const [embla, setEmbla] = useState(null)
  useAnimationOffsetEffect(embla, 200)

  const carouselCreator = (array: Array<iCreationData>) => {
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
                  to={`/${item?.media_type}/${item.id}`}
                  style={{textDecoration: 'none'}}
                >
                  <Image
                    w={220}
                    h={330}
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path || item.profile_path}`}
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
      <Skeleton visible={isLoadingTrending}>
        <Title order={1} mb={10}>
          Featured
          <SegmentedControl
            value={period}
            onChange={setPeriod}
            size='lg'
            radius='xl'
            color='blue'
            transitionDuration={500}
            transitionTimingFunction="linear"
            data={[
              {value: 'day', label: 'Today'},
              {value: 'week', label: 'This Week'}
            ]}
          />
        </Title>
        {trending && carouselCreator(trending)}
      </Skeleton>
      <Skeleton visible={isLoadingPopularMovie}>
        <Title order={1} mb={10}>Popular movie</Title>
        {popularMovie && carouselCreator(popularMovie)}
      </Skeleton>
      <Skeleton visible={isLoadingPopularTv}>
        <Title order={1} mb={10}>Popular TV shows</Title>
        {popularTv && carouselCreator(popularTv)}
      </Skeleton>
    </Container>
  )
}
