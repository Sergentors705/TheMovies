import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useLoading from '../hooks/use-loading';
import requestMaker from '../functions/requestMaker';
import { Input } from '@mantine/core';

export default function Search() {
  const searchInput = document.querySelector('.search-field');
  const [searchResults, setSearchResults] = useState([]);
  const [{searchParams}] = useParams();
  const [searchValue, setSearchValue] = useState(searchParams);
  const [fetchSearchResults, isLoadingSearchResults] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/search/multi?query=${searchValue}`, setSearchResults));

  return (
    <>
      <div>
        <form
          className='search-form'
          onSubmit={
            evt => {
              evt.preventDefault();
              fetchSearchResults();
            }
        }>
          <Input
            size='md'
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
          ></Input>
          {/* <input
            className='search-field'
            type='text'
            value={searchValue}
            onChange={() => setSearchValue(searchInput?.value)}
          ></input> */}
          <button className='search-button' type='submit'><span className='visually-hidden'>Search</span></button>
        </form>
    <div>
      {
            searchResults?.results?.map((data) => {
              if (data.media_type === "movie" || data.media_type === "tv") {
                return (
                  <Link to={`/movie/${data.id}`}>
                    <div key={data.id}>
                      <h3>{data.title}</h3>
                      <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`} />
                    </div>
                  </Link>
                )
              } else if (data.media_type === "person") {
                return (
                  <Link to={`/person/${data.id}`}>
                    <div key={data.id}>
                      <h3>{data.name}</h3>
                      <img src={`https://themoviedb.org/t/p/w300_and_h450_bestv2/${data.profile_path}`}/>
                    </div>
                  </Link>)
              }
            })
          }
    </div>
      </div>
    </>
  )
}
