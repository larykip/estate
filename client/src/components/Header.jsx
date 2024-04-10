import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/' className='text-slate-700 hover:underline'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>KingFish</span>
                    <span className='text-slate-700'>Propertiers</span>
                </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-4'>
                <Link to='/' className='text-slate-700 hover:underline'>
                    <li className='text-slate-700 hover:underline hidden sm:inline'>Home</li>
                </Link>
                <Link to='/about' className='text-slate-700 hover:underline'>
                    <li className='text-slate-700 hover:underline hidden sm:inline'>About</li>
                </Link>
                <Link to='/login' className='text-slate-700 hover:underline'>
                    <li className='text-slate-700 hover:underline'>Sign In</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header