import { useEffect, useState } from "react";
import useLoading from "../hooks/use-loading";
import requestMaker from "../functions/requestMaker";
import { useParams } from "react-router-dom";

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

interface iGenresData {
    id: number,
    name: string,
}

interface iProductionCompanies {
    id: number,
    logo_path?: string,
    name: string,
}

interface iMovieData {
    poster_path: string,
    title: string,
    release_date: string,
    runtime: number,
    tagline: string,
    genres: iGenresData[],
    overview: string,
    vote_average: number,
    vote_count: number,
    budget: number,
    revenue: number,
    production_companies: iProductionCompanies[],
}

interface iMovieReleaseData {
    iso_3166_1: string,
    release_dates: iReleaseDate[],
}

interface iReleaseDate {
    certification: string,
    type: number,
}

interface iCastData {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number,
}

interface iCrewData {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
    department: string,
    job: string,
}

interface iUseMovieOptions {
    movieId: string,
}

export function useTrending({ period, type }: iUseTrendingOptions) {
    const [data, setData] = useState<iTrendingData[] | null>(null)
    const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/trending/${type}/${period}`, setData, 'results'))

    useEffect(() => {
        fetchData()
    }, [period, type])

    return [data, isLoading] as const
}

export function useMovie({ movieId }: iUseMovieOptions) {
    const [data, setData] = useState<iMovieData | null>(null)
    const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}`, setData))

    useEffect(() => {
        fetchData()
    }, [movieId])

    return [data, isLoading] as const
}

export function useMovieReleaseDates({ movieId }: iUseMovieOptions) {
    const [data, setData] = useState<iMovieReleaseData[] | null>(null)
    const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, setData, 'results'))

    useEffect(() => {
        fetchData()
    }, [movieId])

    return [data, isLoading] as const
}

// CREDITS

interface iUseCreditsOptions {
    creationType: string,
}

interface iCreditsData {
    cast: iCastData[],
    crew: iCrewData[],
}

export function useCredits({creationType}: iUseCreditsOptions) {
    const [data, setData] = useState<iCreditsData | null>(null)
    const {movieId, tvId} = useParams()
    const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creationType}/${movieId || tvId}/credits`, setData))

    useEffect(() => {
        fetchData()
    }, [movieId])

    return [data, isLoading] as const
}

// KEYWORDS

interface iKeywordsOptions {
    creationType: string,
}

interface iKeywordData {
  id: number,
  name: string,
}

interface iKeywordsData {
  keywords: iKeywordData[],
  results: iKeywordData[],
}

export function useKeywords({creationType}: iKeywordsOptions) {
    const [data, setData] = useState<iKeywordsData>()
    const {movieId, tvId} = useParams()
    const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creationType}/${movieId || tvId}/keywords`, setData))

    useEffect(() => {
        fetchData()
    }, [movieId, tvId, creationType])

    return [data, isLoading] as const
}