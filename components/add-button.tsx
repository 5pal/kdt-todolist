interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

const AddButton: React.FC<AddButtonProps> = ({
  title,
  icon,
  isActive = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`primary-button hidden md:flex ${
        isActive ? "bg-violet-600 text-white" : "bg-slate-300 text-black"
      }`}
    >
      {icon}
      {title}
    </button>
  );
};

export default AddButton;
