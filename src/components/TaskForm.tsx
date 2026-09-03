import { useState } from "react";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
  }

  function handlePriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedPriority = event.target.value;
    setPriority(selectedPriority);
  }

  function handleDueDate(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedDate = event.target.value;
    setDueDate(selectedDate);
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
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
