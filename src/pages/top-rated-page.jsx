import '@mantine/carousel/styles.css';
import { Box, Chip, Container, Flex, Image, NativeSelect, NumberInput, Pagination, Paper, RangeSlider, Text, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/loading';
import requestMaker from '../functions/requestMaker';
const dayjs = require('dayjs');

export default function TopRatedMovies() {
  const [page, setPage] = useState(1);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minRating, setMinRating] = useState(7);
  const [maxRating, setMaxRating] = useState(10);
  const [minYear, setMinYear] = useState(new Date('1-1-1950'));
  const [maxYear, setMaxYear] = useState(new Date());
  const [minRuntime, setMinRuntime] = useState(0);
  const [maxRuntime, setMaxRuntime] = useState(360);
  const [genreList, setGenreList] = useState([]);
  const [genreValue, setGenreValue] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const navigate = useNavigate();
  const marks = [
    { value: 60, label: '1h' },
    { value: 120, label: '2h' },
    { value: 180, label: '3h' },
    { value: 360, label: '5h' },
  ];

  useEffect(() => {
    requestMaker('https://api.themoviedb.org/3/genre/movie/list?language=en', setGenreList)
  },[])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${selectValue}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&without_genres=99,10755&vote_count.gte=1000&primary_release_date.gte=${dayjs(minYear).format('YYYY-MM-DD')}&primary_release_date.lte=${dayjs(maxYear).format('YYYY-MM-DD')}}${genreValue.length !== 0 ? `&with_genres=${genreValue.join('|')}` : ''}&with_runtime.gte=${minRuntime}&with_runtime.lte=${maxRuntime}`, {
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
  },[minRating, maxRating, minYear, maxYear, page, genreValue, selectValue, minRuntime, maxRuntime])

  if (loading) return <Loading />;
  console.log(genreValue)
  return (
    <Container size={1366}>
      <Title order={1} mb={'md'}>Top rated movies</Title>
      <Box display='grid' w='100%' style={{gridTemplateColumns: '300px 1fr'}}>
        <Paper p={20} mr={30}>
          <Title order={3} mb={10}>Sort by</Title>
          <NativeSelect
            mb={15}
            value={selectValue}
            onChange={(event) => setSelectValue(event.currentTarget.value)}
            data={[
              // {label: 'Original title', value: 'original_title.asc'},
              // {label: 'Original title', value: 'original_title.desc'},
              {label: 'Vote average descending', value: 'vote_average.desc'},
              {label: 'Popularity ascending', value: 'popularity.asc'},
              {label: 'Popularity descending', value: 'popularity.desc'},
              {label: 'Revenue ascending', value: 'revenue.asc'},
              {label: 'Revenue descending', value: 'revenue.desc'},
              {label: 'Release date ascending', value: 'primary_release_date.asc'},
              {label: 'Release date descending', value: 'primary_release_date.desc'},
              {label: 'Title (A-Z)', value: 'title.asc'},
              {label: 'Title (A-Z)', value: 'title.desc'},
              {label: 'Vote average ascending', value: 'vote_average.asc'},
              {label: 'Vote count ascending', value: 'vote_count.asc'},
              {label: 'Vote count descending', value: 'vote_count.desc'},
            ]}
          />
          <Box mb={15}>
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
          <Box mb={15}>
            <Title order={3}>Year</Title>
            <DatePickerInput
              label='From:'
              clearable
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
          <Box mb={15}>
            <Title order={3}>Genres</Title>
            <Chip.Group multiple value={genreValue} onChange={setGenreValue}>
              <Flex wrap='wrap' gap={10}>
              {genreList?.genres?.map((item) =>
                <Chip key={item.id} value={String(item.id)} >{item.name}</Chip>
              )}
              </Flex>
            </Chip.Group>
          </Box>
          <Box>
            <Title order={3} mb={10}>Runtime</Title>
            <RangeSlider
              minRange={15}
              mb={10}
              min={0}
              max={360}
              step={15}
              value={[minRuntime, maxRuntime]}
              defaultValue={[minRuntime, maxRuntime]}
              onChangeEnd={(value) => {setMinRuntime(value[0]); setMaxRuntime(value[1])}}
              marks={marks}
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


