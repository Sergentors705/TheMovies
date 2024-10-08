import { Box, Flex, Image, Modal, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import requestMaker from '../functions/requestMaker';
import useLoading from '../hooks/use-loading';
import './style.css';
import CreationListCreator from '../functions/creationListCreator';

interface iCreditsData {
  cast: iCastData[],
  crew: iCrewData[],
}

interface iCastData {
  id: number,
  media_type: string,
  release_date: string,
  name: string,
  title: string,
  poster_path: string,
  character: string,
  order: number,
}

interface iCrewData {
  id: number,
  media_type: string,
  release_date: string,
  title: string,
  name: string,
  poster_path: string,
  department: string,
  job: string,

}

export default function AllMovies() {
  const [fetchPerson, isLoadingPerson] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/person/${personId}`, setPerson));
  const [fetchCreation, isLoadingCreation] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${modalDate?.media_type}/${modalDate?.id}`, setCreation));
  const [fetchCreationCrew, isLoadingCreationCrew] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${modalDate?.media_type}/${modalDate?.id}/credits`, setCreationCrew));
  const [credits, setCredits] = useState<iCreditsData | null>(null);
  const [fetchCredits, isLoadingCredits] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/person/${personId}/combined_credits`, setCredits));
  const [person, setPerson] = useState(null);
  const [creation, setCreation] = useState(null);
  const [creationCrew, setCreationCrew] = useState(null);
  const {personId} = useParams();
  const [cast, setCast] = useState<iCastData[] | []>([]);
  const [crew, setCrew] = useState<iCrewData[] | []>([]);
  const [art, setArt] = useState<iCrewData[] | []>([]);
  const [lighting, setLighting] = useState<iCrewData[] | []>([]);
  const [sound, setSound] = useState<iCrewData[] | []>([]);
  const [production, setProduction] = useState<iCrewData[] | []>([]);
  const [actors, setActors] = useState<iCrewData[] | []>([]);
  const [costume, setCostume] = useState<iCrewData[] | []>([]);
  const [directing, setDirecting] = useState<iCrewData[] | []>([]);
  const [camera, setCamera] = useState<iCrewData[] | []>([]);
  const [writting, setWritting] = useState<iCrewData[] | []>([]);
  const [team, setTeam] = useState<iCrewData[] | []>([]);
  const [editing, setEditing] = useState<iCrewData[] | []>([]);
  const [visualEffects, setVisualEffects] = useState<iCrewData[] | []>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalDate, setModalDate] = useState<iCastData[] | iCrewData[] | []>([]);

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
      setCast(credits?.cast.sort((a, b) => a.order - b.order) || []);
      setCrew(credits?.crew || []);
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
          <CreationListCreator array={cast} title='Cast' modalOpen={open} setModalDate={setModalDate} />
          <Flex
            miw={400}
            direction={'column'}
            gap={15}
          >
            <CreationListCreator array={art} title='Art' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={lighting} title='Lighting' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={sound} title='Sound' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={production} title='Production' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={actors} title='Actors' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={costume} title='Costume & Make-Up' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={directing} title='Directing' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={camera} title='Camera' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={writting} title='Writing' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={team} title='Crew' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={editing} title='Editing' modalOpen={open} setModalDate={setModalDate} />
            <CreationListCreator array={visualEffects} title='Visual Effects' modalOpen={open} setModalDate={setModalDate} />
          </Flex>
        </SimpleGrid>
      </Flex>
      <Modal.Root opened={opened} onClose={() => {close(); setModalDate([])}} centered>
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
