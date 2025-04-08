
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="h-12 w-12 bg-black rounded flex items-center justify-center">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M7 18L7 9L15 9L15 18" 
          stroke="white" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M10 14L10 5L18 5L18 14" 
          stroke="white" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M4 22L4 13L12 13L12 22" 
          stroke="white" 
          strokeWidth="2" 
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Logo;
