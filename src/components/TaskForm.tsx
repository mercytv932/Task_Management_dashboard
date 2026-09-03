import { useEffect, useState } from "react";
import type { Task, TaskFormProps, TaskStatus, TaskPriority } from "../types";
import { validateTask } from "../utils/taskUtils";

function TaskForm({ onAddTask, editingTask, onUpdateTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [priority, setPriority] = useState<TaskPriority>("low");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateTask(title, description, dueDate);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    if (editingTask) {
      const updatedTask: Task = {
        id: editingTask.id,
        title,
        description,
        status,
        priority,
        dueDate,
      };
      onUpdateTask(updatedTask);
    } else {
      addTask();
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("pending");
    setPriority("low");
  };

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const titleChange = event.target.value;
    setTitle(titleChange);
  }

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const descriptionChange = event.target.value;
    setDescription(descriptionChange);
  }

  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedStatus = event.target.value as TaskStatus;
    setStatus(selectedStatus);
  }

  function handlePriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedPriority = event.target.value as TaskPriority;
    setPriority(selectedPriority);
  }

  function handleDueDate(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedDate = event.target.value;
    setDueDate(selectedDate);
  }

  function addTask() {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      status: status,
      priority: priority,
      dueDate: dueDate,
    };
    onAddTask(newTask);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input value={title} onChange={handleTitleChange} type="text" />
        <label>Description</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label>Priority</label>
        <select value={priority} onChange={handlePriorityChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div>
          <label>Due Date</label>
          <input value={dueDate} onChange={handleDueDate} type="date" />
        </div>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">{editingTask ? "Save" : "Add Task"}</button>
    </form>
  );
}

export default TaskForm;
