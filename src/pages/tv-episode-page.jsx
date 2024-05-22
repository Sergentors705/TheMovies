import { Box, Flex, Image, Modal, Paper, SimpleGrid, Skeleton, Text, Title } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import requestMaker from "../functions/requestMaker";
import useLoading from "../hooks/use-loading";

export default function TvEpisodePage() {
  const {tvShowId, seasonId, episodeId} = useParams();
  const [episode, setEpisode] = useState(null);
  const [tvShow, setTvShow] = useState(null);
  const [contentRating, setRating] = useState(null);
  const [countries, setCountries] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [fetchCountries, isLoadingCountries] = useLoading(async () => requestMaker('https://api.themoviedb.org/3/configuration/countries?language=en-US', setCountries));
  const [fetchRating, isLoadingRating] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}/content_ratings`, setRating));
  const [fetchEpisode, isLoadingEpisode] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}/season/${seasonId}/episode/${episodeId}`, setEpisode));
  const [fetchTvShow, isLoadingTvShow] = useLoading(async() => requestMaker(`https://api.themoviedb.org/3/tv/${tvShowId}`, setTvShow));

  useEffect(() => {
    fetchEpisode();
    fetchTvShow();
    fetchRating();
    fetchCountries();
  }, [])
  console.log(episode)
  console.log(tvShow)
  return (
    <>
      <Flex
        pb={50}
        direction={'column'}
        maw={1366}
        w={'100%'}
      >
        <Box p={20}>
          <Link to={`/tv-show/${tvShowId}`} style={{textDecoration: 'none'}}>
          <Text fz={'secondaryTitle'} c={'black'}>Back to {tvShow?.name}</Text>
          </Link>
        </Box>
        <SimpleGrid style={{gridTemplateColumns: '300px 1fr max-content', gap: '30px'}}>
          <Skeleton w={300} h={450} visible={isLoadingEpisode}>
            <Image w={300} h={450} radius={'md'} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${episode?.still_path}`} alt='' onClick={() =>{open(); }}/>
          </Skeleton>
          <Box>
            <Skeleton visible={isLoadingEpisode}>
              <Title order={1} fz={'page-title'}>{episode?.name}</Title>
            </Skeleton>
            <Flex gap={20} justify={'flex-start'} mb={20}>
              <Skeleton visible={isLoadingEpisode}>
                <Text c={'gray.9'}>Episode aired {episode?.air_date}</Text>
              </Skeleton>
              <Skeleton visible={isLoadingRating}>
                <Text c={'gray.9'}>{contentRating?.results?.find(item => item.iso_3166_1 === 'US').rating}</Text>
              </Skeleton>
              <Skeleton visible={isLoadingEpisode}>
                <Text c={'gray.9'} >{episode?.runtime}m</Text>
              </Skeleton>
            </Flex>
            <Skeleton visible={isLoadingEpisode}>
              <Text maw={500}>{episode?.overview}</Text>
            </Skeleton>
          </Box>
          {/* Additional info section */}
          <Paper
            withBorder
            shadow={'md'}
            px={20}
            style={{display: 'flex', flexDirection: 'column', gap: '10px'}}
          >
            <Title order={2} fz={'sectionTitle'}>Details</Title>
            <Box>
              <Skeleton visible={isLoadingEpisode}>
                <Title order={3}>Country of origin</Title>
              </Skeleton>
              <Skeleton visible={isLoadingTvShow}>
                <Text c={'gray.9'}>{countries?.find(item => item.iso_3166_1 === tvShow?.origin_country[0])?.english_name}</Text>
              </Skeleton>
            </Box>
            <Box>
              <Skeleton visible={isLoadingEpisode}>
                <Title order={3}>Status</Title>
              </Skeleton>
              <Skeleton visible={isLoadingTvShow}>
                <Text c={'gray.9'}>{tvShow?.status}</Text>
              </Skeleton>
            </Box>
            <Box>
              <Skeleton visible={isLoadingEpisode}>
                <Title order={3}>The Movie Rating</Title>
              </Skeleton>
              <Skeleton visible={isLoadingEpisode}>
                <Flex>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                  </svg>
                  <Text c={'gray.9'}>{episode?.vote_average}/10</Text>
                </Flex>
                <Text c={'gray.9'}>{episode?.vote_count} votes</Text>
              </Skeleton>
            </Box>
          </Paper>
        </SimpleGrid>
        <Paper
          p={20}
        >

        </Paper>
      </Flex>
      <Modal opened={opened} onClose={close} fullScreen children={<Image w='100%' h='90vh' fit='contain' position='center' src={`https://www.themoviedb.org/t/p/original/${episode?.still_path}`} />}/>
    </>
  )
}
