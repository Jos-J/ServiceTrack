// src/components/MyButton.tsx
interface MyButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function MyButton({ label, onClick, type = "button" }: MyButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      {label}
    </button>
  );
}


