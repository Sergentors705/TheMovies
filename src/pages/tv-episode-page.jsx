import React, { useEffect } from "react";
import useLoading from "../hooks/use-loading";
import requestMaker from "../functions/requestMaker";
import { Link, useParams } from "react-router-dom";
import { Box, Flex, Paper, Title } from "@mantine/core";
import { useState } from "react";

export default function TvEpisodePage() {
  const [episode, setEpisode] = useState(null);
  const {tvShowId, seasonId, episodeId} = useParams();
  const [fetchEpisode, isLoadingEpisode] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}/season/${seasonId}/episode/${episodeId}`, setEpisode))

  useEffect(() => {
    fetchEpisode();
  }, [])
  console.log(episode)
  return (
    <Flex
      maw={1366}
      w={'100%'}
    >
      <Box>
        <Link to={`/tv-show/${tvShowId}`}>Back to {}</Link>
      </Box>
      <Paper
      >
        <Title order={1} fz={'page-title'}>{episode?.name}</Title>
      </Paper>
    </Flex>
  )
}
