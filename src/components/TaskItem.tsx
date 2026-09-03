import type { Task, TaskStatus } from "../types";
import { formatDate } from "../utils/taskUtils";
// types/index.ts
export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

function TaskItem({ task, onStatusChange, onDelete, onEdit }: TaskItemProps) {
  function handleDelete() {
    onDelete(task.id);
  }

  function handleStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value as TaskStatus;

    onStatusChange(task.id, newStatus);
  }

  function handleEdit() {
    onEdit(task);
  }
  return (
    <div>
      <h3>title: {task.title}</h3>
      <h4>Description: {task.description}</h4>
      <h5>Status: {task.status}</h5>
      <h5>Priority: {task.priority}</h5>
      <p>Due: {formatDate(task.dueDate)}</p>
      <select value={task.status} onChange={handleStatus}>
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
