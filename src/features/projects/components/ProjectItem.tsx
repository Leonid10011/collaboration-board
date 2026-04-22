import { SurfaceRow } from "@/components/ui/surface/SurfaceItem";
import { Book } from "lucide-react";
import Link from "next/link";

type ProjectProps = {
  title: string;
  description?: string;
  onMouseEnter: () => void;
  id: string;
};

export default function ProjectItem({ title, onMouseEnter, id }: ProjectProps) {
  return (
    <Link
      href={{
        pathname: `/projects/${id}`,
        query: { projectId: id },
      }}
    >
      <SurfaceRow className="text-sm group" onMouseEnter={onMouseEnter}>
        <Book height={16} width={16} className="mr-2" strokeWidth={1.25} />
        <p className="w-[60%] text-nowrap truncate ">{title}</p>
      </SurfaceRow>
    </Link>
  );
}
