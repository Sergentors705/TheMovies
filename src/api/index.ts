import { useEffect, useState } from "react";
import useLoading from "../hooks/use-loading";
import requestMaker from "../functions/requestMaker";

export interface iUseTrendingOptions {
    period: string,
    type: string,
}

interface iTrendingData {
  id: number,
  media_type: string,
  name?: string,
  original_name?: string,
  overview: string,
  poster_path?: string,
  backdrop_path?: string,
  profile_path?: string,
  adult: boolean,
  original_language: string,
  genre_ids: number[]
  popularity: number,
  first_air_date?: string,
  vote_average: number,
  vote_count: number,
  origin_country?: string[],
  title?: string,
  original_title?: string,
  release_date?: string,
  video?: string[],
}


export function useTrending({ period, type }: iUseTrendingOptions) {
    const [data, setData] = useState<iTrendingData[] | null>(null)
    const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/trending/${type}/${period}`, setData, 'results'))

    useEffect(() => {
        fetchData()
    }, [period, type])

    return [data, isLoading] as const
}

