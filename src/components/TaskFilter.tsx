import type { TaskStatus } from "./TaskList";
// types/index.ts
export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => void;
}

function TaskFilter({ onFilterChange }: TaskFilterProps) {
  function handleStatusFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedStatus = event.target.value;

    onFilterChange({
      status:
        newSelectedStatus === "all"
          ? undefined
          : (newSelectedStatus as TaskStatus),
    });
  }

  return (
    <div>
      <h3>Filter Tasks</h3>
      <select onChange={handleStatusFilter}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default TaskFilter;
