import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className='page-navigation'>
      <Link className='main-logo-link' to='/'>The Movie</Link>
      <Link className='search' to='/search'>Search</Link>
    </nav>
  )
}
