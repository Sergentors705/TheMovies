import '@mantine/carousel/styles.css';
import { Container, SegmentedControl, Skeleton, Title } from '@mantine/core';
import { useState } from 'react';
import { useTrending } from '../api';
import MediaSlider from '../components/media-slider';



export default function StartPage() {
  const [period, setPeriod] = useState('day')
  const [trending, isLoadingTrending] = useTrending({period, type: 'all'})
  const [popularMovie, isLoadingPopularMovie] = useTrending({period, type: 'movie'})
  const [popularTv, isLoadingPopularTv] = useTrending({period, type: 'tv'})

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
        {trending && MediaSlider(trending)}
      </Skeleton>
      <Skeleton visible={isLoadingPopularMovie}>
        <Title order={1} mb={10}>Popular movie</Title>
        {popularMovie && MediaSlider(popularMovie)}
      </Skeleton>
      <Skeleton visible={isLoadingPopularTv}>
        <Title order={1} mb={10}>Popular TV shows</Title>
        {popularTv && MediaSlider(popularTv)}
      </Skeleton>
    </Container>
  )
}
