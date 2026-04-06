import { SurfaceRow } from "@/components/ui/surface/SurfaceItem";
import { Book, Trash2 } from "lucide-react";

type ProjectProps = {
  title: string;
  description?: string;
  onClick?: () => void;
  onDelete: () => Promise<void>;
};

export default function ProjectItem({
  title,
  description,
  onClick,
  onDelete,
}: ProjectProps) {
  return (
    <SurfaceRow className="text-sm group" onClick={onClick}>
      <Book height={16} width={16} className="mr-2" strokeWidth={1.25} />
      <p className="w-[60%] text-nowrap truncate ">{title}</p>
      <Trash2
        className="ml-auto text-meta opacity-0 group-hover:opacity-100 hover:text-meta/75 rounded-md h-4 w-4"
        strokeWidth={1.25}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
    </SurfaceRow>
  );
}
