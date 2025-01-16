import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import { Box, Button, Image, Paper, Skeleton, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCredits } from '../../api';
import './style.css';

interface iCrewProps {
  creature: string,
}

interface iCastData {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number,
}

export default function Crew({creature}: iCrewProps) {

  const [starring, setStarring] = useState<iCastData[]>([]);
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const {movieId, tvId} = useParams()
  const navigate = useNavigate();
  const [credits, isLoadingCredits2] = useCredits({creationType: creature})

  useEffect(() => setStarring(credits?.cast.slice(0, 9) || []), [credits]);

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
                my={30}
              >
                  <Link className='crew-link' to={`/person/${item.id}`}>
                <Paper
                  className='person-card'
                  h='100%'
                  withBorder
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
                      <Title order={3} c='black'>{item.name}</Title>
                    </Skeleton>
                    <Skeleton
                      visible={isLoadingCredits2}
                      mih={20}
                      mb={6}
                    >
                      <Text size='md' c='dimmed'>As {item.character}</Text>
                    </Skeleton>
                </Paper>
                </Link>
              </CarouselSlide>
          )}
        </Carousel>
        <Button size='lg' onClick={() => navigate(`/all-cast/${creature}/${movieId || tvId}`)} >Show all</Button>
    </Box>
  )
}



