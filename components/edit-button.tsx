import { SquareButtonProps } from "@/lib/type";

export default function EditButton({
  icon,
  title,
  isActive = false,
}: SquareButtonProps) {
  return (
    <span
      className={`primary-button flex ${
        isActive ? "bg-lime-300 text-white" : "bg-slate-300 text-black"
      }`}
    >
      {icon}
      {title}
    </span>
  );
}
