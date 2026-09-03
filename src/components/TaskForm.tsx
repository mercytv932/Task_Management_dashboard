import { useState } from "react";

function TaskForm() {
  const [title, setTitle] = useState("");

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const titleChange = event.target.value;
    setTitle(titleChange);
  }
  return (
    <form>
      <div>
        <label>Title</label>
        <input value={title} onChange={handleTitleChange} type="text" />
        <label>Description</label>
        <textarea></textarea>
      </div>
      <div>
        <label>Status</label>
        <select>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label>Priority</label>
        <select>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div>
          <label>Due Date</label>
          <input type="date" />
        </div>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
