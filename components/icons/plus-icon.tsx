export default function PlusIcon({ isActive = false }: { isActive?: boolean }) {
  return (
    <svg
      className="mr-2"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8L14 8"
        stroke={isActive ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 14L8 2"
        stroke={isActive ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
