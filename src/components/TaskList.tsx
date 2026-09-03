import type { Task, TaskStatus } from "../types";

import TaskItem from "./TaskItem";

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

function TaskList({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
