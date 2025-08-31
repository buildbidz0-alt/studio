export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1_2)">
        <path
          d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0Z"
          className="fill-primary"
        />
        <path
          opacity="0.2"
          d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50H2L50 48L98 50H100Z"
          fill="url(#paint0_linear_1_2)"
        />
        <path
          d="M87.5 52V50C87.5 31.9567 74.0754 16.0312 56.4482 12.5733C54.3806 12.1818 52.2311 12 50 12C28.9837 12 12 28.9837 12 50V52L50 50L87.5 52Z"
          className="fill-secondary"
        />
        <path
          d="M50 19C32.8792 19 19 32.8792 19 50V51H81V50C81 32.8792 67.1208 19 50 19Z"
          className="fill-background"
        />
        <path
          d="M62.5 50C62.5 56.9036 56.9036 62.5 50 62.5C43.0964 62.5 37.5 56.9036 37.5 50C37.5 43.0964 43.0964 37.5 50 37.5C56.9036 37.5 62.5 43.0964 62.5 50Z"
          stroke="hsl(var(--primary))"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <path
          d="M50 34.5C51.488 34.5 52.9158 34.9103 54.1417 35.67C51.6883 36.93 50 39.5133 50 42.5C50 45.8156 52.6844 48.5 56 48.5H57C55.0741 53.6559 50.4127 57 45 57C40.0294 57 35.7981 53.6935 34.3311 49.2081C35.0322 48.6013 35.5 47.7478 35.5 46.8C35.5 45.9867 35.1583 45.24 34.5883 44.67C36.0825 38.8688 40.59 34.5 46.5 34.5H50Z"
          className="fill-secondary"
        />
        <path
          opacity="0.3"
          d="M19 51H81V81H19V51Z"
          fill="url(#paint1_pattern_1_2)"
        />
        <path
          opacity="0.3"
          d="M19 51H81V81H19V51Z"
          fill="url(#paint2_radial_1_2)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1_2"
          x1="50"
          y1="50"
          x2="50"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_1_2"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(50 51) rotate(90) scale(30)"
        >
          <stop stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="1" stopColor="#006B56" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="paint1_pattern_1_2"
          patternContentUnits="objectBoundingBox"
          width="0.129032"
          height="0.129032"
        >
          <use href="#image0_1_2" transform="scale(0.00416129)" />
        </pattern>
        <clipPath id="clip0_1_2">
          <rect width="100" height="100" fill="white" />
        </clipPath>
        <image
          id="image0_1_2"
          width="31"
          height="31"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJRSURBVHgB7ZRtSFNhGMd/8w9RZCgoQ19BREREUdFFh3QR3UXdVRfRXRAEAcFBRBFEpNAg0dJSEMpgpWlFmmloCwo5lvKe5y45mXO/5+5p7s194AceeH/e93x/nvd5nvd5ni+IkYghsNRiIIKj8ESGSyqFp7AEPsJzOFJgh8xizQSwV+PvkQc8gQe0sAHeQhSg6vlfpBPPIfgPISg2yU63GznT93wM12AEXoW3sBHmQzQohb2Yj8U2zXIMjifYh6kGkM/p/cAh+b0s8M9S0w3kR/prFEGfxM+sI3w/xWzYf8lZOn8B2MdVfE5bEUTyB9SlsQ37eQwQxnmcRzPsAjfCnzgW5yK+w/g0zYg8eQ9jK1X2Q3m5/hYexFk/gKZxB2QzfyfVog5MRrcYpds8zGA3uHf9W1k/k7/Jk5/Et+wzO4fIZfklzGk3Uv2MyzB88kCAt3Y/GzYj/o8T/egeV7A/jW38bvoeDyK52hQn/8BGKaUGL1dCg29zY3dUDScz8v6+D/eRoT2YgRUn4L88hH5yDR+B0WJt1hMvwAz2D/uH4l9yyTAfowFvYF8OIvXkGvYh/vgwP0kL8G3+L8q6Bq2oZehL5B/xUu4kP8X5z8d2yL4w0U3eF/O8g/D5lM8iufxG+yDq2YfFfINz2G3iD/hLNxKfxu/j/DpBf4YvY/iN2Sc/iGexv8T13Qb/Bk/ibvwr/wA/Yf+YHmP1gJ0N/yZ+w/0x/CWub9hr/Jcw/90d40Yy/h/wJI/AV/gX8x/D+V+QX/h/kvkXv4Q328Xfb4h/sB/iCeyw2McbjM1vGz+Jn1hOeyv8E2bH/ivI3rQyfl7M8w9GgAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
}
