import type { Task } from "../types";

interface DashboardProps {
  tasks: Task[];
}

function Dashboard({ tasks }: DashboardProps) {
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  return (
    <div>
      <div>
        <h2>Dashboard</h2>
        <p>Total Tasks: {totalTasks}</p>
        <p>Pending: {pendingTasks}</p>
        <p>In Progress: {inProgressTasks}</p>
        <p>Completed: {completedTasks}</p>
      </div>
    </div>
  );
}

export default Dashboard;
