import { Image, Paper, Text, Title } from '@mantine/core'
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
       h='100%'
       p={20}
       maw={260}
       withBorder
       shadow='md'
     >
       <Image
         w={220}
         h={330}
         src={`https://www.themoviedb.org/t/p/w220_and_h330_face${info?.poster_path}`}
       />
       <Title
         ta='center'
         order={2}
         textWrap='wrap'
         c='black'
       >{info?.title}</Title>
       <Text c='dimmed'>{info?.release_date}</Text>
       <Text c='dimmed'>{info?.runtime}</Text>
     </Paper>
   </Link>
  )
}
