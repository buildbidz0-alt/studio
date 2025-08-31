export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5C13.38 9.5 14.5 10.62 14.5 12Z"
        fill="currentColor"
        className="text-secondary"
        fillOpacity="0.8"
      />
      <path
        d="M19.95 11H17.67C17.39 9.38 16.62 7.93 15.54 6.74L17.07 5.21C18.69 6.83 19.68 8.83 19.95 11ZM4.05 11H6.33C6.61 9.38 7.38 7.93 8.46 6.74L6.93 5.21C5.31 6.83 4.32 8.83 4.05 11ZM8.46 17.26C7.38 16.07 6.61 14.62 6.33 13H4.05C4.32 15.17 5.31 17.17 6.93 18.79L8.46 17.26ZM15.54 17.26L17.07 18.79C18.69 17.17 19.68 15.17 19.95 13H17.67C17.39 14.62 16.62 16.07 15.54 17.26Z"
        fill="currentColor"
        className="text-secondary"
      />
    </svg>
  );
}
