import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryButton from '../../ui/button/button';
import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

export default function Posters() {
  const {movieId} = useParams();
  const [posters, setPosters] = useState([]);
  const [imagePath, setImagePath] = useState('');
  // pagination
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(posters?.length / 9);
  const pages = [];
  const lastShowingIndex = currentPage * 9;
  const firstShowingIndex = lastShowingIndex - 9;
  const showingPosters = posters.slice(firstShowingIndex, lastShowingIndex);

  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1);
  }

  const pageNumberHandler = pageNumber => setCurrentPage(pageNumber);

  const outerClickClose = (node) => {
    const closeSuccessMessage = (element) => {
      const target = element.target;
      const itsMessage = target === node || node.contains(target);

      if (!itsMessage) {
        // document.removeEventListener('keydown', onSuccessModalEscKeydown);
        setTimeout(() => {

        document.querySelector('.modal__container').style.display = 'none';
        }, 1000);
        document.removeEventListener('click', closeSuccessMessage);
      }
    };

    document.addEventListener('click', closeSuccessMessage);
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMzZmZiMGJiZDYyMmYxNWEyYzk2ZGI1N2JiNDk5NSIsInN1YiI6IjY1NjYwNGY3ZDk1NDIwMDBmZTMzNDBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_uOQGwm3MJDqxGnJSkPjAXSlGfO6jJU2UbB7GWADc",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((object) => {console.log(object);setPosters(object.backdrops)});
  }, [])

  return (
    <Carousel
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      align="start"
      slidesToScroll={3}
    >
      {posters?.map((item) =>
        <Carousel.Slide>
          <Image w='100%' h='auto' src={`https://www.themoviedb.org/t/p/original/${item.file_path}`}  />
        </Carousel.Slide>
      )}
    </Carousel>
  )
}
