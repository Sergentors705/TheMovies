import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Box, Button, Flex, Image, List, Modal, NumberFormatter, Paper, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Posters from '../../components/blocks/posters/posters.jsx';
import Keywords from '../../components/ui/keywords.jsx';
import requestMaker from '../../functions/requestMaker.js';
import useLoading from '../../hooks/use-loading.jsx';
import Crew from '../../modules/crew/crew.jsx';
import Companies from '../../components/blocks/companies.jsx';
import TvRecomendations from '../tv-recomendations.jsx';

export default function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [similar, setSimilar] = useState(null)
  const [recomendations, setRecomendations] = useState(null)
  const [releaseDate, setReleaseDate] = useState(null);
  const [credits, setCredits] = useState(null);
  const [director, setDirector] = useState([]);
  const [writter, setWritter] = useState([]);
  const {movieId} = useParams();
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const [opened, { open, close }] = useDisclosure(false);
  const [path, setPath] = useState('');
  const navigate = useNavigate();

  const [fetchMovies, isLoadingMovies] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}`, setMovie))
  const [fetchReleaseDates, isLoadingReleaseDates] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`,setReleaseDate))
  const [fetchVideos, isLoadingVideos] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}/videos`, setVideos))
  const [fetchCredits, isLoadingCredits] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}/credits`, setCredits))

  useEffect(() => {
    fetchMovies();
    fetchVideos();
    fetchReleaseDates();
    fetchCredits();
    requestMaker(`https://api.themoviedb.org/3/movie/${movieId}/similar`, setSimilar);
    requestMaker(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, setRecomendations)
  }, [movieId])

  useEffect(() => {
    setDirector(credits?.crew.filter(item => item.job === 'Director'))
    setWritter(credits?.crew.filter(item => item.known_for_department === 'Writing'))
  }, [credits]);

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
            <Skeleton visible={isLoadingMovies} height={450} width={300}>
              <Image
                w={300}
                h={450}
                radius="md"
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}
                onClick={() =>{open(); setPath(movie?.poster_path)}}
                alt=''
                style={{cursor: 'pointer'}}
              />
            </Skeleton>
            <div>
              <Skeleton
                visible={isLoadingMovies}
                mih={60}
                miw={300}
                mb={10}
              >
                <Title order={1} fz={48}>{movie?.title}</Title>
              </Skeleton>
              <ul className='movie-page__title-info-list'>
                <li className='movie-page__title-info-item'>
                  <Skeleton
                    visible={isLoadingMovies}
                    mih={20}
                    miw={50}
                  >
                    <Text c={'dimmed'}>
                      {new Date(movie?.release_date)?.getFullYear()}
                    </Text>
                  </Skeleton>
                </li>
                <li className='movie-page__title-info-item'>
                  <Skeleton
                    visible={isLoadingMovies}
                    mih={20}
                    miw={50}
                  >
                    <Text c={'dimmed'}>
                      {releaseDate?.results.find(item => item.iso_3166_1 === 'US')?.release_dates.find(item => item.type === 3)?.certification}
                    </Text>
                  </Skeleton>
                </li>
                <li className='movie-page__title-info-item'>
                  <Skeleton
                    visible={isLoadingMovies}
                    height={20}
                    miw={50}
                  >
                    <Text c={'dimmed'}>
                      {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
                    </Text>
                  </Skeleton>
                </li>
              </ul>
              <Skeleton
                visible={isLoadingMovies}
                mih={30}
                width='50%'
                mb={8}
              >
                <p className='movie-page__tagline'>{movie?.tagline}</p>
              </Skeleton>
              <div className='genres'>
                {
                  movie?.genres.map(genre =>
                    <Skeleton
                      key={genre.id}
                      visible={isLoadingMovies}
                      mih={45}
                      miw={100}
                      width='auto'
                    >
                      <Button
                        key={genre.id}
                        onClick={() => navigate(`/movie/genre/${genre.id}`)}
                      >{genre.name}</Button>
                    </Skeleton>
                  )}
              </div>
              <Skeleton visible={isLoadingMovies} mih={8} miw='70%'>
                <p className='movie-page__overview'>{movie?.overview}</p>
              </Skeleton>
              <Skeleton visible={isLoadingCredits} mih={16} width='70%'>
                <Text>{(director?.length > 1) ? `Director's: ` : 'Director: ' }{director?.map(item => <Link to={`/person/${item.id}`}>{item.name}</Link>)}</Text>
                <Text>{(writter?.length > 1) ? `Writter's: ` : 'Writter: ' }{writter?.map(item => <Link to={`/person/${item.id}`}>{item.name}</Link>)}</Text>
              </Skeleton>
            </div>
          </Flex>
          <Title order={2} fz={32}>Top cast</Title>
          <Crew creature='movie'/>
          <Posters creature='movie' />

          {/* SIMILAR SECTION */}

          <Title mb={10}>Similar movies</Title>
          <Carousel
            dragFree
            slideSize='25%'
            align='start'
            slideGap='md'
            containScroll='trimSnaps'
          >
            {similar?.results?.slice(0,9).map((item) =>
              <Carousel.Slide
                key={item.id}
                flex
                align='center'
                mb={40}
              >
                <Link
                  to={`/movie/${item.id}`}
                  style={{textDecoration: 'none'}}
                >
                  <Paper
                    h='100%'
                    withBorder
                    shadow='lg'
                    p='sm'
                  >
                    <Skeleton
                      visible={isLoadingMovies}
                      mih={130}
                      miw={150}
                      mb={10}
                    >
                      <Image
                        w='100%'
                        h='auto'
                        fit='contain'
                        radius='md'
                        src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${item.poster_path}`}
                      />
                    </Skeleton>
                    <Skeleton
                      visible={isLoadingMovies}
                      mih={20}
                      mb={6}
                    >
                      <Title order={3} c={'black'}>{item.title}</Title>
                    </Skeleton>
                  </Paper>
                </Link>
              </Carousel.Slide>
            )}
          </Carousel>
        </Flex>
        <Box p={20}>
          <Box mb={15}>
            <Skeleton visible={isLoadingMovies} mih={28}>
              <Title order={3}>The Movie Rating</Title>
            </Skeleton>
            <Box>
              <Skeleton
                visible={isLoadingMovies}
                height={28}
              >
                <Flex>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                  </svg>
                  {movie?.vote_average.toFixed(1)}/10
                </Flex>
              </Skeleton>
              <Skeleton
                visible={isLoadingMovies}
                mih={10}
              >
                <Text>{movie?.vote_count} Votes</Text>
              </Skeleton>
            </Box>
          </Box>
          <Box mb={15}>
            <Skeleton
              mih={10}
              visible={isLoadingMovies}
            >
              <Title order={3}>Budget</Title>
            </Skeleton>
            <Skeleton
              mih={10}
              visible={isLoadingMovies}
            >
              <NumberFormatter prefix='$'value={movie?.budget} thousandSeparator/>
            </Skeleton>
          </Box>
          <Box mb={15}>
            <Skeleton
              mih={10}
              visible={isLoadingMovies}
            >
              <Title order={3}>Revenue</Title>
            </Skeleton>
            <Skeleton
              mih={10}
              visible={isLoadingMovies}
            >
              <NumberFormatter prefix='$'value={movie?.revenue} thousandSeparator/>
            </Skeleton>
          </Box>
          <Companies companies={movie?.production_companies} creationType='movie' />
          <Keywords creationType='movie'/>
          <TvRecomendations creationType='movie' />
        </Box>
      </SimpleGrid>
      <Modal opened={opened} onClose={close} fullScreen children={<Image w='100%' h='90vh' fit='contain' position='center' src={`https://www.themoviedb.org/t/p/original/${path}`} />}/>
    </>
  )
}
