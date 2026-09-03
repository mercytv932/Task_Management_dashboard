import type { TaskListProps } from "../types";

import TaskItem from "./TaskItem";

function TaskList({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
  return (
    <div className="task-list">
      <h2 className="task-list-title">Tasks</h2>

      <div className="task-list-container">
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
    </div>
  );
}

export default TaskList;
