import '@mantine/carousel/styles.css';
import { Box, Container, Flex, Image, NumberInput, Pagination, Paper, RangeSlider, Text, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/loading';
const dayjs = require('dayjs');

export default function TopRatedMovies() {
  const [page, setPage] = useState(1);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minRating, setMinRating] = useState(7);
  const [maxRating, setMaxRating] = useState(10);
  const [minYear, setMinYear] = useState(new Date('1-1-1950'));
  const [maxYear, setMaxYear] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&without_genres=99,10755&vote_count.gte=1000&primary_release_date.gte=${dayjs(minYear).format('YYYY-MM-DD')}&primary_release_date.lte=${dayjs(maxYear).format('YYYY-MM-DD')}}`, {
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
      setPopular(object);
      setLoading(false);
    })
  },[minRating, maxRating, minYear, maxYear, page])

  if (loading) return <Loading />;

  return (
    <Container size={1366}>
      <Title order={1} mb={'md'}>Top rated movies</Title>
      <Box display='grid' w='100%' style={{gridTemplateColumns: '300px 1fr'}}>
        <Paper p={20} mr={30}>
          <Box>
            <Title order={3} mb={10}>User rating</Title>
            <RangeSlider
              minRange={0}
              mb={10}
              min={0}
              max={10}
              step={0.1}
              value={[minRating, maxRating]}
              defaultValue={[minRating, maxRating]}
              onChangeEnd={(value) => {setMaxRating(value[1]); setMinRating(value[0])}}
            />
            <Flex align='center' gap={10}>
              <NumberInput
                value={minRating}
                onChange={setMinRating}
                defaultValue={minRating}
                decimalScale={1}
                min={0}
                max={10}
              />
              to
              <NumberInput
                value={maxRating}
                onChange={setMaxRating}
                defaultValue={maxRating}
                decimalScale={1}
                min={0}
                max={10}
              />
            </Flex>
          </Box>
          <Box>
            <Title order={3} mb={10}>Year</Title>
            <DatePickerInput
              label='From:'
              clearable
              mb={10}
              value={minYear}
              onChange={value => setMinYear(value)}
            />
            <DatePickerInput
              label='To:'
              clearable
              value={maxYear}
              onChange={value => setMaxYear(value)}
            />
          </Box>
        </Paper>
        <Flex wrap={'wrap'} gap={20}>
          {popular?.results?.map((item) =>
            <Box
              key={item.id}
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
              <Text>{item.release_date}</Text>
            </Box>
          )}
        </Flex>
      </Box>
      <Pagination value={page} onChange={setPage} total={popular?.total_pages}  withEdges/>
    </Container>
  )
}


