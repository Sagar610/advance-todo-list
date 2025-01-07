import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

function TaskList({
  tasks,
  onDelete,
  onToggle,
  onEdit,
  selectedTasks,
  setSelectedTasks,
}) {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode 
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const toggleTaskSelection = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className={`p-4 ${darkMode ? "dark" : ""}`}>
 

  <Droppable droppableId="task-list">
    {(provided) => (
      <ul
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="space-y-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md p-4"
      >
        {tasks.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No tasks found.
            </div>
          ) : (tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`flex items-center justify-between p-4 border rounded-md shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 ${
                  selectedTasks.includes(task.id)
                    ? "ring-2 ring-gray-300 dark:ring-gray-600"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => toggleTaskSelection(task.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                  />
                  <span
                    onClick={() => onToggle(task.id)}
                    className={`cursor-pointer ${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-full ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => onEdit(task.id)}
                    className="px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="px-2 py-1 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            )}
          </Draggable>
        )))}
        {provided.placeholder}
      </ul>
    )}
  </Droppable>
</div>

  );
}

export default TaskList;
