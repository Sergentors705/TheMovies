import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import { Image, Paper, Skeleton, Text, Title } from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Actors(array, isVisible) {
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const {movieId} = useParams()
  const navigate = useNavigate();
console.log(array)
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
            array?.map( item =>
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
                    visible={isVisible}
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
                    visible={isVisible}
                    mih={20}
                    mb={6}
                  >
                    <Title order={3}>{item.name}</Title>
                  </Skeleton>
                  <Skeleton
                    visible={isVisible}
                    mih={20}
                    mb={6}
                  >
                    <Text size='md'>{item.character}</Text>
                  </Skeleton>
                </Paper>
              </CarouselSlide>
          )}
        </Carousel>
        {/* <PrimaryButton classname='button-primary--red' text='Show all' type='button' onclick={() => navigate(`/all-cast/${movieId}`)} /> */}
    </div>
  )
}



