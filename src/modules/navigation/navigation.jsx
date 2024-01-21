import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import PrimaryButton from '../../components/ui/button/button';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <header className='page-header'>
      <nav className='page-navigation'>
        <Link className='main-logo-link' to='/'>The Movie</Link>
        <PrimaryButton text='Search' classname='button-primary--blue' type='button' onclick={() => navigate('/search')} />
      </nav>
    </header>
  )
}
