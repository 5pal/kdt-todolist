export default function CheckIcon({
  isActive = false,
}: {
  isActive?: boolean;
}) {
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
        d="M2 7L6.5 11.5L14 4"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}