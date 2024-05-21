import React, { useEffect } from "react";
import useLoading from "../hooks/use-loading";
import requestMaker from "../functions/requestMaker";
import { Link, useParams } from "react-router-dom";
import { Box, Flex, Image, Paper, Skeleton, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function TvEpisodePage() {
  const {tvShowId, seasonId, episodeId} = useParams();
  const [episode, setEpisode] = useState(null);
  const [tvShow, setTvShow] = useState(null);
  const [fetchEpisode, isLoadingEpisode] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}/season/${seasonId}/episode/${episodeId}`, setEpisode));
  const [fetchTvShow, isLoadingTvShow] = useLoading(async() => requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}`, setTvShow));

  useEffect(() => {
    fetchEpisode();
    fetchTvShow();
  }, [])
  console.log(episode)
  return (
    <Flex
      pt={50}
      pb={50}
      direction={'column'}
      maw={1366}
      w={'100%'}
    >
      <Box p={20}>
        <Link to={`/tv-show/${tvShowId}`} style={{textDecoration: 'none'}}>
        <Text fz={'sectionTitle'} c={'black'}>Back to {tvShow?.name}</Text>
        </Link>
      </Box>
      <Flex>
        <Skeleton visible={isLoadingEpisode}>
          <Image w={300} h={450} radius={'md'} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${episode?.still_path}`} alt='' />
        </Skeleton>
      </Flex>
      <Paper
        p={20}
      >
        <Skeleton visible={isLoadingEpisode}>
          <Title order={1} fz={'page-title'}>{episode?.name}</Title>
        </Skeleton>

      </Paper>
    </Flex>
  )
}
