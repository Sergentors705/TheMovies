import '@mantine/carousel/styles.css';
import { Box, Chip, Container, Flex, Image, NativeSelect, NumberInput, Pagination, Paper, RangeSlider, Text, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTop } from '../api';
import requestMaker from '../functions/requestMaker';
import TopRatedCard from '../components/blocks/top-rated-card';

interface iGenreData {
  id: number,
  name: string,
}

export default function TopRatedTvShows() {
  const [page, setPage] = useState(1);
  const [minRating, setMinRating] = useState(7);
  const [maxRating, setMaxRating] = useState(10);
  const [minYear, setMinYear] = useState(new Date('1-1-1950'));
  const [maxYear, setMaxYear] = useState(new Date());
  const [minRuntime, setMinRuntime] = useState(0);
  const [maxRuntime, setMaxRuntime] = useState(360);
  const [genreList, setGenreList] = useState<iGenreData[]>([]);
  const [genreValue, setGenreValue] = useState<iGenreData[]>([]);
  const [selectValue, setSelectValue] = useState('vote_average.desc');
  const [popular, isLoadingPopular] = useTop({creationType: 'tv', page: page, selectValue: selectValue, minRating: minRating, maxRating: maxRating, minYear: minYear, maxYear: maxYear, genreValue: genreValue, minRuntime: minRuntime, maxRuntime: maxRuntime})

  const navigate = useNavigate();
  const marks = [
    { value: 60, label: '1h' },
    { value: 120, label: '2h' },
    { value: 180, label: '3h' },
    { value: 360, label: '5h' },
  ];

  useEffect(() => {
    requestMaker('https://api.themoviedb.org/3/genre/tv/list?language=en', setGenreList, 'genres')
  },[])
console.log(popular)
  return (
    <Container
      w={'100%'}
      py={30}
      px={0}
      size={1366}
    >
      <Title order={1} mb={'md'}>Top rated TV Shows</Title>
      <Box display='grid' w='100%' style={{gridTemplateColumns: '300px 1fr'}} mb={30}>
        <Paper
          withBorder
          shadow='md'
          p={20}
          mr={30}
          h={'min-content'}
        >
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
            <Title order={3} mb={10}>Year</Title>
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
            <Title order={3} mb={10}>Genres</Title>
            <Chip.Group multiple value={genreValue} onChange={setGenreValue}>
              <Flex wrap='wrap' gap={10}>
              {genreList?.map((item) =>
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
          {popular?.results.map((item) => <TopRatedCard key={item.id} id={item.id}  creationType='tv'/>
            // <Paper
            //   withBorder
            //   shadow='md'
            //   p={10}
            //   key={item.id}
            //   maw={220}
            //   onClick={() => navigate(`/tv/${item.id}`)}
            // >
            //   <Image
            //     w={200}
            //     h={'auto'}
            //     src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
            //   />
            //   <Title
            //     ta='center'
            //     order={2}
            //     textWrap='wrap'
            //   >{item.name}</Title>
            //   <Text>{item.release_date}</Text>
            // </Paper>
          )}
        </Flex>
      </Box>
      <Pagination value={page} onChange={setPage} total={popular?.total_pages}  withEdges/>
    </Container>
  )
}


