import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import PrimaryButton from '../../components/ui/button/button';
import { Menu, Button, Text, rem, UnstyledButton, Image } from '@mantine/core';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <header className='page-header'>
      <nav className='page-navigation'>
        <Link className='main-logo-link' to='/'>
          <Image w={150} src='../../logo.svg' />
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
        <PrimaryButton text='Search' classname='button-primary--blue' type='button' onclick={() => navigate('/search')} />
      </nav>
    </header>
  )
}
