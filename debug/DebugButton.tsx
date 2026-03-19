import { on } from "events";

export default function DebugButton({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  const handleOnClick = () => {
    try {
      onClick();
    } catch (error) {
      console.error("Error in DebugButton onClick:", error);
    }
  };
  return (
    <button className="border p-2" onClick={onClick}>
      {title}
    </button>
  );
}
