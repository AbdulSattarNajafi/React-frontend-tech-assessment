import { useState, createContext, useContext, useEffect } from "react";
import { fetchTasks } from "../api/tasks";

const TasksContext = createContext({
  tasks: [],
  isLoading: false,
  getTasks: async () => {},
  setOptions: () => {},
  taskError: "",
});

export default function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState({});

  async function getTasks() {
    try {
      setIsLoading(true);
      const data = await fetchTasks(options);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, [options]);

  return (
    <TasksContext.Provider
      value={{ tasks, isLoading, getTasks, setOptions, taskError: error }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error(
      "useTasksContext must be used within a TasksContextProvider",
    );
  }

  return context;
}
