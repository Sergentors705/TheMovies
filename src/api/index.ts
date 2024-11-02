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

interface iUseMovieOptions {
    movieId: string | undefined,
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

interface iMovieCredits {
    cast: iCastData[],
    crew: iCrewData[],
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

export function useMovieCredits({ movieId }: iUseMovieOptions) {
    const [data, setData] = useState<iMovieCredits | null>(null)
    const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/movie/${movieId}/credits`, setData, 'results'))

    useEffect(() => {
        fetchData()
    }, [movieId])

    return [data, isLoading] as const
}