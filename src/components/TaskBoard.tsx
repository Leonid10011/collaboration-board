import Column from "./taskboard/Column";

export default function TaskBoard() {
  const mockColumns = [
    {
      id: 1,
      statusColor: "gray",
      name: "Backlog",
      count: 3,
    },
    {
      id: 2,
      statusColor: "yellow",
      name: "In Progress",
      count: 2,
    },
    {
      id: 3,
      statusColor: "green",
      name: "Done",
      count: 5,
    },
  ];

  return (
    <div className="flex flex-col flex-1 gap-4 px-4 py-2">
      <h1>Task Board</h1>
      <div className="flex flex-row gap-x-8 h-full">
        {mockColumns.map((c) => (
          <Column
            key={c.id}
            statusColor={c.statusColor}
            name={c.name}
            count={c.count}
          />
        ))}
      </div>
    </div>
  );
}
