// src/components/MyButton.tsx
interface MyButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function MyButton({
  label,
  onClick,
  type = "button",
  disabled = false,
}: MyButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-bold py-2 px-4 rounded text-white ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-700"
      }`}
    >
      {label}
    </button>
  );
}



