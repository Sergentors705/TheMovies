import { Badge, Box, Flex, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import requestMaker from '../../functions/requestMaker';
import useLoading from '../../hooks/use-loading';

export default function Keywords({creationType}) {
  const {movieId, tvId} = useParams();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const [fetchKeywords, isLoadingKeywords] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creationType}/${movieId || tvId}/keywords`, setKeywords))

  useEffect(() => {
    fetchKeywords();
  }, [movieId, tvId])

  return (
    <Box>
      <Title order={3} mb={10}>Keywords</Title>
      <Flex wrap='wrap' gap={5}>
        {
          (keywords?.keywords || keywords?.results)?.map(item =>
            <Link
              key={item.id}
              to={`/${creationType}/keyword/${item.id}`}
              style={{}}
            >
              <Badge variant="light" color="rgba(0, 0, 0, 1)" size="lg" radius="xs" onClick={() => navigate(`/keyword/${item.id}`)}>{item.name}</Badge>
            </Link>
          )
        }
      </Flex>
    </Box>
  )
}
