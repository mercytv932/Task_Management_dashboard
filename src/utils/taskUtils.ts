import type { Task, TaskStatus, TaskPriority } from "../types";

export function filterTasks(
  tasks: Task[],
  status?: TaskStatus,
  priority?: TaskPriority,
  search: string = "",
) {
  return tasks.filter((task) => {
    return (
      (!status || task.status === status) &&
      (!priority || task.priority === priority) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });
}

export function sortTasks(tasks: Task[], sortBy: string) {
  const sortedTasks = [...tasks];

  const priorityOrder: Record<Task["priority"], number> = {
    high: 1,
    medium: 2,
    low: 3,
  };
  if (sortBy === "title") {
    sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "priority") {
    sortedTasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
    );
  }
  return sortedTasks;
}

export function validateTask(
  title: string,
  description: string,
  dueDate: string,
) {
  if (title === "") {
    return "title is empty!";
  } else if (description === "") {
    return "description is empty!";
  } else if (dueDate === "") {
    return "due date is required!";
  }

  return "";
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
