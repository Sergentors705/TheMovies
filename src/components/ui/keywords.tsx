import { Badge, Box, Flex, Skeleton, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useKeywords } from '../../api';
import './style.css';

interface iKeywordsProps {
  creationType: string,
}

export default function Keywords({creationType}: iKeywordsProps) {
  const navigate = useNavigate();
  const [keywords, isLoadingKeywords] = useKeywords({creationType: creationType})

  return (
    <Box>
      <Title order={3} mb={10}>Keywords</Title>
      <Flex wrap='wrap' gap={5}>
        {
          (keywords?.keywords || keywords?.results)?.map(item =>
            <Link
              className='keyword__link'
              to={`/${creationType}/keyword/${item.id}`}
              style={{ textDecoration: 'none'}}
            >
            <Skeleton
              w='fit-content'
              visible={isLoadingKeywords}
              key={item.id}
            >
                <Badge className='keyword__badge' variant="light" color="rgba(0, 0, 0, 1)" size="lg" radius="xs" onClick={() => navigate(`/keyword/${item.id}`)}>{item.name}</Badge>
            </Skeleton>

            </Link>
          )
        }
      </Flex>
    </Box>
  )
}
