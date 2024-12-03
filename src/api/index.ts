import { useEffect, useState } from "react";
import useLoading from "../hooks/use-loading";
import requestMaker from "../functions/requestMaker";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

export interface iUseTrendingOptions {
  period: string,
  type: string,
}

interface iCreationData {
  id: number,
  episode_run_time: number,
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
  last_air_date?: string,
  vote_average: number,
  vote_count: number,
  origin_country?: string[],
  title?: string,
  original_title?: string,
  runtime: number,
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
  original_title: string,
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
  const [data, setData] = useState<iCreationData[]>([])
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

// DETAILS

interface iUseDetailsOptions {
  creationType: string,
}

export function useDetails({ creationType }: iUseDetailsOptions) {
  const [data, setData] = useState<iCreationData[]>([])
  const {movieId, tvId} = useParams()
  const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creationType}/${movieId || tvId}`, setData, 'results'))

  useEffect(() => {
    fetchData()
  }, [movieId, tvId, creationType])

  return [data, isLoading] as const
}

// TOP CARD DETAILS

interface iUseTopDetailsOptions {
  id: number,
  creationType: string,
}

export function useTopDetails({ creationType, id }: iUseTopDetailsOptions) {
  const [data, setData] = useState<iCreationData>()
  const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creationType}/${id}`, setData))

  useEffect(() => {
    fetchData()
  }, [id, creationType])

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
  }, [movieId, tvId])

  return [data, isLoading] as const
}

// COMBINED CREDITS

interface iUseCombinedCreditsOptions {
  personId: string,
}

interface iCombinedCredits {
  cast: iCreationData[],
  crew: iCreationData[],
}

export function useCombinedCredits({personId}: iUseCombinedCreditsOptions) {
  const [data, setData] = useState<iCombinedCredits | null>(null)
  const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/person/${personId}/combined_credits`, setData))

  useEffect(() => {
    fetchData()
  }, [personId])

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

// SIMILAR

interface iSimilarOptions {
  creationType: string,
}

interface iSimilarData {
  id: number,
  title: string,
  poster_path: string,
}

export function useSimilar({creationType}: iSimilarOptions) {
  const [data, setData] = useState<iSimilarData[]>()
  const {movieId, tvId} = useParams()
  const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/${creationType}/${movieId || tvId}/similar`, setData, 'results'))

  useEffect(() => {
    fetchData()
  }, [movieId, tvId, creationType])

  return [data, isLoading] as const
}

// TOP

interface iGenreData {
  id: number,
  name: string,
}

interface iTopOptions {
  creationType: string,
  page: number,
  selectValue: string,
  minRating: string | number,
  maxRating: string | number,
  minYear: Date,
  maxYear: Date,
  genreValue: iGenreData[],
  minRuntime: string | number,
  maxRuntime: string | number,
}

interface iCreationData {
  id: number,
  poster_path?: string,
  name?: string,
  release_date?: string,
  total_pages: number,
}

interface iTopData {
  results: iCreationData[],
  total_pages: number
}

export function useTop({creationType, page, selectValue, minRating, maxRating, minYear, maxYear, genreValue, minRuntime, maxRuntime}: iTopOptions) {
  const [data, setData] = useState<iTopData>()
  const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/discover/${creationType}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${selectValue}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&vote_count.gte=1000&primary_release_date.gte=${dayjs(minYear).format('YYYY-MM-DD')}&primary_release_date.lte=${dayjs(maxYear).format('YYYY-MM-DD')}}${genreValue.length !== 0 ? `&with_genres=${genreValue.join('|')}` : ''}&with_runtime.gte=${minRuntime}&with_runtime.lte=${maxRuntime}`, setData));

  useEffect(() => {
    fetchData()
  }, [creationType, page, selectValue, minRating, maxRating, minYear, maxYear, genreValue, minRuntime, maxRuntime])

  return [data, isLoading] as const
}

// PEOPLE

interface iPersonData {
  adult: boolean,
  also_known_as: string[],
  biography: string,
  birthday: string,
  deathday: string,
  gender: number,
  homepage: string,
  id: number,
  imdb_id: string,
  known_for_department: string,
  name: string,
  place_of_birth: string,
  popularity: number,
  profile_path: string,
}

interface iPersonOptions {
  id: string,
}

export function usePerson({id}: iPersonOptions) {
  const [data, setData] = useState<iPersonData>()
  const [fetchData, isLoading] = useLoading(async () => requestMaker(`https://api.themoviedb.org/3/person/${id}`, setData));

  useEffect(() => {
    fetchData()
  }, [id])

  return [data, isLoading] as const
}
