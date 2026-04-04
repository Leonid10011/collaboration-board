import InfoBlock from "../ui/InfoBlock";

type ProjectInfo = {
  projectTitle: string | null;
  role: string | null;
};

export default function ProjectInfo({ projectTitle, role }: ProjectInfo) {
  //Will be replaced

  return (
    <InfoBlock title="Project Info">
      <div className="flex flex-row gap-4 justify-start align-center w-[300px]">
        <span className="text-green-600 text-xl w-[100px]">
          {role ? role : "User"}
        </span>
        <span className="text-meta text-lg font-semibold">
          {projectTitle ? projectTitle : "No Project Selected"}
        </span>
      </div>
    </InfoBlock>
  );
}
