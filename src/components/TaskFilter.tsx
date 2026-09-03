import type { TaskStatus } from "../types";
// types/index.ts
export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => void;

  onSearchChange: (search: string) => void;

  onSortChange: (sortValue: string) => void;
}

function TaskFilter({
  onFilterChange,
  onSearchChange,
  onSortChange,
}: TaskFilterProps) {
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

  function handleSorting(event: React.ChangeEvent<HTMLSelectElement>) {
    const sortedValue = event.target.value;

    onSortChange(sortedValue);
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

      <select onChange={handleSorting}>
        <option value="default">Sort By</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default TaskFilter;
