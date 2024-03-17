import { Flex, Image, List, Pagination, Paper, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useLoading from '../hooks/use-loading';
import requestMaker from '../functions/requestMaker';

export default function SearchPage() {
  const {keywordId, genreId} = useParams();
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [fetchKeyword, setFetchKeyword] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_keywords=${keywordId || ''}&with_genres=${genreId || ''}`, setMovies))

  useEffect(() => {
    fetchKeyword();
  }, [keywordId, page, genreId])
console.log(movies)
  return (
    <Flex direction='column'>
      <List>
        {
          movies?.results.map((item) =>
            <List.Item>
              <Paper
                onClick={() => navigate(`/movie/${item.id}`)}
              >
                <Title order={3}>{item.title}</Title>
                <Image src={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`}/>
              </Paper>
            </List.Item>
          )
        }
      </List>
      <Pagination value={page} onChange={setPage} total={movies?.total_pages}  withEdges/>
    </Flex>
  )
}
