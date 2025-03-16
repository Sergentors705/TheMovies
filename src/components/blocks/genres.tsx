import { Button, Flex, Skeleton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface iGenreData {
  id: number,
  name: string,
}

interface iGenresProps {
  creationType: string,
  genresArray: iGenreData[],
  isVisible: boolean,
}

export default function Genres({creationType, genresArray, isVisible}: iGenresProps) {
  const navigate = useNavigate();
  return (
    <Flex
      gap='sm'
      wrap='wrap'
    >
      {
        genresArray.map(genre =>
          <Skeleton
            key={genre.id}
            visible={isVisible}
            width='auto'
          >
            <Button
              key={genre.id}
              onClick={() => navigate(`/${creationType}/genre/${genre.id}`)}
            >{genre.name}</Button>
          </Skeleton>
        )}
    </Flex>
  )
}
