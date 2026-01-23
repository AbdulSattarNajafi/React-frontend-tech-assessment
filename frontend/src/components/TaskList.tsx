import TaskItem from "./TaskItem";
import { useTasksContext } from "../contexts/TasksContext";
import Loader from "./Loader";
import Filter from "./Filter";
import { priorityOptions, statusOptions } from "../lib/constants";

function TaskList() {
  const { tasks, isLoading, taskError } = useTasksContext();

  return (
    <section className="rounded-md bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-stone-200 px-4 py-2 md:p-4">
        <h2 className="text-lg font-bold md:text-xl">Tasks</h2>
        <div className="flex items-center gap-2">
          <Filter options={priorityOptions} filterType="priority" />
          <Filter options={statusOptions} filterType="status" />
        </div>
      </div>

      <div className="h-96 max-h-96 space-y-2.5 overflow-y-auto rounded-b-md bg-slate-50 p-4">
        {taskError && <p className="text-center text-red-500">{taskError}</p>}

        {isLoading && <Loader />}

        {!isLoading && !taskError && tasks.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p>No tasks found!</p>
          </div>
        )}

        {!isLoading &&
          !taskError &&
          tasks.length > 0 &&
          tasks.map((task) => <TaskItem key={task.id} task={task} />)}
      </div>
    </section>
  );
}

export default TaskList;
