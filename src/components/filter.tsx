import { Box, Chip, Flex, NativeSelect, NumberInput, Paper, RangeSlider, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import React, { useEffect, useState } from 'react'
import requestMaker from '../functions/requestMaker';

interface iGenreData {
  id: number,
  name: string,
}

interface iFilterProps {
  creationType: string,
  selectValue: string,
  minRating: number,
  maxRating: number,
  minYear: Date,
  maxYear: Date,
  minRuntime: number,
  maxRuntime: number,
  setSelectValue: (arg0: string) => void,
  setMinRating: (arg0: number) => void,
  setMaxRating: (arg0: number) => void,
  setMinYear: (arg0: Date) => void,
  setMaxYear: (arg0: Date) => void,
  setMinRuntime: (arg0: number) => void,
  setMaxRuntime: (arg0: number) => void,
}

export default function Filter({ creationType, selectValue, minRating, maxRating, minYear, maxYear, minRuntime, maxRuntime, setSelectValue, setMinRating, setMaxRating, setMinYear, setMaxYear, setMinRuntime, setMaxRuntime}: iFilterProps) {
  const [genreList, setGenreList] = useState<iGenreData[]>([]);
  const [genreValue, setGenreValue] = useState<iGenreData[]>([]);
  // const [selectValue, setSelectValue] = useState('vote_average.desc');
  const marks = [
    { value: 60, label: '1h' },
    { value: 120, label: '2h' },
    { value: 180, label: '3h' },
    { value: 360, label: '5h' },
  ];

  useEffect(() => {
    requestMaker(`https://api.themoviedb.org/3/genre/${creationType}/list?language=en`, setGenreList, 'genres')
  },[])

  return (
    <Paper p={20} mr={30}>
          <Title order={3} mb={10}>Sort by</Title>
          <NativeSelect
            mb={15}
            value={selectValue}
            onChange={(event) => setSelectValue(event.currentTarget.value)}
            data={[
              {label: 'Original title (A-Z)', value: 'original_title.asc'},
              {label: 'Original title (Z-A)', value: 'original_title.desc'},
              {label: 'Vote average descending', value: 'vote_average.desc'},
              {label: 'Popularity ascending', value: 'popularity.asc'},
              {label: 'Popularity descending', value: 'popularity.desc'},
              {label: 'Revenue ascending', value: 'revenue.asc'},
              {label: 'Revenue descending', value: 'revenue.desc'},
              {label: 'Release date ascending', value: 'primary_release_date.asc'},
              {label: 'Release date descending', value: 'primary_release_date.desc'},
              {label: 'Title (A-Z)', value: 'title.asc'},
              {label: 'Title (Z-A)', value: 'title.desc'},
              {label: 'Vote average ascending', value: 'vote_average.asc'},
              {label: 'Vote count ascending', value: 'vote_count.asc'},
              {label: 'Vote count descending', value: 'vote_count.desc'},
            ]}
          />
          <Box mb={15}>
            <Title order={3} mb={10}>User rating</Title>
            <RangeSlider
              minRange={0}
              mb={10}
              min={0}
              max={10}
              step={0.1}
              value={[minRating, maxRating]}
              defaultValue={[minRating, maxRating]}
              onChangeEnd={(value) => {setMaxRating(value[1]); setMinRating(value[0])}}
            />
            <Flex align='center' gap={10}>
              <NumberInput
                value={minRating}
                onChange={setMinRating}
                defaultValue={minRating}
                decimalScale={1}
                min={0}
                max={10}
              />
              to
              <NumberInput
                value={maxRating}
                onChange={setMaxRating}
                defaultValue={maxRating}
                decimalScale={1}
                min={0}
                max={10}
              />
            </Flex>
          </Box>
          <Box mb={15}>
            <Title order={3} mb={10}>Year</Title>
            <DatePickerInput
              label='From:'
              clearable
              value={minYear}
              onChange={value => setMinYear(value)}
            />
            <DatePickerInput
              label='To:'
              clearable
              value={maxYear}
              onChange={value => setMaxYear(value)}
            />
          </Box>
          <Box mb={15}>
            <Title order={3} mb={10}>Genres</Title>
            <Chip.Group multiple value={genreValue} onChange={setGenreValue}>
              <Flex wrap='wrap' gap={10}>
              {genreList?.map((item) =>
                <Chip key={item.id} value={String(item.id)} >{item.name}</Chip>
              )}
              </Flex>
            </Chip.Group>
          </Box>
          <Box>
            <Title order={3} mb={10}>Runtime</Title>
            <RangeSlider
              minRange={15}
              mb={10}
              min={0}
              max={360}
              step={15}
              value={[minRuntime, maxRuntime]}
              defaultValue={[minRuntime, maxRuntime]}
              onChangeEnd={(value) => {setMinRuntime(value[0]); setMaxRuntime(value[1])}}
              marks={marks}
            />
          </Box>
        </Paper>
  )
}
