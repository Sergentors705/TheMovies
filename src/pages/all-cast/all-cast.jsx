import { Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PeopleListCreator from '../../functions/peopleListCreator';
import requestMaker from '../../functions/requestMaker';
import useLoading from '../../hooks/use-loading';

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
  const [opened, { open, close }] = useDisclosure(false);
  const [modalDate, setModalDate] = useState(null);

  const [fetchCreation, isLoadingCreation] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${type}/${creationId}`, setCreation));
  const [fetchCrew, isLoadingCrew] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${type}/${creationId}/credits`, setCrew));

  useEffect(() => {
    fetchCreation();
    fetchCrew();
  }, [creationId, type])

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
console.log(crew)
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
          {PeopleListCreator(crew?.cast, 'Cast')}
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
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {/* Modal content */}
      </Modal>
    </>
  )
}
