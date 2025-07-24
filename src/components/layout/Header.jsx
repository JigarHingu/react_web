import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* --- UPDATED BRAND LINK --- */}
        {/* We wrap the link content in a `group` class to control hover effects
            on child elements, like making the icon spin.
        */}
        <Link to="/" className="text-2xl font-bold group flex items-center gap-3">
          {/* This is an inline SVG for the React logo */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="-11.5 -10.23174 23 20.46348" 
            className="w-8 h-8 text-blue-400 transition-transform group-hover:animate-spin group-hover:duration-[500ms]"
          >
            <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"></ellipse>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
            </g>
          </svg>
          <span>ReactLearn</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex space-x-8">
            <li><Link to="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
            <li><Link to="/profile" className="hover:text-blue-300 transition-colors">Profile</Link></li>
            <li><Link to="/newsletter" className="hover:text-blue-300 transition-colors">Newsletter</Link></li>
            <li><Link to="/interview" className="hover:text-blue-300 transition-colors">Interview</Link></li>
            <li><Link to="/about" className="hover:text-blue-300 transition-colors">About</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;