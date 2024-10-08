import { Flex, Image, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import requestMaker from '../functions/requestMaker';
import useLoading from '../hooks/use-loading';
import PeopleListCreator from '../functions/peopleListCreator';

interface iCrewData {
  id: number,
  department: string;
  name: string,
  credit_id: number,
  profile_path: string,
  job: string,
}

interface iCastData {
  id: number,
  name: string,
  credit_id: number,
  profile_path: string,
  character: string,
}

interface iCrew {
  crew: iCrewData[],
  cast: iCastData[],
}

interface iCreationData {
  title: string,
  id: number,
  poster_path: string,
}

export default function AllCast() {
  const {creationId, type} = useParams();
  const [creation, setCreation] = useState<iCreationData | null>();
  const [crewData, setCrewData] = useState<iCrew | null>();
  const [art, setArt] = useState<iCrewData[]>([]);
  const [lighting, setLighting] = useState<iCrewData[]>([]);
  const [sound, setSound] = useState<iCrewData[]>([]);
  const [production, setProduction] = useState<iCrewData[]>([]);
  const [actors, setActors] = useState<iCrewData[]>([]);
  const [costume, setCostume] = useState<iCrewData[]>([]);
  const [directing, setDirecting] = useState<iCrewData[]>([]);
  const [camera, setCamera] = useState<iCrewData[]>([]);
  const [writting, setWritting] = useState<iCrewData[]>([]);
  const [team, setTeam] = useState<iCrewData[]>([]);
  const [editing, setEditing] = useState<iCrewData[]>([]);
  const [visualEffects, setVisualEffects] = useState<iCrewData[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalDate, setModalDate] = useState<iCrewData | iCastData | null>(null);

  const [fetchCreation, isLoadingCreation] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${type}/${creationId}`, setCreation));
  const [fetchCrew, isLoadingCrew] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${type}/${creationId}/credits`, setCrewData));

  useEffect(() => {
    fetchCreation();
    fetchCrew();
  }, [creationId, type])

  useEffect(() => {
    setArt(crewData?.crew.filter((item) => item.department === 'Art') || []);
    setLighting(crewData?.crew.filter((item) => item.department === 'Lighting') || []);
    setSound(crewData?.crew.filter((item) => item.department === 'Sound') || []);
    setProduction(crewData?.crew.filter((item) => item.department === 'Production') || []);
    setActors(crewData?.crew.filter((item) => item.department === 'Actors') || []);
    setCostume(crewData?.crew.filter((item) => item.department === 'Costume & Make-Up') || []);
    setDirecting(crewData?.crew.filter((item) => item.department === 'Directing') || []);
    setCamera(crewData?.crew.filter((item) => item.department === 'Camera') || []);
    setWritting(crewData?.crew.filter((item) => item.department === 'Writing') || []);
    setTeam(crewData?.crew.filter((item) => item.department === 'Crew') || []);
    setEditing(crewData?.crew.filter((item) => item.department === 'Editing') || []);
    setVisualEffects(crewData?.crew.filter((item) => item.department === 'Visual Effects') || []);
  }, [crewData])

  return (
    <>
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
          <PeopleListCreator array={crewData?.cast.map((i) => ({...i, buisness: `As ${i.character}`})) || []} title={'Cast'} modalOpen={open} />
          <Flex
            miw={400}
            direction={'column'}
            gap={15}
          >
            <PeopleListCreator array={art?.map((i) => ({...i, buisness: `${i.job}`}))} title='Art' modalOpen={open} />
            <PeopleListCreator array={lighting?.map((i) => ({...i, buisness: `${i.job}`}))} title='Lighting' modalOpen={open} />
            <PeopleListCreator array={sound?.map((i) => ({...i, buisness: `${i.job}`}))} title='Sound' modalOpen={open} />
            <PeopleListCreator array={production?.map((i) => ({...i, buisness: `${i.job}`}))} title='Production' modalOpen={open} />
            <PeopleListCreator array={actors?.map((i) => ({...i, buisness: `${i.job}`}))} title='Actors' modalOpen={open} />
            <PeopleListCreator array={costume?.map((i) => ({...i, buisness: `${i.job}`}))} title='Costume & Make-Up' modalOpen={open} />
            <PeopleListCreator array={directing?.map((i) => ({...i, buisness: `${i.job}`}))} title='Directing' modalOpen={open} />
            <PeopleListCreator array={camera?.map((i) => ({...i, buisness: `${i.job}`}))} title='Camera' modalOpen={open} />
            <PeopleListCreator array={writting?.map((i) => ({...i, buisness: `${i.job}`}))} title='Writing' modalOpen={open} />
            <PeopleListCreator array={team?.map((i) => ({...i, buisness: `${i.job}`}))} title='Crew' modalOpen={open} />
            <PeopleListCreator array={editing?.map((i) => ({...i, buisness: `${i.job}`}))} title='Editing' modalOpen={open} />
            <PeopleListCreator array={visualEffects?.map((i) => ({...i, buisness: `${i.job}`}))} title='Visual Effects' modalOpen={open} />
          </Flex>
        </Flex>
      </Flex>
      <Modal opened={opened} onClose={close} title={modalDate?.name} centered>
        <Title>{}</Title>
        <Image
          w={100}
          h={150}
          radius={'md'}
          fit='cover'
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${modalDate?.profile_path}`}
        />
      </Modal>
    </>
  )
}
