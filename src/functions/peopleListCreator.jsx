import { Button, Collapse, Flex, Image, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { Link } from 'react-router-dom';

export default function PeopleListCreator  (array, title) {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <Flex
      miw={400}
      direction={'column'}
      gap={15}
    >
    {
      array?.length > 0
      ? <>
        <Title c={'black'} fz={'sectionTitle'} onClick={toggle}>{title}</Title>
        <Collapse in={opened}>
          <Flex
            miw={400}
            direction={'column'}
            gap={15}
          >
            {array.map((item) =>
            <Link to={`/person/${item.id}`} style={{textDecoration: 'none'}} key={item.credit_id}>
              <Paper
                p={10}
                withBorder
                shadow='xl'
              >
                <Flex gap={20}>
                  <Image
                    w={100}
                    h={150}
                    fit={'cover'}
                    radius={'lg'}
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
                    alt=''
                  />
                  <Flex
                    direction={'column'}
                    justify={'center'}
                  >
                    <Title
                      order={3}
                      c={'black'}
                      fz={'listTitle'}
                    >{item.name}</Title>
                    {item.character
                    ?<Text fz={'listTitle'} c={'dimmed'}>As {item.character}</Text>
                    :<Text fz={'listTitle'} c={'dimmed'}>{item.job}</Text>}
                  </Flex>
                  <Button onClick={() => console.log('ti pidor')} style={{zIndex: 10}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                    </svg>
                  </Button>
                </Flex>
              </Paper>
            </Link>
            )}
          </Flex>
        </Collapse>
      </>
      :<></>
    }
    </Flex>
  )}
