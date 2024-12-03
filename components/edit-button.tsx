import { SquareButtonProps } from "@/lib/type";

export default function EditButton({
  icon,
  title,
  isActive = false,
  onClick,
}: SquareButtonProps) {
  return (
    <span
      className={`primary-button flex ${
        isActive ? "bg-lime-300" : "bg-slate-300"
      }`}
      onClick={onClick}
    >
      {icon}
      {title}
    </span>
  );
}
