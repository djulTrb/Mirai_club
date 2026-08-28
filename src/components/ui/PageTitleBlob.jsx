import React from 'react';

const PageTitleBlob = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] -z-10 pointer-events-none flex items-center justify-center">
      {/* Blurred colored blob */}
      <div className="absolute w-[50%] h-[50%] bg-[#C87FFF] opacity-60 dark:opacity-[0.05] rounded-full blur-[60px] sm:blur-[80px]"></div>
      
      {/* Noise layer */}
      <div 
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.05]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          maskImage: 'radial-gradient(circle at center, black 10%, transparent 50%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 50%)'
        }}
      ></div>
    </div>
  );
};

export default PageTitleBlob;

