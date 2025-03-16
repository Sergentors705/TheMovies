import { Carousel } from '@mantine/carousel'
import { Image, Paper, Skeleton, Title } from '@mantine/core'
import { Link } from 'react-router-dom';
import { useSimilar } from '../../api';

interface iSimilarProps {
  creationType: string,
}

export default function Similar({creationType}: iSimilarProps) {
  const [similar, isLoadingSimilar] = useSimilar({creationType: creationType})

  return (
    <>
      <Title mb={10}>Similar {creationType === 'tv' ? 'TV shows' : 'movies'}</Title>
      <Carousel
        dragFree
        slideSize='25%'
        align='start'
        slideGap='md'
        containScroll='trimSnaps'
      >
        {similar?.slice(0,9).map((item) =>
          <Carousel.Slide
            key={item.id}
            mb={40}
          >
            <Link
              to={`/${creationType}/${item.id}`}
              style={{textDecoration: 'none'}}
            >
              <Paper
                h='100%'
                withBorder
                shadow='lg'
                p='sm'
              >
                <Skeleton
                  visible={isLoadingSimilar}
                  mih={130}
                  miw={150}
                  mb={10}
                >
                  <Image
                    w='100%'
                    h='auto'
                    fit='contain'
                    radius='md'
                    src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${item.poster_path}`}
                  />
                </Skeleton>
                <Skeleton
                  visible={isLoadingSimilar}
                  mih={20}
                  mb={6}
                >
                <Title order={3} c={'black'}>{item.title || item.name}</Title>
                </Skeleton>
              </Paper>
            </Link>
          </Carousel.Slide>
        )}
      </Carousel>
    </>
  )
}
