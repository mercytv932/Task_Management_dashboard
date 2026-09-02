import type { TaskStatus } from "./TaskList";
// types/index.ts
export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => void;

  onSearchChange: (search: string) => void;
}

function TaskFilter({ onFilterChange, onSearchChange }: TaskFilterProps) {
  function handleStatusFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedStatus = event.target.value;

    onFilterChange({
      status:
        newSelectedStatus === "all"
          ? undefined
          : (newSelectedStatus as TaskStatus),
    });
  }

  function handlePriorityFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    const priorityFilter = event.target.value;

    onFilterChange({
      priority:
        priorityFilter === "all"
          ? undefined
          : (priorityFilter as "low" | "medium" | "high"),
    });
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;
    onSearchChange(searchValue);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="search anything..."
        onChange={handleSearch}
      />
      <h3>Filter Tasks</h3>
      <select onChange={handleStatusFilter}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select onChange={handlePriorityFilter}>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select>
        <option value="default">Sort By</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}

export default TaskFilter;
