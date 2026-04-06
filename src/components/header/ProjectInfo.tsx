import { toUpper } from "@/lib/utils";
import InfoBlock from "../ui/InfoBlock";

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
    <div className="flex flex-row">
      <InfoBlock title="Role" className="justify-between">
        <span className="text-green-600 text-xl w-[100px]">
          {role ? toUpper(role) : "User"}
        </span>
      </InfoBlock>
      <InfoBlock title="Title" className="w-[240px] justify-between">
        <input
          className="text-meta text-lg font-semibold  text-nowrap truncate"
          value={projectTitle ? projectTitle : "No Project Selected"}
          onChange={(e) => onTitleChange(e.currentTarget.value)}
          onBlur={onBlur}
          disabled={role !== "admin"}
        />
      </InfoBlock>
    </div>
  );
}
