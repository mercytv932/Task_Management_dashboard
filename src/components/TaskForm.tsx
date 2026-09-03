import { useState } from "react";
import type { Task, TaskStatus } from "./TaskList";

interface TaskFormProps {
  onAddTask: (newTask: Task) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === "") {
      setError("title is empty!");
      return;
    } else if (description === "") {
      setError("description is empty!");
      return;
    } else if (dueDate === "") {
      setError("due date is required!");
      return;
    }
    setError("");
    addTask();

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
    const selectedPriority = event.target.value as "low" | "medium" | "high";
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
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
