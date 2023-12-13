import React from 'react';import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

export default function Search() {
  const searchInput = document.querySelector('.search-field');
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('Johnny Depp');

  useEffect(() => {
    console.log(searchResults)}, [searchResults])

  const createSearchCard = (data) => {
      if (data.media_type === "movie") {
        searchResults.render(<div>
          <h3>{data.title}</h3>
          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`} />
        </div>)
      } else if (data.media_type === "person") {
        searchResults.render(<div>
          <h3>{data.name}</h3>
          <img src={`https://themoviedb.org/t/p/w300_and_h450_bestv2/${data.profile_path}`}/>
        </div>)
      }
  }

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
      <div className='search-results-container'>
        {
          searchResults.map((data) => {
            if (data.media_type === "movie" || data.media_type === "tv") {
              return (<a href='/pages/PersonPage' key={data.id}>
                <h3>{data.title}</h3>
                <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`} />
              </a>)
            } else if (data.media_type === "person") {
              return (<div key={data.id}>
                <h3>{data.name}</h3>
                <img src={`https://themoviedb.org/t/p/w300_and_h450_bestv2/${data.profile_path}`}/>
              </div>)
            }
        })
        }
      </div>
    </div>
  )
}
