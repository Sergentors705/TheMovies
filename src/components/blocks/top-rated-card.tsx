import { Flex, Image, Paper, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTopDetails } from '../../api';

interface iTopRatedCardProps {
  id: number,
  creationType: string,
}

export default function TopRatedCard({ creationType, id }: iTopRatedCardProps) {
  const [info, isLoadingInfo] = useTopDetails({creationType: creationType, id: id})

  return (
    <Link
      key={info?.id}
      to={`/${creationType}/${info?.id}`}
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
          order={3}
          textWrap='wrap'
          c='black'
        >{info?.title || info?.name}</Title>
        <Flex gap={15}>
          <Text
            c='dimmed'
            fz={'textSmall'}
          >
            {info?.release_date && new Date(info?.release_date)?.getFullYear()}
          </Text>
          <Text
            c='dimmed'
            fz={'textSmall'}
          >
            {(info?.runtime || info?.episode_run_time) && Math.floor((info?.runtime || info?.episode_run_time) / 60)}h {(info?.runtime || info?.episode_run_time) && (info?.runtime || info?.episode_run_time) % 60}m
          </Text>
        </Flex>
      </Paper>
    </Link>
  )
}
