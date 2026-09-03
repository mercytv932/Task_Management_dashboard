import type { Task, TaskStatus } from "../types";

export function filterTasks(
  tasks: Task[],
  status?: TaskStatus,
  priority?: "low" | "medium" | "high",
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
