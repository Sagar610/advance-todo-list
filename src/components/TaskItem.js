import React from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  return (
    <li
      className={`flex items-center justify-between p-4 border rounded shadow-sm ${
        task.completed ? "opacity-50 line-through" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="form-checkbox"
        />
        <span className="flex-grow">{task.text}</span>
        <span
          className={`px-2 py-1 rounded text-sm font-semibold ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(task.id)}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
 