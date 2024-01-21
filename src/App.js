import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from './modules/navigation/navigation';
import Search from './modules/search';
import PersonPage from './pages/person-page/PersonPage';
import MoviePage from "./pages/movie-page/MoviePage";
import AllMovies from "./pages/all-movies/AllMovies";
import Footer from "./modules/footer/footer";
import AllCast from "./pages/all-cast/all-cast";

function App() {

    return (
      <>
        <BrowserRouter>
          <Navigation />
          <main className='page-content'>
            <Routes>
              <Route path='search' element={<Search />} />
              <Route path='movie/:movieId' element={<MoviePage />} />
              <Route path='person/:personId' element={<PersonPage />} />
              <Route path='all-movies/:personId' element={<AllMovies />} />
              <Route path='all-cast/:movieId' element={<AllCast />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </>
    );
}

export default App;
