import { Flex, Image, Modal, Paper, Skeleton, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import requestMaker from '../functions/requestMaker';
import useLoading from '../hooks/use-loading';
import { useDisclosure } from '@mantine/hooks';

export default function TvRecomendations({creationType}) {
  const {tvId, movieId} = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [tvRecomendations, setTvRecomendations] = useState(null);
  const [fetchTvRecomendations, isLoadingTvRecomendations] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creationType}/${tvId || movieId}/recommendations`, setTvRecomendations));

  useEffect(() => {
    fetchTvRecomendations();
  },[tvId, movieId])

  return (
    <>
      <Flex direction={'column'} gap={30}>
        <Skeleton visible={isLoadingTvRecomendations}>
          <Title order={3} ta={'center'} fz={'secondaryTitle'}>Recomendations</Title>
        </Skeleton>
        {tvRecomendations?.results?.map(item =>
          <Link key={item.id} to={`/${creationType}/${item.id}`} style={{textDecoration: 'none'}}>
            <Paper
              shadow='md'
              withBorder
              p={10}
              style={{display: 'flex', gap: '10px'}}
            >
              <Skeleton visible={isLoadingTvRecomendations} w={'min-content'}>
                <Image
                  w={100*2/3}
                  h={100}
                  radius="md"
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item?.poster_path}`}
                />
              </Skeleton>
              <Flex direction={'column'} justify={'space-between'}>
                <Skeleton visible={isLoadingTvRecomendations}>
                  <Title order={3} fz={'md'} c={'black'} fw={'normal'}>{item.name || item.title}</Title>
                </Skeleton>
                <Skeleton visible={isLoadingTvRecomendations}>
                  <Flex>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffc700" role="presentation">
                      <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                    </svg>
                    <Text c={'black'} fz={'sm'}>{item.vote_average}/10 ({item.vote_count})</Text>
                  </Flex>
                </Skeleton>
              </Flex>
            </Paper>
          </Link>
        )}
      </Flex>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
          {/* Modal content */}
      </Modal>
    </>
  )
}
