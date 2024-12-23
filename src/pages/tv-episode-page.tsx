import { Box, Button, Flex, Image, Modal, Paper, SimpleGrid, Skeleton, Text, Title } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContentRating, useCountries, useTopDetails, useTvEpisode } from "../api";
import Companies from "../components/blocks/companies";
import Posters from "../components/blocks/posters/posters";
import Keywords from "../components/ui/keywords";
import Actors from "../modules/actors";
import TvRecomendations from "../components/blocks/recomendations/recomendations";

export default function TvEpisodePage() {
  const navigate = useNavigate();
  const {tvId, seasonId, episodeId} = useParams();
  const [episode, isLoadingEpisode] = useTvEpisode({id: tvId || '', seasonNumber: Number(seasonId), episodeNumber: Number(episodeId)})
  const [tvShow, isLoadingTvShow] = useTopDetails({creationType: 'tv', id: tvId || ''})
  const [contentRating, isLoadingContentRating] = useContentRating({creationType: 'tv', id: tvId || ''})
  const [countries, isLoadingCountries] = useCountries()
  const [opened, { open, close }] = useDisclosure(false);
  const [path, setPath] = useState('');

  return (
    <>
      <SimpleGrid
          maw='1366px'
          pt={30}
          pb={50}
          style={{flexGrow: '1', gridTemplateColumns: '4fr 1fr'}}
        >
          <Flex
            direction='column'
            gap={30}
            miw={0}
            p={20}
          >
            <Flex gap={30}>
              <Box>
                <Skeleton w={300} h={450} visible={isLoadingEpisode}>
                  <Image
                    w={300}
                    h={450}
                    radius={'md'}
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${episode?.still_path}`}
                    alt=''
                    onClick={() =>{open(); setPath(episode?.still_path || '')}}
                    style={{cursor: 'pointer'}}
                  />
                </Skeleton>
              </Box>
              <div>
                <Box p={20}>
                  <Link to={`/tv/${tvId}`} style={{textDecoration: 'none'}}>
                    <Text fz={'secondaryTitle'} c={'black'}>Back to {tvShow?.name}</Text>
                  </Link>
                </Box>
                <Box>
                  <Skeleton visible={isLoadingEpisode}>
                    <Title order={1} fz={'pageTitle'} lh={'pageTitle'} mb={10}>{episode?.name}</Title>
                  </Skeleton>
                  <Flex gap={20} mb={20}>
                    <Skeleton visible={isLoadingEpisode} w={'fit-content'}>
                      <Text c={'dimmed'}>Episode aired {episode?.air_date}</Text>
                    </Skeleton>
                    <Skeleton visible={isLoadingContentRating} w={'fit-content'}>
                      <Text c={'dimmed'}>{contentRating?.find(item => item.iso_3166_1 === 'US')?.rating}</Text>
                    </Skeleton>
                    <Skeleton visible={isLoadingEpisode} w={'fit-content'}>
                      <Text c={'dimmed'} >{episode?.runtime}m</Text>
                    </Skeleton>
                  </Flex>
                  <Skeleton visible={isLoadingTvShow}>
                    <Text maw={500} mb={10} fs={'italic'} c={'dimmed'}>{tvShow?.tagline}</Text>
                  </Skeleton>
                  <Flex gap={20}>
                  {tvShow?.genres.map(genre =>
                    <Skeleton
                      key={genre.id}
                      visible={isLoadingTvShow}
                      mih={45}
                      miw={100}
                      width='auto'
                    >
                      <Button onClick={() => navigate(`/genre/${genre.id}`)}>{genre.name}</Button>
                    </Skeleton>
                  )}
                  </Flex>
                  <Skeleton visible={isLoadingEpisode}>
                    <Text maw={500}>{episode?.overview}</Text>
                  </Skeleton>
                </Box>
              </div>
            </Flex>

        <Paper
          p={20}
          mb={30}
        >
        {episode?.guest_stars?.length ? <Actors array={episode?.guest_stars}/> : <></>}

        </Paper>
            {/* <Crew creature='tv' /> */}
            <Posters creature='tv' />
          </Flex>
          {/* SECOND COLUMN */}
          <Box p={20}>
            {/* RATING SECTION */}
            <Box>
              <Title order={2} fz={'sectionTitle'}>Details</Title>
              <Box>
                <Title order={3}>Country of origin</Title>
                <Skeleton visible={isLoadingTvShow && isLoadingCountries}>
                  <Text c={'gray.9'}>{tvShow && countries?.find(item => item.iso_3166_1 === tvShow?.origin_country[0])?.english_name}</Text>
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
              {episode?.homepage &&
              <Box>
                <Title order={3} mb={10}>Official site</Title>
                <Skeleton visible={isLoadingEpisode}>
                  <Link
                    to={episode?.homepage}
                  >Link</Link>
                </Skeleton>
              </Box>
}
            </Box>
            <Companies creationType='tv' companies={tvShow?.production_companies} />
            <Keywords creationType='tv' />
            <TvRecomendations creationType='tv' />
          </Box>
        </SimpleGrid>
        <Modal opened={opened} onClose={close} fullScreen children={<Image w='100%' h='90vh' fit='contain' src={`https://www.themoviedb.org/t/p/original/${path}`} />}/>
    </>
  )
}
