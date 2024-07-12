import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import { Box, Image, Paper, Skeleton, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PrimaryButton from '../../components/ui/button/button';
import requestMaker from '../../functions/requestMaker';
import useLoading from '../../hooks/use-loading';

export default function Crew({creature}) {
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState(null);
  const [producer, setProducer] = useState(null);
  const [credits2, setCredits2] = useState(null);
  const [starring, setStarring] = useState([]);
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const {movieId, tvId} = useParams()
  const navigate = useNavigate();

  const [fetchMovies, isLoadingMovies] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creature}/${movieId || tvId}`, setMovie))
  const [fetchCredits2, isLoadingCredits2] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creature}/${movieId || tvId}/credits`, setCredits2))

  useEffect(() => {
    fetchMovies();
    fetchCredits2();
  }, [movieId])
  useEffect(() => setStarring(credits2?.cast.slice(0, 9)), [credits2]);

  return (
    <Box>
        <Carousel
          getEmblaApi={setEmbla}
          dragFree
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
                mb={30}
                align='center'
              >
                <Paper
                  h='100%'
                  withBorder
                  shadow='md'
                  p='md'
                >
                  <Link to={`/person/${item.id}`} style={{textDecoration: 'none'}}>
                    <Skeleton
                      visible={isLoadingCredits2}
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
                      visible={isLoadingCredits2}
                      mih={20}
                      mb={6}
                    >
                      <Title order={3} c='black'>{item.name}</Title>
                    </Skeleton>
                    <Skeleton
                      visible={isLoadingCredits2}
                      mih={20}
                      mb={6}
                    >
                      <Text size='md' c='dimmed'>As {item.character}</Text>
                    </Skeleton>
                  </Link>
                </Paper>
              </CarouselSlide>
          )}
        </Carousel>
        <PrimaryButton classname='button-primary--red' text='Show all' type='button' onclick={() => navigate(`/all-cast/movie/${movieId}`)} />
    </Box>
  )
}



