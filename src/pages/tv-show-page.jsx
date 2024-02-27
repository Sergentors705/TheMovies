import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Flex, Image, Modal, Paper, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryButton from '../components/ui/button/button';
import useLoading from '../hooks/use-loading';

export default function TvShowPage() {
  const {tvShowId} = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [crew, setCrew] = useState(null);
  const [path, setPath] = useState('');
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const navigate = useNavigate();
  const [releaseDate, setReleaseDate] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [posters, setPosters] = useState([]);
  const [starring, setStarring] = useState([]);

  const [fetchTvShow, isLoadingTvShow] = useLoading(async() => {
    await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMzZmZiMGJiZDYyMmYxNWEyYzk2ZGI1N2JiNDk5NSIsInN1YiI6IjY1NjYwNGY3ZDk1NDIwMDBmZTMzNDBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_uOQGwm3MJDqxGnJSkPjAXSlGfO6jJU2UbB7GWADc",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((object) => {setTvShow(object);console.log(object)})
  })

  const [fetchImages, isLoadingImages] = useLoading(async () => {
    await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}/images`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMzZmZiMGJiZDYyMmYxNWEyYzk2ZGI1N2JiNDk5NSIsInN1YiI6IjY1NjYwNGY3ZDk1NDIwMDBmZTMzNDBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_uOQGwm3MJDqxGnJSkPjAXSlGfO6jJU2UbB7GWADc",
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((object) => {
            setPosters(object.backdrops);
          });
  })

  const [fetchTvShowCredits, isLoadingTvshowCredits] = useLoading(
    async () => {
      await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}/credits`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMzZmZiMGJiZDYyMmYxNWEyYzk2ZGI1N2JiNDk5NSIsInN1YiI6IjY1NjYwNGY3ZDk1NDIwMDBmZTMzNDBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_uOQGwm3MJDqxGnJSkPjAXSlGfO6jJU2UbB7GWADc",
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((object) => {
          setCrew(object);
          console.log(object);
        });
    }
  )

  useEffect(() => {
    fetchTvShow();
    fetchImages();
    fetchTvShowCredits();
  }, [])

  useEffect(() => setStarring(crew?.cast.slice(0, 9)), [crew]);

  return (
    <Flex
    maw='1366px'
    pt={30}
    pb={50}
    direction='column'
    style={{flexGrow: '1'}}
  >
    <SimpleGrid
      style={{gridTemplateColumns: '300px 1fr max-content'}}
    >
      <div>
        <Skeleton visible={isLoadingTvShow} height={450}>
        <Image
          w={300}
          h={450}
          radius="md"
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${tvShow?.poster_path}`}
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
          <h2 className='movie-page__title'>{tvShow?.name}</h2>
        </Skeleton>
        <ul className='movie-page__title-info-list'>
          <li className='movie-page__title-info-item'>
            <Skeleton
              visible={isLoadingTvShow}
              mih={20}
              miw={50}
            >
              <Text>
                {new Date(tvShow?.first_air_date)?.getFullYear()}
                -
                {new Date(tvShow?.last_air_date)?.getFullYear()}
              </Text>
            </Skeleton>
          </li>
          <li className='movie-page__title-info-item'>
            <Skeleton
              visible={isLoadingTvShow}
              height={20}
              width={50}
            >
              <Text>
                {releaseDate?.results.find(item => item.iso_3166_1 === 'US')?.release_dates.find(item => item.type === 3)?.certification}
              </Text>
            </Skeleton>
          </li>
          <li className='movie-page__title-info-item'>
            <Skeleton
              visible={isLoadingTvShow}
              height={20}
              miw={50}
            >
              <Text>
                {tvShow?.episode_run_time}m
              </Text>
            </Skeleton>
          </li>
        </ul>
        <Skeleton
          visible={isLoadingTvShow}
          height={30}
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
                  height={45}
                  miw={100}
                  width='auto'
                >
                  <PrimaryButton text={genre.name} classname='button-primary--yellow' key={genre.id}/>
                </Skeleton>
            )})
          }
        </div>
        <Skeleton visible={isLoadingTvShow} height={8} width='70%'>
          <p className='movie-page__overview'>{tvShow?.overview}</p>
        </Skeleton>
        <Skeleton visible={isLoadingTvShow} height={8} mt={6} width='70%'></Skeleton>
        <Skeleton visible={isLoadingTvShow} height={8} mt={6} width='70%'></Skeleton>
        <Skeleton visible={isLoadingTvShow} height={8} mt={6} width='70%'></Skeleton>
        <Skeleton visible={isLoadingTvShow} height={8} mt={6} width='70%'></Skeleton>
        <Skeleton visible={isLoadingTvShow} height={8} mt={6} width='70%'></Skeleton>
        <Skeleton visible={isLoadingTvShow} height={8} mt={6} width='70%'></Skeleton>
        <Skeleton visible={isLoadingTvShow} height={8} mt={6} width='70%'></Skeleton>

      </div>
      <div>
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
            <p className='movie-page__cash-title'>Revenue</p>
          </Skeleton>
          <Skeleton
            height={10}
            visible={isLoadingTvShow}
            mt={6}
          >
            <p className='movie-page__cash-value'>${tvShow?.revenue}</p>
          </Skeleton>
        </div>
      </div>
    </SimpleGrid>
        <Carousel
          slideSize='20%'
          align='start'
          slideGap='md'
          containScroll='trimSnaps'
        >
          {
            starring?.map( item =>
              <CarouselSlide
                key={item.id}
                flex
                align='center'
                onClick={() => navigate(`/person/${item.id}`)}
              >
                <Paper
                  h='100%'
                  shadow='xs'
                  p='md'
                >
                  <Skeleton
                    visible={isLoadingTvshowCredits}
                    mih={225}
                    miw={150}
                    mb={10}
                  >
                    <Image
                      w={150}
                      h={225}
                      radius='md'
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
                    />
                  </Skeleton>
                  <Skeleton
                    visible={isLoadingTvshowCredits}
                    mih={20}
                    mb={6}
                  >
                    <Title order={3}>{item.name}</Title>
                  </Skeleton>
                  <Skeleton
                    visible={isLoadingTvshowCredits}
                    mih={20}
                    mb={6}
                  >
                    <Text size='md'>{item.character}</Text>
                  </Skeleton>
                </Paper>
              </CarouselSlide>
          )}
        </Carousel>
    <Carousel
      getEmblaApi={setEmbla}
      dragFree
      height='min-content'
      slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
      slideGap={{ base: 0, sm: 'md' }}
      align="start"
      slidesToScroll={1}
      controlSize={40}
      containScroll='trimSnaps'
    >
      {posters?.map((item) =>
        <Carousel.Slide key={item.file_path}>
          <Skeleton visible={isLoadingImages} height={300}>
            <Image w='100%' h='auto' fit='cover' position='center' src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${item.file_path}`}
              onClick={() =>{open(); setPath(item.file_path)}}
            />
          </Skeleton>
        </Carousel.Slide>
      )}
    </Carousel>
    <Modal opened={opened} onClose={close} size='75%'>
      <Image w='100%' h='auto' fit='cover' position='center' src={`https://www.themoviedb.org/t/p/original/${path}`} />
    </Modal>
  </Flex>
  )
}
