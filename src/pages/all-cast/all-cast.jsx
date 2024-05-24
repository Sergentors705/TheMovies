import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Flex, Image, List, Paper, SimpleGrid, Text, Title } from '@mantine/core';

export default function AllCast() {
  const {creationId, type} = useParams();
  const [creation, setCreation] = useState(null);
  const [crew, setCrew] = useState(null);
  const [art, setArt] = useState([]);
  const [lighting, setLighting] = useState([]);
  const [sound, setSound] = useState([]);
  const [production, setProduction] = useState([]);
  const [actors, setActors] = useState([]);
  const [costume, setCostume] = useState([]);
  const [directing, setDirecting] = useState([]);
  const [camera, setCamera] = useState([]);
  const [writting, setWritting] = useState([]);
  const [team, setTeam] = useState([]);
  const [editing, setEditing] = useState([]);
  const [visualEffects, setVisualEffects] = useState([]);

  const PeopleListCreator = (array, title) => {

    return (
      <div className='crew__list'>
      {
        array?.length > 0
        ? <>
          <h3 className='all-cast-page__list-title'>{title}</h3>
        <Flex
          miw={400}
          direction={'column'}
          gap={15}
        >
            {array.map((item) =>
            <Link to={`/person/${item.id}`} style={{textDecoration: 'none'}} key={item.id}>
            <Paper
              p={10}
              withBorder
              shadow='xl'
            >
              <Flex gap={20}>
                <Image radius={'lg'} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} w={75} h='auto' />
                <Flex
                  direction={'column'}
                  justify={'center'}
                >
                  <Title
                    order={3}
                    c={'black'}
                    fz={'listTitle'}
                  >{item.name}</Title>
                  <Text fz={'listTitle'} c={'dimmed'}>As {item.character}</Text>
                </Flex>
              </Flex>
            </Paper>
          </Link>
              // <List.Item className='actor-card' key={Math.random()}>
              //   <Link to={`/person/${item.id}`} style={{textDecoration: 'none'}}>
              //     <Image
              //       w={100}
              //       h={150}
              //       radius={'lg'}
              //       fit='cover'
              //       src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
              //     />
              //     <Box>
              //       <Title order={3} c={'black'} fz={'listTitle'}>{item.name}</Title>
              //       <Text className='actor-character-name' c={'dimmed'} fz={'listTitle'}>{item.job}</Text>
              //     </Box>
              //   </Link>
              // </List.Item>
            )}
          </Flex>
        </>
        :<></>
      }
      </div>
    )}

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${creationId}`, {
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
      .then((object) => setCreation(object));
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${creationId}/credits`, {
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
      .then((object) => setCrew(object));
  }, [])

  useEffect(() => {
    setArt(crew?.crew.filter((item) => item.department === 'Art'));
    setLighting(crew?.crew.filter((item) => item.department === 'Lighting'));
    setSound(crew?.crew.filter((item) => item.department === 'Sound'));
    setProduction(crew?.crew.filter((item) => item.department === 'Production'));
    setActors(crew?.crew.filter((item) => item.department === 'Actors'));
    setCostume(crew?.crew.filter((item) => item.department === 'Costume & Make-Up'));
    setDirecting(crew?.crew.filter((item) => item.department === 'Directing'));
    setCamera(crew?.crew.filter((item) => item.department === 'Camera'));
    setWritting(crew?.crew.filter((item) => item.department === 'Writing'));
    setTeam(crew?.crew.filter((item) => item.department === 'Crew'));
    setEditing(crew?.crew.filter((item) => item.department === 'Editing'));
    setVisualEffects(crew?.crew.filter((item) => item.department === 'Visual Effects'));
  }, [crew])

  return (
    <Flex maw={1366} w={'100%'} direction={'column'}>
      <div className='all-cast__header'>
        <Link className='all-cast__back-to-movie' to={`/${type}/${creation?.id}`}>
          <img className='all-cast__movie-image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${creation?.poster_path}`} width={100} height={150} />
          Back to {creation?.title}
        </Link>
      </div>
      <Flex
        gap={50}
        justify={'center'}
      >
        <Flex
          miw={400}
          direction={'column'}
          gap={15}
        >
          <Title c={'black'} fz={'sectionTitle'}>Cast</Title>
            {crew?.cast.map( item =>
              <Link to={`/person/${item.id}`} style={{textDecoration: 'none'}} key={item.id}>
                <Paper
                  p={10}
                  withBorder
                  shadow='xl'
                >
                  <Flex gap={20}>
                    <Image radius={'lg'} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} w={75} h='auto' />
                    <Flex
                      direction={'column'}
                      justify={'center'}
                    >
                      <Title
                        order={3}
                        c={'black'}
                        fz={'listTitle'}
                      >{item.name}</Title>
                      <Text fz={'listTitle'} c={'dimmed'}>As {item.character}</Text>
                    </Flex>
                  </Flex>
                </Paper>
              </Link>
            )}
        </Flex>
        <Flex
          miw={400}
          direction={'column'}
          gap={15}
        >
          {PeopleListCreator(art, 'Art')}
          {PeopleListCreator(lighting, 'Lighting')}
          {PeopleListCreator(sound, 'Sound')}
          {PeopleListCreator(production, 'Production')}
          {PeopleListCreator(actors, 'Actors')}
          {PeopleListCreator(costume, 'Costume & Make-Up')}
          {PeopleListCreator(directing, 'Directing')}
          {PeopleListCreator(camera, 'Camera')}
          {PeopleListCreator(writting, 'Writing')}
          {PeopleListCreator(team, 'Crew')}
          {PeopleListCreator(editing, 'Editing')}
          {PeopleListCreator(visualEffects, 'Visual Effects')}
        </Flex>
      </Flex>
    </Flex>
  )
}
