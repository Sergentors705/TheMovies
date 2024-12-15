import '@mantine/carousel/styles.css';
import { Box, Container, Flex, Pagination, Skeleton, Title } from '@mantine/core';
import { useState } from 'react';
import { useTop } from '../api';
import TopRatedCard from '../components/blocks/top-rated-card';
import Filter from '../components/filter';

interface iGenreData {
  id: number,
  name: string,
}

interface iTopPageProps {
  creationType: string,
  sortingOrder: string,
}

export default function TopRatedPage({ creationType, sortingOrder }: iTopPageProps) {
  const [page, setPage] = useState(1);
  const [minRating, setMinRating] = useState<number>(7);
  const [maxRating, setMaxRating] = useState<number>(10);
  const [minYear, setMinYear] = useState(new Date('1-1-1950'));
  const [maxYear, setMaxYear] = useState(new Date());
  const [minRuntime, setMinRuntime] = useState<number>(0);
  const [maxRuntime, setMaxRuntime] = useState<number>(360);
  const [genreValue, setGenreValue] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState(sortingOrder);

  const [popular, isLoadingPopular] = useTop({creationType: creationType, page: page, selectValue: selectValue, minRating: minRating, maxRating: maxRating, minYear: minYear, maxYear: maxYear, genreValue: genreValue, minRuntime: minRuntime, maxRuntime: maxRuntime})


  return (
    <Container
      w={'100%'}
      py={30}
      px={0}
      size={1366}
    >
      <Title order={1} mb={'md'}>Top rated {creationType === 'movie' ? 'movies' : 'TV shows'}</Title>
      <Box
        display='grid'
        w='100%'
        mb={30}
        style={{gridTemplateColumns: '300px 1fr'}}
      >
        <Filter
          creationType={creationType} selectValue={selectValue} minRating={minRating} maxRating={maxRating} minYear={minYear} maxYear={maxYear} minRuntime={minRuntime} maxRuntime={maxRuntime}
          setSelectValue={setSelectValue} setMinRating={setMinRating} setMaxRating={setMaxRating} setMinYear={setMinYear} setMaxYear={setMaxYear} setMinRuntime={setMinRuntime} setMaxRuntime={setMaxRuntime}
        />
        <Flex  wrap={'wrap'} gap={20}>
          {popular?.results?.map(item =>
            <Skeleton visible={isLoadingPopular} maw='min-content'>
              <TopRatedCard key={item.id} id={item.id}  creationType={creationType} />
            </Skeleton>
          )}
        </Flex>
      </Box>
      <Pagination value={page} onChange={setPage} total={popular?.total_pages || 0}  withEdges/>
    </Container>
  )
}


