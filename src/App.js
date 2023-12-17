import './App.css';
import Search from './modules/search';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, useParams } from "react-router-dom";
import PersonPage from './pages/PersonPage';
import Navigation from './modules/navigation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        path: `movie/:movieId`,
        element: <MoviePage />,
      },
      {
        path: 'person/:personId',
        element: <PersonPage />,
      }
    ]
  },
]);


function App() {

    return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
    );
}

export default App;
