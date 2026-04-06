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
    <InfoBlock title="Project Info">
      <div className="flex flex-row gap-4 justify-start align-center w-[300px]">
        <span className="text-green-600 text-xl w-[100px]">
          {role ? role : "User"}
        </span>
        <input
          className="text-meta text-lg font-semibold"
          value={projectTitle ? projectTitle : "No Project Selected"}
          onChange={(e) => onTitleChange(e.currentTarget.value)}
          onBlur={onBlur}
          disabled={role !== "admin"}
        />
      </div>
    </InfoBlock>
  );
}
