import Header from "./Header";
import Sidebar from "./Sidebar";
import TaskBoard from "./TaskBoard";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-row flex-1">
        <Sidebar />
        <TaskBoard />
      </div>
    </div>
  );
}
