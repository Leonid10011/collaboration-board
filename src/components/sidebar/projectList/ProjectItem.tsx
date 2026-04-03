import { SurfaceRow } from "@/components/ui/surface/SurfaceItem";
import { Book } from "lucide-react";

type ProjectProps = {
  title: string;
  description?: string;
  onClick?: () => void;
};

export default function ProjectItem({
  title,
  description,
  onClick,
}: ProjectProps) {
  return (
    <SurfaceRow className="text-sm" onClick={onClick}>
      <Book height={16} width={16} className="mr-2" />
      <h3>{title}</h3>
      <p>{description}</p>
    </SurfaceRow>
  );
}
