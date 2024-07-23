import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Box, Button, Flex, Image, Modal, Paper, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import requestMaker from '../functions/requestMaker';
import useLoading from '../hooks/use-loading';
import TvRecomendations from './tv-recomendations';
import Crew from '../modules/crew/crew';
import Posters from '../components/blocks/posters/posters';

export default function TvShowPage() {
  const {tvId} = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [crew, setCrew] = useState(null);
  const [path, setPath] = useState('');
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const navigate = useNavigate();
  const [contentRating, setContentRating] = useState(null);
  const [fetchContentRating, isLoadingContentRating] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvId}}/content_ratings`, setContentRating));
  const [opened, { open, close }] = useDisclosure(false);
  const [posters, setPosters] = useState([]);
  const [starring, setStarring] = useState([]);
  const [fetchTvShow, isLoadingTvShow] = useLoading(async() => requestMaker(`https://api.themoviedb.org/3/tv/${tvId}`, setTvShow));
  const [fetchImages, isLoadingImages] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvId}/images`, setPosters));
  const [fetchTvShowCredits, isLoadingTvshowCredits] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/tv/${tvId}/credits`, setCrew));

  useEffect(() => {
    fetchTvShow();
    fetchImages();
    fetchTvShowCredits();
    fetchContentRating();
  }, [tvId])

  useEffect(() => setStarring(crew?.cast.slice(0, 9)), [crew]);

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
            <div>
              <Skeleton visible={isLoadingTvShow} height={450}>
              <Image
                w={300}
                h={450}
                radius="md"
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${tvShow?.poster_path}`}
                onClick={() =>{open(); setPath(tvShow?.poster_path)}}
                alt=''
                style={{cursor: 'pointer'}}
              />
              </Skeleton>
            </div>
            <div>
              <Skeleton
                visible={isLoadingTvShow}
                mih={60}
                miw={300}
                mb={10}
              >
                <Title order={1} fz={'pageTitle'}>{tvShow?.name}</Title>
              </Skeleton>
              <ul className='movie-page__title-info-list'>
                <li className='movie-page__title-info-item'>
                  <Skeleton
                    visible={isLoadingTvShow}
                    mih={20}
                    miw={50}
                  >
                    <Text c='dimmed'>
                      {new Date(tvShow?.first_air_date)?.getFullYear()}
                      -
                      {new Date(tvShow?.last_air_date)?.getFullYear()}
                    </Text>
                  </Skeleton>
                </li>
                <li className='movie-page__title-info-item'>
                  <Skeleton
                    visible={isLoadingContentRating}
                    height={20}
                    width={50}
                  >
                    <Text c='dimmed'>
                      {contentRating?.results?.find(item => item.iso_3166_1 === 'US')?.rating}
                    </Text>
                  </Skeleton>
                </li>
                <li className='movie-page__title-info-item'>
                  <Skeleton
                    visible={isLoadingTvShow}
                    height={20}
                    miw={50}
                  >
                    {
                      tvShow?.episode_run_time.length
                      ? <Text c={'dimmed'}>
                        {tvShow?.episode_run_time?.join('m, ')}m
                      </Text>
                      : <></>
                    }
                  </Skeleton>
                </li>
              </ul>
              <Skeleton
                visible={isLoadingTvShow}
                width='50%'
                mb={8}
              >
                <p className='movie-page__tagline'>{tvShow?.tagline}</p>
              </Skeleton>
              <div className='genres'>
                {
                  tvShow?.genres.map(genre => {
                    return (
                      <Skeleton
                        key={genre.id}
                        visible={isLoadingTvShow}
                        mih={45}
                        miw={100}
                        width='auto'
                      >
                        <Button
                              key={genre.id}
                              onClick={() => navigate(`/tv/genre/${genre.id}`)}
                            >{genre.name}</Button>
                      </Skeleton>
                  )})
                }
              </div>
              <Skeleton visible={isLoadingTvShow} width='70%'>
                <p className='movie-page__overview'>{tvShow?.overview}</p>
              </Skeleton>
            </div>
          </Flex>
          <Crew creature='tv' />

          {/* Seasons section */}
          <Flex
            mb={50}
            direction={'column'}
            gap={20}
          >
            {
              tvShow?.seasons?.map(item =>
                <Link to={`tv-season/${item.season_number}`} style={{textDecoration: 'none'}} key={item.id}>
                  <Paper
                    p={30}
                    withBorder
                    shadow='lg'
                    style={{display: 'flex', gap: '20px'}}
                  >
                    <Image src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${item.poster_path}`} w={100} h={150} alt='' radius='md'/>
                    <Box>
                      <Title order={3} c={'black'}>{item.name}</Title>
                      <Text c={'gray.9'}>{item.overview}</Text>
                    </Box>
                  </Paper>
                </Link>
              )
            }
          </Flex>
          <Posters creature='tv' />
        </Flex>
        {/* SECOND COLUMN */}
        <Box>
          {/* RATING SECTION */}
          <Box>
            <div className='movie-page__rating'>
              <Skeleton visible={isLoadingTvShow} height={28} mb={15}>
                <p className='movie-page__rating-title'>The Movie Rating</p>
              </Skeleton>
              <div className='movie-page__rating-container'>
                <Skeleton
                  visible={isLoadingTvShow}
                  height={28}
                  mb={15}
                >
                  <p className='movie-page__rating-value'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                      <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                    </svg>
                    {tvShow?.vote_average.toFixed(1)}/10
                  </p>
                </Skeleton>
                <Skeleton
                  visible={isLoadingTvShow}
                  height={25}
                >
                  <p className='movie-page__rating-count'>{tvShow?.vote_count} Votes</p>
                </Skeleton>
              </div>
            </div>
            <div className='movie-page__cash'>
              <Skeleton
                height={10}
                visible={isLoadingTvShow}
                mt={6}
              >
                <p className='movie-page__cash-title'>Status</p>
              </Skeleton>
              <Skeleton
                height={10}
                visible={isLoadingTvShow}
                mt={6}
              >
                <p className='movie-page__cash-value'>{tvShow?.status}</p>
              </Skeleton>
              <Skeleton
                height={10}
                visible={isLoadingTvShow}
                mt={6}
              >
                <p className='movie-page__cash-value'>${tvShow?.revenue}</p>
              </Skeleton>
            </div>
          </Box>
          <TvRecomendations />
        </Box>
      </SimpleGrid>
      <Modal opened={opened} onClose={close} size='75%' children={Image}>
        <Image w='100%' h='auto' fit='cover' position='center' src={`https://www.themoviedb.org/t/p/original/${path}`} />
      </Modal>
    </>
  )
}
