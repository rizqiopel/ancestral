import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute left-[max(50%,25rem)] top-1/2 h-[64rem] w-[128rem] -translate-y-1/2 stroke-family-brown/10 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="family-tree-pattern"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M.5 200V.5H200"
              fill="none"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-family-brown/5">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#family-tree-pattern)"
        />
      </svg>

      {/* Tree root decorative element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 opacity-10">
        <svg viewBox="0 0 1024 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 0v100M412 100h200M462 100v100M562 100v100M362 200h300" stroke="#8B5A2B" strokeWidth="8" />
          <path d="M312 200h400" stroke="#8B5A2B" strokeWidth="4" />
          <path d="M262 200h500" stroke="#8B5A2B" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default HeroBackground;
