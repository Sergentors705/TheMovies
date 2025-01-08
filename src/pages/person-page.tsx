import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { Box, Flex, Image, Modal, Paper, Skeleton, Text, Title } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { useCombinedCredits, usePerson } from '../api';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import Crew from '../modules/crew/crew';

interface iCreditsData {
  id: number,
  episode_run_time: number[],
  media_type: string,
  name?: string,
  character?: string,
  job?: string,
  original_name?: string,
  overview: string,
  poster_path?: string,
  backdrop_path?: string,
  profile_path?: string,
  adult: boolean,
  original_language: string,
  genre_ids: number[],
  popularity: number,
  first_air_date?: string,
  last_air_date?: string,
  vote_average: number,
  vote_count: number,
  origin_country?: string[],
  title?: string,
  original_title?: string,
  runtime: number,
  release_date?: string,
  video?: string[],
}

export default function PersonPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [path, setPath] = useState<string>('');
  const {personId} = useParams();
  const [person, isLoadingPerson] = usePerson({id: personId || ''});
  const [credits, isLoadingCredits] = useCombinedCredits({personId: personId || ''});
  const arrr: Array<iCreditsData> = []
  const getMonthName = (monthNumber: number) => {
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return monthNames[monthNumber];
  }
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
console.log(credits)
  return (
      <Flex
      maw={1366}
      py={30}
      gap={30}>
          <Flex direction='column'>
              <Image
                w={300}
                h={450}
                radius="md"
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${person?.profile_path}`}
                onClick={() =>{open(); setPath(person?.profile_path ?? '')}}
                alt=''
                style={{cursor: 'pointer'}}
              />
            <Box >
              <Title order={4} >Birthday:</Title>
              <Skeleton visible={isLoadingPerson}>
                <Text >{person?.birthday && new Date(person?.birthday).getDate()} {person?.birthday && getMonthName(new Date(person?.birthday).getMonth())} {person?.birthday && new Date(person?.birthday).getFullYear()}</Text>
              </Skeleton>
            </Box>
            <Box >
              <Title order={4} >Birthplace:</Title>
              <Skeleton visible={isLoadingPerson}>
              <Text >Birthplace: {person?.place_of_birth}</Text>
              </Skeleton>
            </Box>
            {
              person?.deathday
              ? <Box >
                  <Title order={4} >Day of death:</Title>
                  <Text >{new Date(person?.deathday).getDate()} {getMonthName(new Date(person?.deathday).getMonth())} {new Date(person?.deathday).getFullYear()}</Text>
                </Box>
              : <></>
            }

          </Flex>
          <Box>
            <Title order={1}>{person?.name}</Title>
            <Title order={3}>About</Title>
            <Text>{person?.biography}</Text>
            <Title mb={10}>Known for</Title>
            <Carousel
              maw={936}
              dragFree
              slideSize='20%'
              getEmblaApi={setEmbla}
              align='start'
              slideGap='md'
              containScroll='trimSnaps'
            >
              {credits && arrr.concat(credits?.cast, credits?.crew).filter(item => item).sort((a, b) => a.vote_average - b.vote_average).reverse().filter(item => !item?.genre_ids.includes(10767) && !item?.genre_ids.includes(10763) && item?.vote_count >= 500).slice(0, 9).map((item) =>
                <Carousel.Slide
                  key={item.id}
                  mb={40}
                >
                  <Link
                    to={`/${item.media_type}/${item.id}`}
                    style={{textDecoration: 'none'}}
                  >
                    <Paper
                      h='100%'
                      withBorder
                      shadow='md'
                      p='md'
                    >
                      <Skeleton
                        visible={isLoadingCredits}
                        mih={225}
                        miw={150}
                        mb={10}
                      >
                        <Image
                            w={150}
                            h={225}
                            radius='md'
                          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                        />
                      </Skeleton>
                      <Skeleton
                        visible={isLoadingCredits}
                        mih={20}
                        mb={6}
                      >
                      <Title order={3} c={'black'}>{item.title || item.name }</Title>
                      <Title order={4} c={'dimmed'}>{item.job || `As ${item.character}`}</Title>
                      </Skeleton>
                    </Paper>
                  </Link>
                </Carousel.Slide>
              )}
            </Carousel>

          </Box>

      <Modal opened={opened} onClose={close} fullScreen>
        <Image w='100%' h='90vh' fit='contain' src={`https://www.themoviedb.org/t/p/original/${path}`} />
      </Modal>
        </Flex>
  )
}
