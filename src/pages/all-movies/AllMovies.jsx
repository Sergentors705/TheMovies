import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import { Box, Flex, Image, Modal, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';
import uniqueArrayFilter from '../../functions/uniqueArrayFilter';
import CreationListCreator from '../../functions/creationListCreator';
import { useDisclosure } from '@mantine/hooks';
import useLoading from '../../hooks/use-loading';
import requestMaker from '../../functions/requestMaker';

export default function AllMovies() {
  const [fetchPerson, isLoadingPerson] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/person/${personId}`, setPerson));
  const [fetchCreation, isLoadingCreation] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${modalDate?.media_type}/${modalDate?.id}`, setCreation));
  const [fetchCreationCrew, isLoadingCreationCrew] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${modalDate?.media_type}/${modalDate?.id}/credits`, setCreationCrew));
  const [credits, setCredits] = useState(null);
  const [fetchCredits, isLoadingCredits] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/person/${personId}/combined_credits`, setCredits));
  const [person, setPerson] = useState(null);
  const [creation, setCreation] = useState(null);
  const [creationCrew, setCreationCrew] = useState(null);
  const {personId} = useParams();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
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
  const [opened, { open, close }] = useDisclosure(false);
  const [modalDate, setModalDate] = useState(null);

  useEffect(() => {
    setArt(crew?.filter((item) => item.department === 'Art'));
    setLighting(crew?.filter((item) => item.department === 'Lighting'));
    setSound(crew?.filter((item) => item.department === 'Sound'));
    setProduction(crew?.filter((item) => item.department === 'Production'));
    setActors(crew?.filter((item) => item.department === 'Actors'));
    setCostume(crew?.filter((item) => item.department === 'Costume & Make-Up'));
    setDirecting(crew?.filter((item) => item.department === 'Directing'));
    setCamera(crew?.filter((item) => item.department === 'Camera'));
    setWritting(crew?.filter((item) => item.department === 'Writing'));
    setTeam(crew?.filter((item) => item.department === 'Crew'));
    setEditing(crew?.filter((item) => item.department === 'Editing'));
    setVisualEffects(crew?.filter((item) => item.department === 'Visual Effects'));
  }, [crew])

  useEffect(() => {
    fetchPerson();
    fetchCredits();
  }, [personId])

  useEffect(() => {
    fetchCreation();
    fetchCreationCrew();
  }, [modalDate])

  useEffect(() => {
      setCast(credits?.cast.sort((a, b) => a.order - b.order));
      setCrew(credits?.crew);
  }, [credits])

  return (
      <>
      <Flex maw={1366} w={'100%'} direction={'column'}>
        <div className='all-cast__header'>
          <Link to={`/person/${person?.id}`}>
            <img className='all-cast__movie-image' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${person?.profile_path}`} width={100} height={150} />
            Back to {person?.name}
          </Link>
        </div>
        <SimpleGrid
          gap={50}
          justify={'center'}
          style={{gridTemplateColumns: '1fr 1fr'}}
        >
          {CreationListCreator(cast, 'Cast', open, setModalDate)}
          <Flex
            miw={400}
            direction={'column'}
            gap={15}
          >
            {CreationListCreator(art, 'Art', open, setModalDate)}
            {CreationListCreator(lighting, 'Lighting', open, setModalDate)}
            {CreationListCreator(sound, 'Sound', open, setModalDate)}
            {CreationListCreator(production, 'Production', open, setModalDate)}
            {CreationListCreator(actors, 'Actors', open, setModalDate)}
            {CreationListCreator(costume, 'Costume & Make-Up', open, setModalDate)}
            {CreationListCreator(directing, 'Directing', open, setModalDate)}
            {CreationListCreator(camera, 'Camera', open, setModalDate)}
            {CreationListCreator(writting, 'Writing', open, setModalDate)}
            {CreationListCreator(team, 'Crew', open, setModalDate)}
            {CreationListCreator(editing, 'Editing', open, setModalDate)}
            {CreationListCreator(visualEffects, 'Visual Effects', open, setModalDate)}
          </Flex>
        </SimpleGrid>
      </Flex>
      <Modal.Root opened={opened} onClose={() => {close(); setModalDate(null)}} centered>
        <Modal.Overlay />
        <Modal.Content miw={480}>
          <Modal.Body
            display={'flex'}

            style={{gap: '30px', flexDirection: 'column'}}
          >
            <Flex gap={20}>
              <Image
                w={100}
                h={150}
                radius={'md'}
                fit='cover'
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${modalDate?.poster_path}`}
              />
              <Box>
                <Title fz={'secondaryTitle'}>{modalDate?.title || modalDate?.name}</Title>
                <Text>{modalDate?.release_date || `${new Date(creation?.first_air_date)?.getFullYear()} - ${new Date(creation?.last_air_date)?.getFullYear()}`}</Text>
                <Skeleton visible={isLoadingCreation}>
                  <Text>{Math.floor(creation?.runtime / 60)}h {creation?.runtime % 60}m</Text>
                </Skeleton>
                <Flex>
                  {creation?.genres?.map((item) =>
                    <Skeleton visible={isLoadingCreation}>
                      <Text>{item.name}</Text>
                    </Skeleton>
                  )}
                </Flex>
              </Box>
            </Flex>
            <Text>Director: {creationCrew?.crew?.find(item => item.job === 'Director')?.name}</Text>
            <Text>{creation?.overview}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

    </>
  )
}
