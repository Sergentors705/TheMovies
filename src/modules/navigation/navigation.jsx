import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import PrimaryButton from '../../components/ui/button/button';
import { Menu, Button, Text, rem, UnstyledButton } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <header className='page-header'>
      <nav className='page-navigation'>
        <Link className='main-logo-link' to='/'>The Movie</Link>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button>Movies</Button>
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
        <PrimaryButton text='Search' classname='button-primary--blue' type='button' onclick={() => navigate('/search')} />
      </nav>
    </header>
  )
}
