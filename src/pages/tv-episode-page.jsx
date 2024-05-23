import { Box, Button, Flex, Image, List, Modal, Paper, SimpleGrid, Skeleton, Text, Title } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import requestMaker from "../functions/requestMaker";
import useLoading from "../hooks/use-loading";
import Actors from "../modules/actors";

export default function TvEpisodePage() {
  const navigate = useNavigate();
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
  console.log(tvShow)
  console.log('episode', episode)
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
              <Title order={1} fz={'pageTitle'} lh={'pageTitle'} mb={10}>{episode?.name}</Title>
            </Skeleton>
            <Flex gap={20} mb={20}>
              <Skeleton visible={isLoadingEpisode}>
                <Text c={'dimmed'}>Episode aired {episode?.air_date}</Text>
              </Skeleton>
              <Skeleton visible={isLoadingRating}>
                <Text c={'dimmed'}>{contentRating?.results?.find(item => item.iso_3166_1 === 'US').rating}</Text>
              </Skeleton>
              <Skeleton visible={isLoadingEpisode}>
                <Text c={'dimmed'} >{episode?.runtime}m</Text>
              </Skeleton>
            </Flex>
            <Skeleton visible={isLoadingTvShow}>
              <Text maw={500} mb={10} fs={'italic'} c={'dimmed'}>{tvShow?.tagline}</Text>
            </Skeleton>
            <Box>
            {
                  tvShow?.genres.map(genre =>
                    <Skeleton
                      key={genre.id}
                      visible={isLoadingTvShow}
                      mih={45}
                      miw={100}
                      width='auto'
                    >
                      <Button
                        key={genre.id}
                        onClick={() => navigate(`/genre/${genre.id}`)}
                      >{genre.name}</Button>
                    </Skeleton>
                  )}
            </Box>
            <Skeleton visible={isLoadingEpisode}>
              <Text maw={500}>{episode?.overview}</Text>
            </Skeleton>
          </Box>
          {/* Additional info section */}
          <Box
            px={20}
            style={{display: 'flex', flexDirection: 'column', gap: '15px'}}
          >
            <Title order={2} fz={'sectionTitle'}>Details</Title>
            <Box>
              <Title order={3}>Country of origin</Title>
              <Skeleton visible={isLoadingTvShow}>
                <Text c={'gray.9'}>{countries?.find(item => item.iso_3166_1 === tvShow?.origin_country[0])?.english_name}</Text>
              </Skeleton>
            </Box>
            <Box>
              <Title order={3}>Status</Title>
              <Skeleton visible={isLoadingTvShow}>
                <Text c={'gray.9'}>{tvShow?.status}</Text>
              </Skeleton>
            </Box>
            <Box>
              <Title order={3}>The Movie Rating</Title>
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
            <Box>
              <Title order={3} mb={10}>Production</Title>
              <List listStyleType='none'>
                {tvShow?.production_companies.map((item) =>
                  <List.Item key={item.id}>
                    <Link to={`/companie/${item.id}`}>
                      {
                        item.logo_path
                        ? <Image w={200} h={'auto'} src={`https://image.tmdb.org/t/p/h60/${item.logo_path}`} mb={10} alt=''/>
                        : <Text size='xl' c={'black'} mb={10}>{item.name}</Text>
                      }

                    </Link>
                  </List.Item>
                )}
              </List>
            </Box>
          </Box>
        </SimpleGrid>
        <Paper
          p={20}
        >
        {episode?.guest_stars.length ? <Actors array={episode?.guest_stars}/> : <></>}

        </Paper>
      </Flex>
      <Modal opened={opened} onClose={close} fullScreen children={<Image w='100%' h='90vh' fit='contain' position='center' src={`https://www.themoviedb.org/t/p/original/${episode?.still_path}`} />}/>
    </>
  )
}
