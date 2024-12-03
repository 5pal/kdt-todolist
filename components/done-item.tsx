import Link from "next/link";

interface DoneItemProps {
  id: string;
  name: string;
  isCompleted: boolean;
  onToggle: () => void;
}

const DoneItem: React.FC<DoneItemProps> = ({ id, name, onToggle }) => {
  return (
    <span className="flex h-14 w-full items-center rounded-full border-2 border-black bg-violet-100 p-4 font-nanumSquareRegular text-[16px] line-through">
      <svg
        className="mr-2 cursor-pointer"
        onClick={onToggle}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#7C3AED" />
        <path
          d="M8 16.2857L13.8182 22L24 12"
          stroke="#FEFCE8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Link href={`/items/${id}`}>{name}</Link>
    </span>
  );
};
export default DoneItem;
