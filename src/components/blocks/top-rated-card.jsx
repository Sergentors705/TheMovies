import { Flex, Image, Paper, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useLoading from '../../hooks/use-loading';
import requestMaker from '../../functions/requestMaker';

export default function TopRatedCard({id}) {
  const [info, setInfo] = useState(null);
  const [fetchInfo, isLoadingInfo] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${id}`, setInfo));

  useEffect(() => {
    fetchInfo();
  },[id])

  return (
    <Link
      to={`/movie/${info?.id}`}
      style={{textDecoration: 'none'}}
    >
      <Paper
        p={10}
        withBorder
        shadow='lg'
      >
        <Flex gap={10}>
          <Image
            w={100}
            h={150}
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${info?.poster_path}`}
          />
          <Flex direction='column'>
            <Title
              ta='center'
              order={2}
              textWrap='wrap'
              c='black'
            >{info?.title}</Title>
            <Text c='dimmed'>{info?.release_date}</Text>
            <Text c='dimmed'>{Math.floor(info?.runtime / 60)}h {info?.runtime % 60}m</Text>
          </Flex>
        </Flex>
      </Paper>
    </Link>
  )
}
