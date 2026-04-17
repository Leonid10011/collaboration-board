import { SurfaceRow } from "@/components/ui/surface/SurfaceItem";
import { Book, Trash2 } from "lucide-react";

type ProjectProps = {
  title: string;
  description?: string;
  onClick?: () => void;
  onMouseEnter: () => void;
};

export default function ProjectItem({
  title,
  onClick,
  onMouseEnter,
}: ProjectProps) {
  return (
    <SurfaceRow
      className="text-sm group"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <Book height={16} width={16} className="mr-2" strokeWidth={1.25} />
      <p className="w-[60%] text-nowrap truncate ">{title}</p>
    </SurfaceRow>
  );
}
