import React, { useState } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import useLocalStorage from "./hooks/useLocalStorage";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [taskText, setTaskText] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskTags, setTaskTags] = useState("");
  const [currentFilter, setFilter] = useState("All");
  const [editTaskId, setEditTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [previousTasks, setPreviousTasks] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = '#121212'; // Set background color to black

    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = ''; // Reset to default background

    }
  };

  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: taskPriority,
      tags: taskTags.split(",").map((tag) => tag.trim()),
    };

    if (editTaskId) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId
            ? { ...task, text: taskText, priority: taskPriority, tags: taskTags.split(",").map((tag) => tag.trim()) }
            : task
        )
      );
      setEditTaskId(null);
    } else {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setTaskText("");
    setTaskPriority("Low");
    setTaskTags("");
  };

  const deleteTask = (id) => {
    setPreviousTasks(tasks);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskText(taskToEdit.text);
    setTaskPriority(taskToEdit.priority);
    setTaskTags(taskToEdit.tags.join(", "));
    setEditTaskId(id);
  };

  const deleteSelectedTasks = () => {
    setPreviousTasks(tasks);
    setTasks((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };

  const markSelectedAsCompleted = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        selectedTasks.includes(task.id) ? { ...task, completed: true } : task
      )
    );
    setSelectedTasks([]);
  };

  const undoLastAction = () => {
    setTasks(previousTasks);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (currentFilter === "All") return true;
      if (currentFilter === "Active") return !task.completed;
      if (currentFilter === "Completed") return task.completed;
      return true;
    })
    .filter((task) => {
      return (
        task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    })
    .sort((a, b) => {
      const priorityOrder = { Low: 1, Medium: 2, High: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  return (
    <div className={`container mx-auto p-4 ${darkMode ? "dark" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-3xl font-bold ${ darkMode ? "text-gray-200" : "text-gray-800"}`}>Task Management Application</h1>
        {/* <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Search tasks..."
          />
         
          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Toggle Dark Mode
          </button>
        </div> */}

        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-full w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Search tasks..."
          />
          <label className="relative inline-block w-10 h-6 bg-gray-500 rounded-xl">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            {/* Toggle Background */}
            <span className="w-full h-full bg-gray-900 peer-focus:ring-2 peer-focus:ring-black rounded-full shadow-inner peer-checked:bg-black transition"></span>
            {/* Toggle Knob */}
            <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-white rounded-full shadow peer-checked:translate-x-4 peer-checked:bg-gray-800 transition"></span>
          </label>
        </div>



      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="border p-2 rounded w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Enter a task"
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="text"
          value={taskTags}
          onChange={(e) => setTaskTags(e.target.value)}
          className="border p-2 rounded w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Enter task tags (comma separated)"
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
        >
          {editTaskId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <TaskFilter setFilter={setFilter} currentFilter={currentFilter} />

      <div className="mb-6 flex gap-4">
        <button
          onClick={deleteSelectedTasks}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
        >
          Delete Selected
        </button>
        <button
          onClick={markSelectedAsCompleted}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
        >
          Mark as Completed
        </button>
        <button
          onClick={undoLastAction}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          Undo Last Action
        </button>
      </div>

      <DragDropContext onDragEnd={(result) => { }}>
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
      </DragDropContext>
    </div >
  );
}

export default App;
