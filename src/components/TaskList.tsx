import type { TaskListProps } from "../types";

import TaskItem from "./TaskItem";

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
