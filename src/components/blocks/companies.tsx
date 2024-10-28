import { Box, Image, List, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

interface iCompaniesProps {
  companies: [],
  creationType: string,
}

interface iCompanieData {
  id: number,
  name: string,
  logo_path?: string,
}

export default function Companies({companies, creationType}: iCompaniesProps) {
  console.log(companies)
  return (
    <Box>
      <Title order={3} mb={10}>Production</Title>
      <List listStyleType='none'>
        {companies?.map((item: iCompanieData) =>
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
