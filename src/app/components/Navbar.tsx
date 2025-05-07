'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Indian Railways" 
                width={40} 
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold text-blue-600">Indian Railways</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/search" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Search Trains
            </Link>
            <Link href="/pnr" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              PNR Status
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Contact Us
            </Link>
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none">
                  <span className="mr-1">My Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    My Bookings
                  </Link>
                  <button 
                    onClick={() => setIsLoggedIn(false)} 
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          <Link 
            href="/search" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Search Trains
          </Link>
          <Link 
            href="/pnr" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            PNR Status
          </Link>
          <Link 
            href="/contact" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          {isLoggedIn ? (
            <>
              <Link 
                href="/profile" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link 
                href="/bookings" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                My Bookings
              </Link>
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsOpen(false);
                }} 
                className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 