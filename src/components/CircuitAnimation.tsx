
import React from 'react';

const CircuitAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full opacity-20" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f47629" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff8b47" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d65a0f" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Circuit Lines */}
        <g stroke="url(#circuitGradient)" strokeWidth="2" fill="none">
          <path 
            d="M100,200 L300,200 L300,100 L500,100 L500,300 L700,300"
            strokeDasharray="10,5"
            className="animate-circuit"
          />
          <path 
            d="M200,400 L400,400 L400,500 L600,500 L600,350 L800,350"
            strokeDasharray="8,4"
            className="animate-circuit"
            style={{ animationDelay: '1s' }}
          />
          <path 
            d="M50,600 L250,600 L250,700 L450,700 L450,550 L650,550"
            strokeDasharray="12,6"
            className="animate-circuit"
            style={{ animationDelay: '2s' }}
          />
        </g>
        
        {/* Circuit Nodes */}
        <g fill="#f47629">
          {[
            [300, 200], [500, 100], [700, 300],
            [400, 400], [600, 500], [800, 350],
            [250, 600], [450, 700], [650, 550]
          ].map(([x, y], i) => (
            <circle 
              key={i}
              cx={x} 
              cy={y} 
              r="4"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default CircuitAnimation;
