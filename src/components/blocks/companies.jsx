import { Box, Image, List, Text, Title } from '@mantine/core';
import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Companies({companies, creationType}) {
  const {tvId, movieId} = useParams();
  console.log(companies)
  return (
    <Box>
      <Title order={3} mb={10}>Production</Title>
      <List listStyleType='none'>
        {companies?.map((item) =>
          <List.Item>
            <Link to={`/${creationType}/companie/${item.id}`}>
              {
                item.logo_path
                ? <Image src={`https://image.tmdb.org/t/p/h60/${item.logo_path}`} mb={10}/>
                : <Text size='xl' td='none'  mb={10}>{item.name}</Text>
              }

            </Link>
          </List.Item>
        )}
      </List>
    </Box>
  )
}
