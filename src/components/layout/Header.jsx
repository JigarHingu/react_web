import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // State to manage the open/closed state of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-20">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* --- Brand Logo --- */}
        <Link to="/" className="text-2xl font-bold group flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 text-blue-400 transition-transform group-hover:animate-spin group-hover:duration-[3000ms]">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
            <g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g>
          </svg>
          <span>ReactLearn</span>
        </Link>

        {/* --- Desktop Navigation --- */}
        {/* This list is hidden on small screens (`hidden`) and shown on medium screens and up (`md:flex`) */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
          <li><Link to="/profile" className="hover:text-blue-300 transition-colors">Profile</Link></li>
          <li><Link to="/newsletter" className="hover:text-blue-300 transition-colors">Newsletter</Link></li>
          <li><Link to="/interview" className="hover:text-blue-300 transition-colors">Interview</Link></li>
          <li><Link to="/about" className="hover:text-blue-300 transition-colors">About</Link></li>
        </ul>

        {/* --- Mobile Menu Button (Hamburger) --- */}
        {/* This button is shown only on small screens (`md:hidden`) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? (
              // Close (X) icon
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              // Hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Dropdown --- */}
      {/* This div is conditionally rendered based on the isMenuOpen state */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {/* We add an onClick handler to each link to close the menu after navigation */}
            <li><Link to="/" className="hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/profile" className="hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
            <li><Link to="/newsletter" className="hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Newsletter</Link></li>
            <li><Link to="/interview" className="hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Interview</Link></li>
            <li><Link to="/about" className="hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
