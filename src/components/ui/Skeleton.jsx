import React from 'react';

const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-outline-variant/30 rounded-xl ${className}`} />
  );
};

export default Skeleton;
