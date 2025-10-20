import React from 'react';
import { useLoading } from './LoadingContext';

const GlobalLoadingIndicator: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
        .loading-bar-inner {
          background: linear-gradient(
            to right,
            transparent,
            var(--accent-primary),
            var(--accent-secondary),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s linear infinite;
        }
      `}</style>
      <div
        className={`fixed top-0 left-0 right-0 h-1 z-[9998] transition-opacity duration-300 ease-in-out ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="progressbar"
        aria-busy={isLoading}
        aria-valuetext="Loading"
      >
        <div className="h-full w-full loading-bar-inner" />
      </div>
    </>
  );
};
export default GlobalLoadingIndicator;
