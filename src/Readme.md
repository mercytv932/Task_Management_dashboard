# React Task Manager

A task management application built with React and TypeScript. This project was created to practice React concepts such as components, props, state, event handling, list rendering, filtering, and TypeScript.

## Features

- Display a list of tasks
- View task title, description, status, priority, and due date
- Change the status of a task
- Delete tasks
- Filter tasks by status
- Display tasks using reusable React components

## Task Status Options

Tasks can have one of the following statuses:

- Pending
- In Progress
- Completed

## Task Priority Options

Each task can have one of the following priority levels:

- Low
- Medium
- High

## Built With

- React
- TypeScript
- Vite
- HTML
- CSS

## React Concepts Practiced

This project helped me practice:

- React functional components
- Props
- TypeScript interfaces and types
- `useState`
- Event handling
- Callback functions
- Controlled select elements
- Rendering lists with `.map()`
- Filtering arrays with `.filter()`
- Updating array state
- Conditional filtering
- Component communication

## Component Structure

### App

Manages the main task state and handles task updates, deletion, and filtering.

### TaskList

Receives the tasks from the parent component and uses `.map()` to render a `TaskItem` for each task.

### TaskItem

Displays the information for an individual task. It also allows the user to change the task's status or delete the task.

### TaskFilter

Allows the user to filter the displayed tasks by status:

- All
- Pending
- In Progress
- Completed

### Data

The initial task data is stored separately in `data.ts` as an array of task objects.

## Task Structure

Each task contains:

- ID
- Title
- Description
- Status
- Priority
- Due date

## What I Learned

While building this project, I practiced how data moves between React components using props and callback functions. I also learned how to update an array of objects in state without directly modifying the original array.

I practiced using `.map()` to update tasks, `.filter()` to delete and filter tasks, and TypeScript to make sure task data follows the correct structure.

## Future Improvements

This project will be expanded into a larger Task Management Dashboard with features such as:

- Add new tasks
- Edit tasks
- Priority filtering
- Search
- Sorting
- Form validation
- Task statistics
- Local storage
- Light and dark mode
