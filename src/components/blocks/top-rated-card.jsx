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
      key={info?.id}
      to={`/movie/${info?.id}`}
      style={{textDecoration: 'none'}}
    >
      <Paper
        h='100%'
        withBorder
        shadow='lg'
        p={10}
        maw={220}
      >
        <Image
          mb={10}
          w={200}
          h={'auto'}
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${info?.poster_path}`}
        />
        <Title
          fz={'listTitle'}
          ta='center'
          order={2}
          textWrap='wrap'
          c='black'
        >{info?.title}</Title>
        <Flex gap={15}>
          <Text
            c='dimmed'
            fz={'textSmall'}
          >
            {new Date(info?.release_date)?.getFullYear()}
          </Text>
          <Text
            c='dimmed'
            fz={'textSmall'}
          >
            {Math.floor(info?.runtime / 60)}h {info?.runtime % 60}m
          </Text>
        </Flex>
      </Paper>
    </Link>
  )
}
