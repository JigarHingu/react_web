import React from 'react';

const LoadingSpinner = () => {
  return (
    // This container centers the loader. `py-20` adds vertical space to ensure
    // it looks centered even on pages with little other content.
    <div className="flex justify-center items-center py-20">
      {/* This is the React logo SVG.
        - w-24 h-24 makes it larger than the header icon.
        - text-blue-500 gives it a nice color.
        - animate-spin is Tailwind's default, faster spinning animation, perfect for a loader.
      */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="-11.5 -10.23174 23 20.46348" 
        className="w-24 h-24 text-blue-500 animate-spin group-hover:duration-[3000ms]"
      >
        <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"></ellipse>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
        </g>
      </svg>
    </div>
  );
};

export default LoadingSpinner;




// import React from 'react';

// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center p-8">
//     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//   </div>
// );

// export default LoadingSpinner;