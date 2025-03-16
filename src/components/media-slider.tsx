import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";
import { Image, Paper, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { MAIN_URL } from "../const";
import { useState } from "react";

interface iCreationData {
  id: number,
  media_type: string,
  name?: string,
  original_name?: string,
  overview: string,
  poster_path?: string,
  backdrop_path?: string,
  profile_path?: string,
  adult: boolean,
  original_language: string,
  genre_ids: number[]
  popularity: number,
  first_air_date?: string,
  vote_average: number,
  vote_count: number,
  origin_country?: string[],
  title?: string,
  original_title?: string,
  release_date?: string,
  video?: string[],
}

export default function MediaSlider(array: Array<iCreationData>) {

  const [embla, setEmbla] = useState(null)
  useAnimationOffsetEffect(embla, 200)

  return (
    <Carousel
      getEmblaApi={setEmbla}
      dragFree
      height='min-content'
      slideSize='20%'
      slideGap={{ base: 0, sm: 'md' }}
      align="start"
      mih={400}
      slidesToScroll={1}
      controlSize={40}
      containScroll='trimSnaps'
    >
      {array?.map((item) =>
        <Carousel.Slide key={item.id} mb={30}>
          <Paper
            h='100%'
            withBorder
            shadow='md'
            p='md'
          >
            <Link
              to={`/${item?.media_type}/${item.id}`}
              style={{textDecoration: 'none'}}
            >
              <Image
                w={220}
                h={330}
                src={`${MAIN_URL}/t/p/w220_and_h330_face${item.poster_path || item.profile_path}`}
              />
              <Title
                ta='center'
                order={2}
                textWrap='wrap'
                c='black'
              >{item.title || item.name}</Title>
            </Link>
          </Paper>
        </Carousel.Slide>
      )}
    </Carousel>
  )
}
