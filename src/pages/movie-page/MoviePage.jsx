import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Flex, Image, Modal, SimpleGrid, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryButton from '../../components/ui/button/button.jsx';
import useLoading from '../../hooks/use-loading.jsx';
import Crew from '../../modules/crew/crew.jsx';

export default function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const {movieId} = useParams();
  const [posters, setPosters] = useState([]);
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const [opened, { open, close }] = useDisclosure(false);
  const [path, setPath] = useState('');

  const [fetchMovies, isLoadingMovies] = useLoading(async () => {
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
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
      .then((object) => {setMovie(object)})
  })

  const [fetchReleaseDates, isLoadingReleaseDates] = useLoading(async () => {
      await fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, {
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
        .then((object) => setReleaseDate(object));
  })

  const [fetchImages, isLoadingImages] = useLoading(async () => {
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
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

  useEffect(() => {
    fetchMovies();
    fetchImages();
    fetchReleaseDates();
  }, [])

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
          <Skeleton visible={isLoadingMovies} height={450}>
          <Image
            w={300}
            h={450}
            radius="md"
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}
          />
          </Skeleton>
        </div>
        <div>
          <Skeleton
            visible={isLoadingMovies}
            mih={60}
            miw={300}
            mb={10}
          >
            <h2 className='movie-page__title'>{movie?.title}</h2>
          </Skeleton>
          <ul className='movie-page__title-info-list'>
            <li className='movie-page__title-info-item'>
              <Skeleton
                visible={isLoadingMovies}
                height={20}
                width={50}
              >
                <Text>
                  {new Date(movie?.release_date)?.getFullYear()}
                </Text>
              </Skeleton>
            </li>
            <li className='movie-page__title-info-item'>
              <Skeleton
                visible={isLoadingMovies}
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
                visible={isLoadingMovies}
                height={20}
                miw={50}
              >
                <Text>
                  {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
                </Text>
              </Skeleton>
            </li>
          </ul>
          <Skeleton
            visible={isLoadingMovies}
            height={30}
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
                  height={45}
                  miw={100}
                  width='auto'
                >
                  <PrimaryButton text={genre.name} classname='button-primary--yellow' key={genre.id}/>
                </Skeleton>
              )}
          </div>
          <Skeleton visible={isLoadingMovies} height={8} width='70%'>
            <p className='movie-page__overview'>{movie?.overview}</p>
          </Skeleton>
          <Skeleton visible={isLoadingMovies} height={8} mt={6} width='70%'></Skeleton>
          <Skeleton visible={isLoadingMovies} height={8} mt={6} width='70%'></Skeleton>
          <Skeleton visible={isLoadingMovies} height={8} mt={6} width='70%'></Skeleton>
          <Skeleton visible={isLoadingMovies} height={8} mt={6} width='70%'></Skeleton>
          <Skeleton visible={isLoadingMovies} height={8} mt={6} width='70%'></Skeleton>
          <Skeleton visible={isLoadingMovies} height={8} mt={6} width='70%'></Skeleton>
          <Skeleton visible={isLoadingMovies} height={8} mt={6} width='70%'></Skeleton>

        </div>
        <div>
          <div className='movie-page__rating'>
            <Skeleton visible={isLoadingMovies} height={28} mb={15}>
              <p className='movie-page__rating-title'>The Movie Rating</p>
            </Skeleton>
            <div className='movie-page__rating-container'>
              <Skeleton
                visible={isLoadingMovies}
                height={28}
                mb={15}
              >
                <p className='movie-page__rating-value'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                  </svg>
                  {movie?.vote_average.toFixed(1)}/10
                </p>
              </Skeleton>
              <Skeleton
                visible={isLoadingMovies}
                height={25}
              >
                <p className='movie-page__rating-count'>{movie?.vote_count} Votes</p>
              </Skeleton>
            </div>
          </div>
          <div className='movie-page__cash'>
            <Skeleton
              height={10}
              visible={isLoadingMovies}
              mt={6}
            >
              <p className='movie-page__cash-title'>Budget</p>
            </Skeleton>
            <Skeleton
              height={10}
              visible={isLoadingMovies}
              mt={6}
            >
              <p className='movie-page__cash-value'>${movie?.budget}</p>
            </Skeleton>
            <Skeleton
              height={10}
              visible={isLoadingMovies}
              mt={6}
            >
              <p className='movie-page__cash-title'>Revenue</p>
            </Skeleton>
            <Skeleton
              height={10}
              visible={isLoadingMovies}
              mt={6}
            >
              <p className='movie-page__cash-value'>${movie?.revenue}</p>
            </Skeleton>
          </div>
        </div>
      </SimpleGrid>
      <Crew movieId={movieId} />
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
