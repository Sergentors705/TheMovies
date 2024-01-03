import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Navigation() {
  return (
    <header className='page-header'>
      <nav className='page-navigation'>
        <Link className='main-logo-link' to='/'>The Movie</Link>
        <Link className='search' to='/search'>Search</Link>
      </nav>
    </header>
  )
}
