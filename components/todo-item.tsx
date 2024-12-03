import Link from "next/link";

interface TodoItem {
  id: string;
  name: string;
  isCompleted: boolean;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItem> = ({ id, name, onToggle }) => {
  return (
    <span className="flex h-14 w-full items-center rounded-full border-2 border-black p-4 font-nanumSquareRegular text-[16px]">
      <svg
        className="mr-2 cursor-pointer"
        onClick={onToggle}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="#FEFCE8"
          stroke="#0F172A"
          strokeWidth="2"
        />
      </svg>
      <Link href={`/items/${id}`}>{name}</Link>
    </span>
  );
};

export default TodoItem;
