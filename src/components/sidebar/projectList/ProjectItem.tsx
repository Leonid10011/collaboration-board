type ProjectProps = {
  id: string;
  title: string;
  description?: string;
};

export default function ProjectItem({ id, title, description }: ProjectProps) {
  return (
    <div
      className="flex flex-col rounded px-2 py-4 bg-main-1 hover:cursor-pointer"
      key={id}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
