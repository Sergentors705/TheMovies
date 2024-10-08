import { Button, Flex, Image, Input, Menu } from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

export default function Navigation() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  return (
    <header className='page-header'>
      <nav className='page-navigation'>
        <Link className='main-logo-link' to='/'>
          <Image src='/logo.svg'/>
        </Link>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button size='lg'>Movies</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigate('/top-rated-movies')}>
              Top Rated
            </Menu.Item>
            <Menu.Item>
              Popular
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button size='lg'>TV shows</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigate('/top-rated-tvs')}>
              Top Rated
            </Menu.Item>
            <Menu.Item>
              Popular
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <form>
          <Flex>
            <Input
              size='lg'
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            ></Input>
            <Button type='submit' size='lg' onClick={() => navigate(`/search/${searchValue}`)}>Search</Button>
          </Flex>
        </form>
      </nav>
    </header>
  )
}
