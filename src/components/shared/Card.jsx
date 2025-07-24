import React from 'react';

const Card = ({ children }) => {
  return <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-colors duration-300">{children}</div>;
};

export default Card;