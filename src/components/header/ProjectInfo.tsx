import { toUpper } from "@/lib/utils";
import InfoBlock from "../ui/InfoBlock";
import { SurfaceItem } from "../ui/surface/SurfaceItem";

type ProjectInfo = {
  projectTitle: string | null;
  role: string | null;
  onTitleChange: (text: string) => void;
  onBlur: () => void;
};

export default function ProjectInfo({
  projectTitle,
  role,
  onTitleChange,
  onBlur,
}: ProjectInfo) {
  //Will be replaced

  return (
    <div className="flex flex-row gap-4">
      <InfoBlock title="Role" className="justify-between">
        <SurfaceItem>
          <span className="text-label text-blue-400 w-[100px] hover:cursor-default">
            {role ? toUpper(role) : "User"}
          </span>
        </SurfaceItem>
      </InfoBlock>
      <InfoBlock title="Title" className="w-[240px] justify-between">
        <SurfaceItem>
          <input
            className="text-label  text-nowrap truncate hover:cursor-default"
            value={projectTitle ? projectTitle : "No Project Selected"}
            onChange={(e) => onTitleChange(e.currentTarget.value)}
            onBlur={onBlur}
            disabled={role !== "admin"}
          />
        </SurfaceItem>
      </InfoBlock>
    </div>
  );
}
