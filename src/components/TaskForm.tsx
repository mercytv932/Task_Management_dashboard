function TaskForm() {
  return (
    <form>
      <div>
        <label>Title</label>
        <input type="text" />
        <label>Description</label>
        <textarea></textarea>
      </div>
      <div>
        <select>
          <label>Status</label>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select>
          <label>Priority</label>
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
