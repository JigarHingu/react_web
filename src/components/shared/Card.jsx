import React from 'react';

const Card = ({ children }) => {
  return <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-colors duration-300">{children}</div>;
};

// Wrap the export in React.memo. This tells React to only re-render this
// component if its props (in this case, `children`) have actually changed.
export default React.memo(Card);