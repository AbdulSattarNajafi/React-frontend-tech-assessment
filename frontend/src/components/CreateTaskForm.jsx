import { useState } from "react";
import { useForm } from "react-hook-form";

import { createTask } from "../api/tasks";
import { useTasksContext } from "../contexts/TasksContext";

function CreateTaskForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { getTasks } = useTasksContext();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await createTask(data);
      getTasks();
      reset();
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-md bg-white shadow-md">
      <div className="border-b border-stone-200 px-4 py-2 md:p-4">
        <h2 className="text-lg font-bold md:text-xl">Create New Task</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-b-md bg-slate-50 p-4"
      >
        <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-4">
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              disabled={isLoading}
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-blue-500 md:px-4"
            />
            <p className="h-4 text-sm text-red-500">{errors?.title?.message}</p>
          </div>

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="dueDate" className="font-medium">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              disabled={isLoading}
              {...register("dueDate", {
                required: "Due Date is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return (
                    selectedDate >= today || "Please choose a future date."
                  );
                },
              })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-blue-500 md:px-4"
            />
            <p className="h-4 text-sm text-red-500">
              {errors?.dueDate?.message}
            </p>
          </div>

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="priority" className="font-medium">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              disabled={isLoading}
              {...register("priority", {
                required: "Priority is required",
              })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.75 focus:outline-blue-500 md:px-4"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p className="h-4 text-sm text-red-500">
              {errors?.priority?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            rows={6}
            className="min-h-40 w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-blue-500 md:px-4"
          ></textarea>
          <p className="h-4 text-sm text-red-500">
            {errors?.description?.message}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between md:mt-4">
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:bg-blue-500 lg:text-lg"
          >
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateTaskForm;
