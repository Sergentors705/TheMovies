import { Box, Divider, Flex, Image, Pagination, Paper, Skeleton, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import requestMaker from '../functions/requestMaker';
import useLoading from '../hooks/use-loading';

interface IMultiTitle {
  name: string,
  id: number,
}

interface ISearchResults {
  page: number,
  results: Array<any>,
  total_pages: number,
}

export default function SearchPage() {
  const {creationType, keywordId, genreId, companieId, searchValue} = useParams();
  const [creations, setCreations] = useState<ISearchResults | null>();
  const [searchResults, setSearchResults] = useState<ISearchResults | null>();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [fetchCreations, isLoadingCreations] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/discover/${creationType}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_keywords=${keywordId || ''}&with_genres=${genreId || ''}&with_companies=${companieId || ''}`, setCreations))
  const [fetchSearch, isLoadingSearch] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/search/multi?query=${searchValue}&include_adult=false&language=en-US&page=${page}`, setSearchResults))
  const [keywordTitle, setKeywordTitle] = useState<IMultiTitle | null>();
  const [genreTitle, setGenreTitle] = useState<IMultiTitle | null>();
  const [companieName, setCompanieName] = useState<IMultiTitle | null>();

  useEffect(() => {
    requestMaker(`https://api.themoviedb.org/3/keyword/${keywordId}`, setKeywordTitle);
    requestMaker(`https://api.themoviedb.org/3/genre/${genreId}`, setGenreTitle);
    requestMaker(`https://api.themoviedb.org/3/company/${companieId}`, setCompanieName);
  }, [keywordId, genreId, companieId])

  useEffect(() => {
    fetchCreations();
  }, [keywordId, page, genreId, companieId])

  useEffect(() => {
    fetchSearch();
  }, [searchValue, page])
  
  return (
    <Flex
      maw={1366}
      p={30}
      direction='column'
      align=''
      gap={20}
    >
      <Title
        order={2}
        tt="capitalize"
        fz='sectionTitle'
        ml={20}
      >{keywordTitle?.name || genreTitle?.name || companieName?.name}</Title>
        {
          (creations || searchResults)?.results?.map((item) =>
            <Link
                key={item.id} to={`/${item?.media_type || creationType}/${item.id}`} style={{textDecoration: 'none'}}>
              <Paper
                display='flex'
                w='100%'
                shadow='md'
                withBorder
                p={20}
              >
                  <Skeleton
                    visible={isLoadingCreations}
                    w='auto'
                  >
                    <Image
                      w={100}
                      h={150}
                      mr={20}
                      src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path || item.profile_path}`}
                    />
                  </Skeleton>
                  <Box w='100%'>
                    <Title order={3} c='black'>{item.title || item.name}</Title>
                    <Text c='dimmed'>{item.original_title || item.original_name}, {new Date(item.release_date)?.getFullYear() || new Date(item.first_air_date)?.getFullYear()}, {item.runtime}</Text>
                    <Divider my='xs'></Divider>
                    <Text c='gray.9'>{item.overview}</Text>
                  </Box>
                  <Flex p={10} miw={150} gap={5}>
                    <Flex>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                        <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                      </svg>
                      <Title order={4} c='black'>{item?.vote_average?.toFixed(1)}/10</Title>
                    </Flex>
                    <Text c='dimmed'>({item.vote_count})</Text>
                  </Flex>
              </Paper>
            </Link>
          )
        }
      <Pagination value={page} onChange={setPage} total={creations?.total_pages || searchResults?.total_pages || 0}  withEdges/>
    </Flex>
  )
}
