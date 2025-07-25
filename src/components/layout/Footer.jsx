import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-4">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} ReactLearn Project. JH⚡</p>
      </div>
    </footer>
  );
};

export default Footer;