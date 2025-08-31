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
      <path
        d="M50 1C22.923 1 1 22.923 1 50V99H99V50C99 22.923 77.077 1 50 1Z"
        className="fill-primary"
      />
      <path
        d="M91.5 91.5V50C91.5 27.093 72.907 8.5 50 8.5C27.093 8.5 8.5 27.093 8.5 50V91.5"
        stroke="hsl(var(--secondary))"
        strokeWidth="3"
      />
      <path
        d="M50 15C30.668 15 15 30.668 15 50V85H85V50C85 30.668 69.332 15 50 15Z"
        fill="url(#pattern0)"
      />
      <path
        d="M34 50C34 58.837 41.163 66 50 66C52.012 66 53.946 65.584 55.711 64.834C52.492 63.666 50 60.557 50 57C50 53.134 53.134 50 57 50H58.5C56.053 43.033 50.485 38 44 38C38.484 38 33.528 42.131 32.166 47.289C33.273 48.064 34 49.006 34 50Z"
        className="fill-secondary"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="0.1"
          height="0.1"
        >
          <use href="#image0_1_2" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_1_2"
          width="20"
          height="20"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABMSURBVHgB7dKxCQAgEETRJfcyi3cwlY3h/A9eAW0WHHoCQxB44oOQCERq5p3ZnZ21Lquqymz/2ePz3nbfvQhR1zVdx3Ee54lI9A8MAgDo9UqPZ5MAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}
