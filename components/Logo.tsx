import React from 'react';

interface LogoProps {
  className?: string;
  customSrc?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", customSrc }) => {
  if (customSrc) {
    return (
      <img 
        src={customSrc} 
        alt="J Shots Logo" 
        className={`${className} object-cover rounded-md`} 
      />
    );
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Camera Body */}
      <rect x="2" y="7" width="20" height="15" rx="3" ry="3" />
      
      {/* Top Dial/Button */}
      <path d="M8 7L9.5 4h5l1.5 3" />
      <line x1="18" y1="5" x2="20" y2="5" />

      {/* Lens Ring */}
      <circle cx="12" cy="14.5" r="4.5" strokeWidth="1.5" />
      
      {/* The 'J' Curve inside the lens */}
      <path 
        d="M12.5 12.5v2.5a1.5 1.5 0 0 1-3 0" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="text-amber-500" 
        stroke="currentColor"
      />
      
      {/* Flash/Sensor */}
      <circle cx="18.5" cy="10.5" r="0.5" fill="currentColor" />
    </svg>
  );
};