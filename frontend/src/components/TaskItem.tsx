import { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

import useOutsideClick from "../hooks/useOutsideClick";
import { cn } from "../lib/util";
import { updateTask } from "../api/tasks";
import { useTasksContext } from "../contexts/TasksContext";

function TaskItem({ task }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useOutsideClick(() => setShowDropdown(false));
  const { getTasks } = useTasksContext();
  const [error, setError] = useState("");

  async function updateStatusHandler(status) {
    try {
      await updateTask(task.id, { status });
      setShowDropdown(false);
      getTasks();
    } catch (error) {
      console.error(error);
      setError("Failed to update task status.");
    }
  }

  return (
    <div className="rounded-md border border-stone-200 bg-white p-3 md:p-4">
      <div className="mb-3 flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded px-3 py-1 text-sm capitalize sm:px-4 sm:text-base",
            task.status === "in-progress" && "bg-blue-100/80 text-blue-500",
            task.status === "completed" && "bg-green-100/80 text-green-500",
            task.status === "pending" && "bg-amber-100/80 text-amber-500",
          )}
        >
          {task.status}
        </span>

        <div className="relative shrink-0">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg transition duration-300 hover:bg-gray-100",
              showDropdown && "bg-gray-100",
            )}
          >
            <FaEllipsisVertical />
          </button>

          <div
            className={cn(
              "absolute top-full right-0 z-20 hidden w-36 pt-1",
              showDropdown && "block",
            )}
            ref={ref}
          >
            <div className="flex flex-col gap-1 rounded border border-stone-100 bg-white p-2 shadow-md sm:p-2.5">
              <button
                onClick={(e) => updateStatusHandler("pending")}
                disabled={task.status === "pending"}
                className="rounded bg-amber-100/80 px-2 py-1 text-center text-sm text-amber-500 transition-all duration-200 hover:bg-amber-200/80 disabled:cursor-not-allowed disabled:bg-amber-100/80 sm:text-base"
              >
                Pending
              </button>
              <button
                onClick={(e) => updateStatusHandler("in-progress")}
                disabled={task.status === "in-progress"}
                className="rounded bg-blue-100/80 px-2 py-1 text-center text-sm text-blue-500 transition-all duration-200 hover:bg-blue-200/80 disabled:cursor-not-allowed disabled:bg-blue-100/80 sm:text-base"
              >
                In-Progress
              </button>
              <button
                onClick={(e) => updateStatusHandler("completed")}
                disabled={task.status === "completed"}
                className="rounded bg-green-100/80 px-2 py-1 text-center text-sm text-green-500 transition-all duration-200 hover:bg-green-200/80 disabled:cursor-not-allowed disabled:bg-green-100/80 sm:text-base"
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="line-clamp-2">{task.description}</p>

      <div className="mt-2.5 flex items-center justify-between">
        <time className="inline-block text-sm sm:text-base">
          Due Date: <span className="text-stone-600">{task.dueDate}</span>
        </time>
        <span
          className={cn(
            "inline-flex items-center justify-center rounded px-3 py-1 text-sm capitalize sm:px-4 sm:text-base",
            task.priority === "high" && "bg-red-100/80 text-red-500",
            task.priority === "medium" && "bg-amber-100/80 text-amber-500",
            task.priority === "low" && "bg-blue-100/80 text-blue-500",
          )}
        >
          {task.priority}
        </span>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default TaskItem;
