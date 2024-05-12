import { Flex, Image, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import requestMaker from '../functions/requestMaker';
import useLoading from '../hooks/use-loading';


export default function TvSeasonPage() {
  const {tvShowId, seasonId} = useParams();
  const [tvSeason, setTvSeason] = useState(null);
  const [fetchSeason, isLoadingTvSeason] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}/season/${seasonId}`, setTvSeason));
  const theme = useMantineTheme();
  useEffect(()=>{
    fetchSeason();
  },[])
  console.log(tvSeason)
  return (
    <Flex
      maw={1366}
      direction={'column'}
      pt={50}
    >
      <Title
        order={1}
        mb={50}
      >{tvSeason?.name}</Title>
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
                </Flex>
              </Paper>
            </Link>
        )}
      </Flex>
    </Flex>
  )
}
