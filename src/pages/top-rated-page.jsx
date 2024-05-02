import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/loading';
import '@mantine/carousel/styles.css';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { Flex, NumberInput, Pagination, Paper, RangeSlider, Text, rem } from '@mantine/core';
import { Box, Container, Image, Title } from '@mantine/core';

export default function TopRatedMovies() {
  const [page, setPage] = useState(1);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minRating, setMinRating] = useState(7);
  const [maxRating, setMaxRating] = useState(10);
  const navigate = useNavigate();

  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&without_genres=99,10755&vote_count.gte=1000`, {
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
      setPopular(object);
      setLoading(false);
    })
  },[minRating, maxRating, page])

  if (loading) return <Loading />;
  console.log(popular)
  return (
    <Container size={1366}>
      <Title order={1} mb={'md'}>Top rated movies</Title>
      <Box display='grid' w='100%' style={{gridTemplateColumns: '300px 1fr'}}>
        <Paper p={20} mr={30}>
          <Box>
            <Title order={3} mb={10}>User rating</Title>
            <RangeSlider minRange={0} min={0} max={10} step={0.1}value={[minRating, maxRating]} defaultValue={[minRating, maxRating]} onChangeEnd={(value) => (setMaxRating(value[1]), setMinRating(value[0]))}/>
            <NumberInput
              label='Min'
              value={minRating}
              onChange={setMinRating}
              defaultValue={minRating}
              decimalScale={1}
              min={0}
              max={10}
            />
          </Box>
        </Paper>
        <Flex wrap={'wrap'} gap={20}>
          {popular?.results?.map((item) =>
            <Box
              maw={220}
              onClick={() => navigate(`/movie/${item.id}`)}
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
              >{item.title}</Title>
            </Box>
          )}
        </Flex>
      </Box>
      <Pagination value={page} onChange={setPage} total={popular?.total_pages}  withEdges/>
    </Container>
  )
}


