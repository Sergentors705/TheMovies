import React, { useContext } from 'react';
import {Context} from '../';

export default function SearchResults() {
  const {searchResults} = useContext(Context);
  return (
    <div>
      {
            searchResults.map((data) => {
              if (data.media_type === "movie" || data.media_type === "tv") {
                return (
                  <Link to={`movie/${data.id}`}
                  >
                    <div key={data.id}>
                      <h3>{data.title}</h3>
                      <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`} />
                    </div>
                  </Link>
                )
              } else if (data.media_type === "person") {
                return (<Link
                    element={
                      <PersonPage movieId={data.id} />
                    }
                    to='/person'
                  >
                    <div key={data.id}>
                      <h3>{data.name}</h3>
                      <img src={`https://themoviedb.org/t/p/w300_and_h450_bestv2/${data.profile_path}`}/>
                    </div>
                  </Link>)
              }
            })
          }
    </div>
  )
}
