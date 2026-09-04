import type { TaskItemProps, TaskStatus } from "../types";
import { formatDate } from "../utils/taskUtils";

function TaskItem({
  task,
  onStatusChange,
  onDelete,
  onEdit,
  onMoveUp,
  onMOveDown,
}: TaskItemProps) {
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
  function handleMoveUp() {
    onMoveUp(task.id);
  }

  function handleMoveDown() {
    onMOveDown(task.id);
  }
  return (
    <div className="task-card">
      <div className="task-info">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>

        <div className="task-details">
          <span className="task-status">Status: {task.status}</span>
          <span className="task-priority">Priority: {task.priority}</span>
          <span className="task-date">Due: {formatDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="task-actions">
        <select
          className="status-select"
          value={task.status}
          onChange={handleStatus}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="move-button" onClick={handleMoveUp}>
          ⌃
        </button>
        <button className="move-button" onClick={handleMoveDown}>
          {" "}
          ⌄
        </button>

        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>

        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
