import React from 'react';
const Logo = ({ fontSize = 40, width = 180 }) => {
  const height = Math.round((width * 50) / 180);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 50"
      width={width}
      height={height}
      role="img"
      aria-label="CasaLuxe logo"
    >
      <defs>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A2BE2" stopOpacity="1" />
          <stop offset="100%" stopColor="#A020F0" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2A005B" stopOpacity="1" />
          <stop offset="100%" stopColor="#8A2BE2" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* emblem: simplified house mark */}
      <g transform="translate(6,6)">
        <rect x="0" y="0" width="36" height="36" rx="8" fill="url(#glow)" opacity="0.12" />
        <path
          d="M6 20 L18 10 L30 20 V30 H6 Z"
          fill="#fff"
          opacity="0.98"
        />
        <path
          d="M10 28 V20 H14 V28 Z"
          fill="#2A005B"
          opacity="0.9"
        />
      </g>

      <text
        x="50"
        y="40"
        style={{ fontSize: fontSize, fontFamily: 'Arial, sans-serif', fontWeight: 700 }}
        fill="url(#textGrad)"
      >
        Caluxe
      </text>
    </svg>
  );
};

export default Logo;