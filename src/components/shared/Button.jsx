import React from 'react';

const Button = ({ onClick, children, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  };
  return <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]}`}>{children}</button>;
};

export default Button;