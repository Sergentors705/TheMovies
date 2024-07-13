import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Flex, Image, Modal, SegmentedControl, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestMaker from '../../../functions/requestMaker';
import useLoading from '../../../hooks/use-loading';

export default function Posters({creature}) {
  const [images, setImages] = useState(null);
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, 200);
  const [opened, { open, close }] = useDisclosure(false);
  const [path, setPath] = useState('');

  const [imageType, setImageType] = useState('posters');
  const {movieId, tvId} = useParams()

  const [fetchImages, isLoadingImages] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creature}/${movieId || tvId}/images`, setImages))

  useEffect(() => {
    fetchImages();
  }, [movieId, tvId])

  return (
    <Flex direction='column' gap={30}>
      <SegmentedControl
        value={imageType}
        onChange={setImageType}
        data={[
          { label: 'Posters', value: 'posters' },
          { label: 'Backdrops', value: 'backdrops' },
        ]}
      />

      <Carousel
        getEmblaApi={setEmbla}
        dragFree
        slideSize='33.333333%'
        slideGap='md'
        align="start"
        slidesToScroll={1}
        controlSize={40}
        containScroll='trimSnaps'
      >
        {images?.[imageType].map((item) =>
          <Carousel.Slide key={item.file_path}>
            <Skeleton visible={isLoadingImages}>
              <Image w='100%' h='auto' fit='contain' position='center' src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${item.file_path}`}
                onClick={() =>{open(); setPath(item.file_path)}}
              />
            </Skeleton>
          </Carousel.Slide>
        )}
      </Carousel>
      <Modal opened={opened} onClose={close} fullScreen children={<Image w='100%' h='90vh' fit='contain' position='center' src={`https://www.themoviedb.org/t/p/original/${path}`} />}/>
    </Flex>
  )
}
