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
            <Skeleton
              visible={isLoadingKeywords}
              key={item.id}
            >
              <Link
                to={`/${creationType}/keyword/${item.id}`}
                style={{ textDecoration: 'none'}}
              >
                <Badge className='keyword-badge' variant="light" color="rgba(0, 0, 0, 1)" size="lg" radius="xs" onClick={() => navigate(`/keyword/${item.id}`)}>{item.name}</Badge>
              </Link>
            </Skeleton>

          )
        }
      </Flex>
    </Box>
  )
}
