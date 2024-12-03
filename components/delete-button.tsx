import { SquareButtonProps } from "@/lib/type";

export default function DeleteButton({
  icon,
  title,
  onClick,
}: SquareButtonProps) {
  return (
    <span
      className={"primary-button flex bg-rose-500 text-white"}
      onClick={onClick}
    >
      {icon}
      {title}
    </span>
  );
}
