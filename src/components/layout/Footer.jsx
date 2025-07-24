import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-4">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} ReactLearn Project. JH⚡</p>
        {/* <p className="text-sm text-gray-400 mt-2">Built to help you learn React concepts.</p> */}
      </div>
    </footer>
  );
};

export default Footer;