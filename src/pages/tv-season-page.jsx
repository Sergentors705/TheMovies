import { Flex, Image, Pagination, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import requestMaker from '../functions/requestMaker';
import useLoading from '../hooks/use-loading';


export default function TvSeasonPage() {
  const {tvShowId, seasonId} = useParams();
  const [seasonNumber, setSeasonNumber] = useState(seasonId);
  const [tvSeason, setTvSeason] = useState(null);
  const [tvShow, setTvShow] = useState(null);
  const [fetchSeason, isLoadingTvSeason] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}/season/${seasonNumber}`, setTvSeason));
  const theme = useMantineTheme();

  useEffect(()=>{
    fetchSeason();
    requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}`, setTvShow);
  },[seasonNumber])

  console.log(tvSeason)
  return (
    <Flex
      w={'100%'}
      maw={1366}
      direction={'column'}
      pt={50}
    >
      <Link to={`/tv-show/${tvShowId}`} style={{textDecoration: 'none'}}>
        <Paper
          p={20}
          style={{display: 'flex', gap: '30px'}}
        >
        <Image 
          w={100}
          h={150}
          radius="md"
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${tvShow?.poster_path}`}
        />
        <Title order={2} c={'gray.9'}>Back to {tvShow?.name}</Title>
        </Paper>
      </Link>
      <Title
        order={1}
        mb={50}
      >{tvSeason?.name}</Title>
      <Pagination
        mb={30}
        value={seasonNumber} 
        onChange={setSeasonNumber} 
        total={tvShow?.number_of_seasons} 
      />
      <Flex
        direction={'column'}
        gap={30}
      >
        {tvSeason?.episodes?.map(item =>
            <Link to={`tv-episode/${item.id}`} style={{textDecoration: 'none'}} key={item.id}>
              <Paper p={20} style={{display: 'flex', gap: '30px'}}>
                <Image src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${item.still_path}`} w={100} h={150} alt='' radius='md'/>
                <Flex direction={'column'}>
                  <Flex justify={'space-between'}>
                    <Title
                      c={'black'}
                      order={3}
                    >
                      S{item.season_number}.E{item.episode_number} - {item.name}
                    </Title>
                    <Text c={'gray.6'}>{item.air_date}</Text>
                  </Flex>

                  <Text c={'gray.9'}>{item.overview}</Text>
                  <Flex>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                  <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                </svg>
                  <Text c={'black'}>{item.vote_average}/10 ({item.vote_count})</Text>
                  </Flex>
                </Flex>
              </Paper>
            </Link>
        )}
      </Flex>
    </Flex>
  )
}
