import { Button, Center, Collapse, Flex, Image, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CreationListCreator  (array, title, modalOpen, setModalDate) {
  const [opened, { toggle }] = useDisclosure(true);

  if (array?.length > 0) {

  return (
    <Flex
      miw={400}
      direction={'column'}
      gap={15}
    >
      <Title c={'black'} fz={'sectionTitle'} onClick={toggle}>{title}</Title>
      <Collapse in={opened}>
        <Flex
          miw={400}
          direction={'column'}
          gap={15}
        >
        {array.map((item) =>
          <Paper
            p={10}
            withBorder
            shadow='xl'
            radius={'lg'}
            key={item.credit_id}
          >
            <Flex gap={20}>
              <Link to={`/${item.media_type}/${item.id}`} style={{textDecoration: 'none'}} >
                <Image
                  w={100}
                  h={150}
                  fit={'cover'}
                  radius={'lg'}
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                  alt=''
                />
              </Link>
              <Link to={`/${item.media_type}/${item.id}`}  style={{textDecoration: 'none', display: 'flex', justifyContent: 'center', flexDirection: 'column'}} key={item.credit_id}>
                <Title
                  order={3}
                  c={'black'}
                  fz={'listTitle'}
                >
                  {item.media_type === 'tv'
                  ? item.name
                  : item.title}
                </Title>
                {item.character
                ?<Text fz={'listTitle'} c={'dimmed'}>As {item.character}</Text>
                :<Text fz={'listTitle'} c={'dimmed'}>{item.job}</Text>}
              </Link>
              <Button
                onClick={() => {modalOpen(); setModalDate(item)}}
                style={{alignSelf: 'center'}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                </svg>
              </Button>
            </Flex>
          </Paper>
        )}
        </Flex>
      </Collapse>
    </Flex>
  )}}
