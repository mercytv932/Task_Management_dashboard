import { useEffect, useState } from "react";

import { tasks } from "./data/Data";
import TaskList from "./components/TaskList";
import type { Task, TaskStatus } from "./types";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
function App() {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return tasks;
  });
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>();
  const [selectedPriority, setSelectedPriority] = useState<
    "low" | "medium" | "high"
  >();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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
    priority?: "low" | "medium" | "high";
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

  const filteredTasks = taskList.filter((task) => {
    return (
      (!selectedStatus || task.status === selectedStatus) &&
      (!selectedPriority || task.priority === selectedPriority) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sortedTasks = [...filteredTasks];
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  if (sortBy === "title") {
    sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "priority") {
    sortedTasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
    );
  }

  const totalTasks = taskList.length;

  const pendingTasks = taskList.filter(
    (task) => task.status === "pending",
  ).length;

  const inProgressTasks = taskList.filter(
    (task) => task.status === "in-progress",
  ).length;

  const completedTasks = taskList.filter(
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

      <TaskList
        tasks={sortedTasks}
        onDelete={handleDeleteBtn}
        onStatusChange={handleStatusChange}
        onEdit={handleEditingTask}
      />
      <TaskFilter
        onFilterChange={handleStatusFilters}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      <TaskForm
        onAddTask={handleAddTask}
        editingTask={editingTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}

export default App;
