import React from "react";


function TaskFilter({ setFilter, currentFilter }) {
  return (
    <div className="mb-4">
      <button
        className={`mr-2 ${currentFilter === "All" ? "text-blue-500" : "text-gray-500"}`}
        onClick={() => setFilter("All")}
      >
        ALL
      </button>
      <button
        className={`mr-2 ${currentFilter === "Active" ? "text-blue-500" : "text-gray-500"}`}
        onClick={() => setFilter("Active")}
      >
        Active
      </button>
      <button
        className={`mr-2 ${currentFilter === "Completed" ? "text-blue-500" : "text-gray-500"}`}
        onClick={() => setFilter("Completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default TaskFilter;
