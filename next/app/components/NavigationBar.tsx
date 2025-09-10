import Link from 'next/link'
import React from 'react'

const NavigationBar = () => {
  return (
    <div className="fixed z-50 navbar bg-gray-950/90 text-white shadow-sm">
        <div className="navbar-start px-3">
            <Link className='text-xl md:text-2xl font-bold' href="/">Home</Link>
        </div>
        <div className='navbar-end xl:hidden'>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden btn-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow">
                <li><Link className = "text-sm sm:text-lg" href="/projects">Projects</Link></li>
                <li><Link className = "text-sm sm:text-lg" href="/#about-me">About</Link></li>
            </ul>
            </div>
        </div>
        <div className="navbar-end hidden xl:flex">
            <Link className = "btn btn-ghost mr-1 text-lg" href="/projects">Projects</Link>
            <Link className = "btn btn-ghost mr-1 text-lg" href="/#about-me">About</Link>
        </div>
    </div>
  )
}

export default NavigationBar