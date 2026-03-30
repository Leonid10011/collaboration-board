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
    <div
      className="flex flex-col rounded px-2 py-4 bg-main-1 hover:cursor-pointer"
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
