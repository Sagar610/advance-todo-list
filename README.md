# Task Management Application

A React.js-based task management application with advanced features like dark mode, drag-and-drop functionality, filtering, searching, and task priority management.

## Features
- **Task Management**: Add, edit, delete, and mark tasks as completed.
- **Drag-and-Drop**: Reorganize tasks using drag-and-drop functionality (powered by `react-beautiful-dnd`).
- **Dark Mode**: Toggle between light and dark themes.
- **Filtering and Searching**:
  - Filter tasks by status: `All`, `Active`, or `Completed`.
  - Search tasks by text, priority, or tags.
- **Task Priorities**: Assign tasks a priority (`Low`, `Medium`, `High`) with dynamic styles.
- **Undo Functionality**: Revert to the previous state after a delete or other action.
- **Custom Hooks**: Manage tasks with local storage persistence.
- **Dynamic Styling**: Use TailwindCSS for responsive and dynamic designs.

## Topics Covered
This project demonstrates the following React.js concepts:

### **1. State Management**
- `useState` for managing component-level state.
- Local storage state management using a custom hook (`useLocalStorage`).

### **2. Event Handling**
- Handling user actions like clicks, input changes, and form submissions.

### **3. Conditional Rendering**
- Displaying UI elements based on specific conditions, such as empty task lists or completed tasks.

### **4. Props**
- Passing data and functions between parent and child components.

### **5. Lists and Keys**
- Rendering tasks dynamically with `.map()` and managing keys for React lists.

### **6. Forms and Controlled Components**
- Controlled inputs for tasks, priorities, and tags.

### **7. CSS Styling**
- Dynamic styling using TailwindCSS classes.

### **8. Custom Hooks**
- Implementation of `useLocalStorage` to persist tasks between page reloads.

### **9. Drag-and-Drop**
- Integration of `react-beautiful-dnd` for task reordering.

### **10. Dark Mode**
- Dark mode implementation with a toggle switch and conditional styles.

### **11. Filtering and Searching**
- Filtering tasks by their status (active, completed, or all).
- Searching tasks by text, priority, or tags.

### **12. Component-Based Architecture**
- Modular design with reusable components like `TaskList` and `TaskFilter`.

### **13. Undo Functionality**
- Storing previous states for undo operations.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
2. Install dependencies:
   npm install
3. Start the development server:
   npm start    

## Usage
Add tasks with a description, priority, and optional tags.
Filter tasks by All, Active, or Completed.
Use the search bar to find tasks based on text, priority, or tags.
Reorder tasks with drag-and-drop functionality.
Toggle between light and dark themes using the switch in the header.
## Future Enhancements
Routing: Add navigation for different task views.
Global State Management: Integrate Context API or Redux for centralized state management.
API Integration: Save tasks to a backend server or database.
Testing: Add unit tests with Jest or React Testing Library.
## Dependencies
React: Frontend library.
react-beautiful-dnd: Drag-and-drop support.
TailwindCSS: Styling framework.



License
This project is licensed under the MIT License. See the LICENSE file for details.

