import { Flex, Image, Paper, Skeleton, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTopDetails } from '../../api';

interface iTopRatedCardProps {
  id: number,
  creationType: string,
}

export default function TopRatedCard({ creationType, id }: iTopRatedCardProps) {
  const [info, isLoadingInfo] = useTopDetails({creationType: creationType, id: String(id)})

  return (
    <Link
      key={info?.id}
      to={`/${creationType}/${info?.id}`}
      style={{textDecoration: 'none'}}
    >
      <Skeleton
        visible={isLoadingInfo}
        h='100%'
      >
        <Paper
          h='100%'
          withBorder
          shadow='lg'
          p={10}
          maw={220}
          mih={350}
        >
          <Image
            mb={10}
            w={200}
            h={'auto'}
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${info?.poster_path}`}
          />
          <Title
            order={4}
            textWrap='wrap'
            c='black'
          >{info?.title || info?.name}</Title>
          <Flex gap={15}>
            <Text
              c='dimmed'
              fz={'textSmall'}
            >
              {
                creationType === 'movie'
                ? info?.release_date && new Date(info?.release_date)?.getFullYear()
                : `${info?.first_air_date && new Date(info?.first_air_date)?.getFullYear()} - ${info?.last_air_date && new Date(info?.last_air_date)?.getFullYear()}`
              }
            </Text>
            {
              creationType === 'movie'
              ? <Text
                  c='dimmed'
                  fz={'textSmall'}
                >
                  {info?.runtime && Math.floor(info?.runtime / 60)}h {info?.runtime && info?.runtime % 60}m
                </Text>
              : <></>
            }
          </Flex>
        </Paper>
      </Skeleton>
    </Link>
  )
}
