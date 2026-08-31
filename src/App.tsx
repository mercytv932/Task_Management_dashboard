import { useState } from "react";

import { tasks } from "./data/Data";
import TaskList, { type TaskStatus } from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

function App() {
  const [taskList, setTaskList] = useState(tasks);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>();

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

  function handleStatusFilters(filter: { status?: TaskStatus }) {
    setSelectedStatus(filter.status);
  }

  const filteredTasks = !selectedStatus
    ? taskList
    : taskList.filter((task) => task.status === selectedStatus);

  return (
    <div>
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteBtn}
        onStatusChange={handleStatusChange}
      />
      <TaskFilter onFilterChange={handleStatusFilters} />
    </div>
  );
}

export default App;
