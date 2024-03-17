import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import { Image, Paper, Skeleton, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryButton from '../../components/ui/button/button';
import requestMaker from '../../functions/requestMaker';
import useLoading from '../../hooks/use-loading';

export default function Crew() {
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState(null);
  const [producer, setProducer] = useState(null);
  const [credits2, setCredits2] = useState(null);
  const [starring, setStarring] = useState([]);
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const {movieId} = useParams()
  const navigate = useNavigate();

  const [fetchMovies, isLoadingMovies] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}`, setMovie))
  const [fetchCredits2, isLoadingCredits2] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}/credits`, setCredits2))

  useEffect(() => {
    fetchMovies();
    fetchCredits2();
  }, [movieId])
  useEffect(() => setStarring(credits2?.cast.slice(0, 9)), [credits2]);

  return (
    <div className='starring'>
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
                align='center'
                onClick={() => navigate(`/person/${item.id}`)}
              >
                <Paper
                  h='100%'
                  shadow='xs'
                  p='md'
                >
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
                    <Title order={3}>{item.name}</Title>
                  </Skeleton>
                  <Skeleton
                    visible={isLoadingCredits2}
                    mih={20}
                    mb={6}
                  >
                    <Text size='md'>{item.character}</Text>
                  </Skeleton>
                </Paper>
              </CarouselSlide>
          )}
        </Carousel>
        <PrimaryButton classname='button-primary--red' text='Show all' type='button' onclick={() => navigate(`/all-cast/${movieId}`)} />
    </div>
  )
}



