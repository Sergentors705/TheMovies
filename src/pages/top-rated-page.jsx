import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/loading';
import '@mantine/carousel/styles.css';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { Flex, Paper, RangeSlider, Text, rem } from '@mantine/core';
import { Box, Container, Image, Title } from '@mantine/core';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';



export default function TopRatedMovies() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minRating, setMinRating] = useState(7);
  const [maxRating, setMaxRating] = useState(10);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);

  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/top_rated', {
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
      setPopular(object.results);
      setLoading(false);
    })
  },[])

  useEffect(() => {
    setFiltered(popular.filter(item => (item.vote_average >= minRating && item.vote_average <= maxRating)));
  }, [minRating, maxRating])

  if (loading) return <Loading />;

  return (
    <Container size={1366}>
      <Title order={1} mb={'md'}>Top rated movies</Title>
      <Box display='grid' w='100%' style={{gridTemplateColumns: '300px 1fr'}}>
        <Paper p={10} mr={20}>
          <RangeSlider minRange={0} min={0} max={10} step={0.1} defaultValue={[minRating, maxRating]} onChangeEnd={(value) => (setMaxRating(value[1]), setMinRating(value[0]))}/>
          <Text>min: {minRating}</Text>
          <Text>max: {maxRating}</Text>
        </Paper>
        <Flex wrap={'wrap'} gap={20}>
          {filtered?.map((item) =>
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
    </Container>
  )
}


