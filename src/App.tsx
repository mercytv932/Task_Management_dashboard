import { useState } from "react";

import { tasks } from "./data/Data";
import TaskList, { type TaskStatus } from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
function App() {
  const [taskList, setTaskList] = useState(tasks);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>();
  const [selectedPriority, setSelectedPriority] = useState<
    "low" | "medium" | "high"
  >();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  function handleSearchChange(searchValue: string) {
    setSearch(searchValue);
  }

  function handleDeleteBtn(taskId: string) {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);

    setTaskList(updatedTasks);
  }

  function handleStatusChange(taskId: string, newStatus: TaskStatus) {
    const tasksAfterStatusChange = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task,
    );

    setTaskList(tasksAfterStatusChange);
  }

  function handleStatusFilters(filter: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) {
    if (filter.status !== undefined || "status" in filter) {
      setSelectedStatus(filter.status);
    }

    if (filter.priority !== undefined || "priority" in filter) {
      setSelectedPriority(filter.priority);
    }
  }

  const filteredTasks = taskList.filter((task) => {
    return (
      (!selectedStatus || task.status === selectedStatus) &&
      (!selectedPriority || task.priority === selectedPriority) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteBtn}
        onStatusChange={handleStatusChange}
      />
      <TaskFilter
        onFilterChange={handleStatusFilters}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
}

export default App;
