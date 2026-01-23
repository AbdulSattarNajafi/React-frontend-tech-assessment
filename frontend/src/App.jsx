import "./App.css";
import CreateTaskForm from "./components/CreateTaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="bg-[#2c3e50] p-8 text-center text-white shadow-sm">
        <h1 className="mb-2 text-[2.5rem]">Task Manager</h1>
        <p className="opacity-90">React Frontend Developer Assessment</p>
      </header>

      <main className="mx-auto w-full max-w-300 flex-1 space-y-5 px-4 py-8 lg:px-8">
        <CreateTaskForm />
        <TaskList />
      </main>
    </div>
  );
}

export default App;
