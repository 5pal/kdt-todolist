import { SquareButtonProps } from "@/lib/type";

export default function DeleteButton({
  icon,
  title,
  isActive = false,
}: SquareButtonProps) {
  return (
    <span className={"primary-button flex bg-rose-500 text-white"}>
      {icon}
      {title}
    </span>
  );
}
