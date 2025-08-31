export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Arch Outline */}
      <path
        d="M83.3333 91.6667H16.6667V50C16.6667 29.7101 33.3768 13.0001 53.6667 13.0001C50.1884 13.0001 50 8.33341 50 8.33341C50 3.74609 53.746 0.00012207 58.3333 0.00012207C62.9207 0.00012207 66.6667 3.74609 66.6667 8.33341C66.6667 8.33341 79.1667 20.8334 79.1667 50V91.6667H83.3333Z"
        fill="currentColor"
        className="text-primary"
      />
      {/* Arch Inner Fill with Pattern */}
      <mask id="archMask">
        <path
          d="M75 83.3333H25V50C25 33.4314 38.4315 20 55 20C55 20 65.8333 28.3333 75 50V83.3333Z"
          fill="white"
        />
      </mask>
      <g mask="url(#archMask)">
        {/* Repeating Geometric Pattern */}
        <defs>
          <pattern
            id="geomPattern"
            patternUnits="userSpaceOnUse"
            width="12"
            height="12"
            patternTransform="scale(1)"
          >
            <path
              d="M 6,0 L 9,3 L 6,6 L 3,3 Z M 12,6 L 9,9 L 6,6 L 9,3 Z M 6,12 L 3,9 L 6,6 L 9,9 Z M 0,6 L 3,3 L 6,6 L 3,9 Z"
              stroke="currentColor"
              className="text-secondary"
              strokeWidth="0.75"
              fill="none"
            />
          </pattern>
        </defs>
        <rect x="20" y="20" width="60" height="65" fill="url(#geomPattern)" />
      </g>
      {/* Inner Flap */}
      <path
        d="M25 83.3333L75 50V83.3333H25Z"
        fill="currentColor"
        className="text-primary"
      />
      {/* Crescent */}
      <path
        d="M20.8333 54.1667C19.0123 54.1667 17.5 55.679 17.5 57.5C17.5 59.321 19.0123 60.8333 20.8333 60.8333C21.7895 60.8333 22.6565 60.4265 23.2842 59.7618C21.8478 59.2208 20.8333 57.9427 20.8333 56.4583C20.8333 55.5735 21.1354 54.7618 21.6375 54.1667H20.8333Z"
        fill="currentColor"
        className="text-secondary"
      />
      {/* Star */}
      <path
        d="M75 45.8333L76.9167 50.8333L82.0833 51.25L78.3333 54.5833L79.1667 59.5833L75 56.6667L70.8333 59.5833L71.6667 54.5833L67.9167 51.25L73.0833 50.8333L75 45.8333Z"
        fill="currentColor"
        className="text-secondary"
      />
    </svg>
  );
}
