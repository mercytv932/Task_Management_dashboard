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
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <p>Total Tasks</p>
          <h3>{totalTasks}</h3>
        </div>

        <div className="stat-card">
          <p>Pending</p>
          <h3>{pendingTasks}</h3>
        </div>

        <div className="stat-card">
          <p>In Progress</p>
          <h3>{inProgressTasks}</h3>
        </div>

        <div className="stat-card">
          <p>Completed</p>
          <h3>{completedTasks}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
