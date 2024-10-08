import { Flex } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Footer from './modules/footer/footer';
import Navigation from './modules/navigation/navigation';
import SearchPage from './pages/SearchPage';
import MoviePage from './pages/MoviePage';
import TvShowPage from './pages/tv-show-page';
import PersonPage from './pages/PersonPage';
import AllMovies from './pages/AllMovies';
import AllCast from './pages/all-cast';
import StartPage from './pages/start-page';
import TopRatedMovies from './pages/top-rated-page';
import TopRatedTvShows from './pages/top-rated-tv';
import TvSeasonPage from './pages/tv-season-page';
import TvEpisodePage from './pages/tv-episode-page';

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Flex
        mx={50}
        style={{flexGrow: '1'}}
        justify='center'
        bg='var(--mantine-color-gray-0)'
      >
        <Routes>
          <Route path='search/:searchValue' element={<SearchPage />} />
          <Route path='movie/:movieId' element={<MoviePage />} />
          <Route path='tv/:tvId' element={<TvShowPage />} />
          <Route path='person/:personId' element={<PersonPage />} />
          <Route path='all-movies/:personId' element={<AllMovies />} />
          <Route path='all-cast/:type/:creationId' element={<AllCast />} />
          <Route path='/' element={<StartPage />} />
          <Route path='top-rated-movies' element={<TopRatedMovies />} />
          <Route path='top-rated-tvs' element={<TopRatedTvShows />} />
          <Route path=':creationType/keyword/:keywordId' element={<SearchPage />} />
          <Route path=':creationType/genre/:genreId' element={<SearchPage />} />
          <Route path=':creationType/companie/:companieId' element={<SearchPage />} />
          <Route path='tv/:tvId/tv-season/:seasonId' element={<TvSeasonPage />} />
          <Route path='tv/:tvId/tv-season/:seasonId/tv-episode/:episodeId' element={<TvEpisodePage />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  )
}

export default App
