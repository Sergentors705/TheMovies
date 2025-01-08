import { Flex } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Footer from './modules/footer/footer';
import Navigation from './modules/navigation/navigation';
import AllMovies from './pages/all-movies';
import MoviePage from './pages/movie-page';
import PersonPage from './pages/person-page';
import SearchPage from './pages/search-page';
import AllCast from './pages/all-cast';
import StartPage from './pages/start-page';
import TopRatedPage from './pages/top-rated-page';
import TvEpisodePage from './pages/tv-episode-page';
import TvSeasonPage from './pages/tv-season-page';
import TvShowPage from './pages/tv-show-page';

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Flex
        className='app'
        maw={1366}
        px={50}
        h='auto'
        justify='center'
        bg='gray.1'
      >
        <Routes>
          <Route index element={<StartPage />} />
          <Route path='search/:searchValue' element={<SearchPage />} />
          <Route path='movie/:movieId' element={<MoviePage />} />
          <Route path='tv/:tvId' element={<TvShowPage />} />
          <Route path='tv/:tvId/tv-season/:seasonId' element={<TvSeasonPage />} />
          <Route path='tv/:tvId/tv-season/:seasonId/tv-episode/:episodeId' element={<TvEpisodePage />} />
          <Route path='person/:personId' element={<PersonPage />} />
          <Route path='all-movies/:personId' element={<AllMovies />} />
          <Route path='all-cast/:type/:creationId' element={<AllCast />} />
          <Route path='top-rated-movies' element={<TopRatedPage  creationType='movie' sortingOrder='vote_average.desc'/>} />
          <Route path='top-rated-tvs' element={<TopRatedPage creationType='tv' sortingOrder='vote_average.desc'/>} />
          <Route path='popular-movies' element={<TopRatedPage  creationType='movie' sortingOrder='popularity.desc'/>} />
          <Route path='popular-tvs' element={<TopRatedPage creationType='tv' sortingOrder='popularity.desc'/>} />
          <Route path=':creationType/keyword/:keywordId' element={<SearchPage />} />
          <Route path=':creationType/genre/:genreId' element={<SearchPage />} />
          <Route path=':creationType/companie/:companieId' element={<SearchPage />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  )
}

export default App
