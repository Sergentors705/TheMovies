import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import { Image, Paper, Skeleton, Text, Title } from '@mantine/core';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Actors({array}) {
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const {tvId} = useParams()
  const navigate = useNavigate();

  return (
    <div className='starring'>
      <Link style={{textDecoration: 'none'}} to={`/all-cast/tv/${tvId}`}>
        <Title order={2} fz={'sectionTitle'} c={'black'}>All cast</Title>
      </Link>
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
              py={20}
                key={item.id}
                flex
                align='center'
                onClick={() => navigate(`/person/${item.id}`)}
              >
                <Paper
                  h='100%'
                  withBorder
                  shadow='xl'
                  p='md'
                >
                  <Skeleton
                    visible={false}
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
                    visible={false}
                    mih={20}
                    mb={6}
                  >
                    <Title order={3}>{item.name}</Title>
                  </Skeleton>
                  <Skeleton
                    visible={false}
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



