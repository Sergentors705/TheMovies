import './App.css';
import Search from './modules/search';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, useParams } from "react-router-dom";
import PersonPage from './pages/PersonPage';
import Navigation from './modules/navigation';

function App() {

    return (
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='search' element={<Search />} />
            <Route path='movie/:movieId' element={<MoviePage />} />
            <Route path='person/:personId' element={<PersonPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
