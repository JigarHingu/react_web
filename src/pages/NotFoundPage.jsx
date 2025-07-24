import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Button from '../components/shared/Button';

const NotFoundPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      {/* --- NEW ILLUSTRATIVE SVG --- */}
      <div className="w-64 h-64 mb-8 text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8.5A5.5 5.5 0 0 0 6.5 14h11a5.5 5.5 0 0 0-5.5-5.5z"/>
            <path d="M12 14v7"/>
            <path d="M8.5 14l-2.3-2.3"/>
            <path d="M15.5 14l2.3-2.3"/>
            <path d="M12 8.5V6l-2-2"/>
            <path d="M12 6l2-2"/>
            <circle cx="6" cy="5" r="1"/>
            <circle cx="18" cy="5" r="1"/>
            <circle cx="19" cy="18" r="1"/>
        </svg>
      </div>

      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-700">Oops! Page Not Found.</h2>
      <p className="mt-2 text-lg text-gray-500 max-w-md">
        It seems you've taken a wrong turn on the information superhighway. The page you're looking for doesn't exist.
      </p>
      
      {/* --- "GO HOME" BUTTON --- */}
      <div className="mt-8">
        <Link to="/">
          <Button>
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;