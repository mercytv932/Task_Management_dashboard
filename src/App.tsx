import { useEffect, useState } from "react";
import { filterTasks, sortTasks } from "./utils/taskUtils";
import { tasks } from "./data/Data";
import type { TaskPriority } from "./types";
import TaskList from "./components/TaskList";
import type { Task, TaskStatus } from "./types";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return tasks;
  });
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>();
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

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
    priority?: TaskPriority;
  }) {
    if (filter.status !== undefined || "status" in filter) {
      setSelectedStatus(filter.status);
    }

    if (filter.priority !== undefined || "priority" in filter) {
      setSelectedPriority(filter.priority);
    }
  }

  function handleSortChange(sortValue: string) {
    setSortBy(sortValue);
  }

  function handleAddTask(newTask: Task) {
    setTaskList([...taskList, newTask]);
  }

  function handleEditingTask(task: Task) {
    setEditingTask(task);
  }

  function handleUpdateTask(updatedTask: Task) {
    const updatedTasks = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );

    setTaskList(updatedTasks);
    setEditingTask(null);
  }

  function handleExportTasks() {
    const data = JSON.stringify(taskList, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  function handleImportTasks(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const importedTasks = JSON.parse(reader.result as string);
      setTaskList(importedTasks);
    };
    reader.readAsText(file);
  }

  const filteredTasks = filterTasks(
    taskList,
    selectedStatus,
    selectedPriority,
    search,
  );

  const sortedTasks = sortTasks(filteredTasks, sortBy);

  function handleMoveUp(taskId: string) {
    const index = taskList.findIndex((task) => task.id === taskId);

    if (index <= 0) {
      return;
    }

    const updatedTasks = [...taskList];

    [updatedTasks[index - 1], updatedTasks[index]] = [
      updatedTasks[index],
      updatedTasks[index - 1],
    ];
    setTaskList(updatedTasks);
  }

  function handleMoveDown(taskId: string) {
    const index = taskList.findIndex((task) => task.id === taskId);
    if (index === -1 || index >= taskList.length - 1) {
      return;
    }

    const updatedTasks = [...taskList];

    [updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index],
    ];
    setTaskList(updatedTasks);
  }

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Dashboard tasks={taskList} />
      <button className="theme-button" onClick={handleThemeChange}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="active-filters">
        <p>Active Filters:</p>
        {selectedStatus && (
          <span className="filter-badge">Status: {selectedStatus}</span>
        )}
        {selectedPriority && (
          <span className="filter-badge">Priority: {selectedPriority}</span>
        )}
      </div>

      <TaskFilter
        onFilterChange={handleStatusFilters}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      <TaskList
        tasks={sortedTasks}
        onDelete={handleDeleteBtn}
        onStatusChange={handleStatusChange}
        onEdit={handleEditingTask}
        onMoveUp={handleMoveUp}
        onMOveDown={handleMoveDown}
      />

      <TaskForm
        onAddTask={handleAddTask}
        editingTask={editingTask}
        onUpdateTask={handleUpdateTask}
      />

      <div className="file-actions">
        <input
          className="import-input"
          type="file"
          accept=".json"
          onChange={handleImportTasks}
        />

        <button className="export-button" onClick={handleExportTasks}>
          Export
        </button>
      </div>
    </div>
  );
}

export default App;
