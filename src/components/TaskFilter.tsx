import type { TaskFilterProps, TaskStatus, TaskPriority } from "../types";
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
        priorityFilter === "all" ? undefined : (priorityFilter as TaskPriority),
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
    <div className="task-filter">
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        onChange={handleSearch}
      />

      <h3 className="filter-title">Filter Tasks</h3>

      <div className="filter-controls">
        <select className="filter-select" onChange={handleStatusFilter}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select className="filter-select" onChange={handlePriorityFilter}>
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select className="filter-select" onChange={handleSorting}>
          <option value="default">Sort By</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;
