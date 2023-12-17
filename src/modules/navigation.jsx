import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Search from './search'

export default function Navigation() {
  const searchResults = useContext([]);
  return (
    <nav className='page-navigation'>
      <Link className='main-logo-link' to='/'>The Movie</Link>
      <Search />
      <Outlet />
    </nav>
  )
}
