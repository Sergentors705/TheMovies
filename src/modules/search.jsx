import React, { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

export default function Search() {
  const searchInput = document.querySelector('.search-field');
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('Johnny Depp');

  useEffect(() => {const searchData = createContext(searchResults)}, [searchResults]);

  return (
    <div>
      <form
        className='search-form'
        onSubmit={
          evt => {
            evt.preventDefault();
            fetch(`https://api.themoviedb.org/3/search/multi?query=${searchValue}`, {
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
            .then((results) => {setSearchResults(results.results)})
          }
      }>
        <input
          className='search-field'
          type='text'
          value={searchValue}
          onChange={() => setSearchValue(searchInput?.value)}
        ></input>
        <button className='search-button' type='submit'><span className='visually-hidden'>Search</span></button>
      </form>
    </div>
  )
}
