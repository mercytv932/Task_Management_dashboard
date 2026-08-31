import type { Task, TaskStatus } from "./TaskList";

// types/index.ts
export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  function handleDelete() {
    onDelete(task.id);
  }

  function handleStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value as TaskStatus;

    onStatusChange(task.id, newStatus);
  }
  return (
    <div>
      <h3>title: {task.title}</h3>
      <h4>Description: {task.description}</h4>
      <h5>Status: {task.status}</h5>
      <h5>Priority: {task.priority}</h5>
      <p>Due: {task.dueDate}</p>
      <select value={task.status} onChange={handleStatus}>
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
