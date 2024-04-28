import { addTask, deleteTask, editTask } from "../api/tasks/route";
import { Task } from "../page";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import TasksList from "./TaskList";
import Toast from "./Toast";
import { IconPlus, IconLoader2 } from "@tabler/icons-react";

type DashboardProps = {
  initialTasks: Task[];
};

export default function Dashboard({ initialTasks }: DashboardProps) {
  const taskNames = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [loading, setLoading] = useState(false);
  const [toastMessage, settoastMessage] = useState<string | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleCreateTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    settoastMessage(null);
    settoastMessage("Creating task...");
    try {
      const task = taskNames.current;
      const newTask = await addTask(task?.value as string);
      setTasks([...tasks, newTask]);
      task!.value = "";
      settoastMessage("Task created successfully");
    } catch (error) {
      settoastMessage("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    setLoading(true);
    settoastMessage(null);
    settoastMessage("Updating task...");
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      await editTask(updatedTask);
      setTasks(updatedTasks);
      settoastMessage("Task updated successfully");
    } catch (error) {
      settoastMessage("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setLoading(true);
    settoastMessage(null);
    settoastMessage("Deleting task...");
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      settoastMessage("Task deleted successfully");
    } catch (error) {
      settoastMessage("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[70vw] p-12 bg-[#3450A1] rounded-xl min-h-[80vh]">
      <Toast
        message={toastMessage}
        onClose={() => {
          settoastMessage(null);
          settoastMessage(null);
        }}
      />
      <div className="grid grid-flow-row justify-center">
        <h1 className="text-2xl text-white pt-5 text-center">Task Manager</h1>
        <div className="relative p-4">
          <form onSubmit={handleCreateTask}>
            <input
              className="py-2 px-4 w-[30vw] rounded-full bg-[#183075] text-white"
              placeholder="Enter Task"
              type="text"
              required
              ref={taskNames}
            />
            <button
              type="submit"
              className="btn bg-[#EB06FF] active:bg-[#C617D5] active:bg-greye/75 text-white text-xl font-black text-center rounded-[100%] size-8 absolute ml-[-35px] top-5"
              disabled={loading}
            >
              {loading ? (
                <IconLoader2 stroke={2} className="ml-1 animate-spin" />
              ) : (
                <IconPlus stroke={2} className="ml-1" />
              )}
            </button>
          </form>
        </div>
        <section>
          <h2 className="text-white px-4 text-lg">Tasks To Do</h2>
          <ul className="h-[30vh] overflow-y-auto">
            {tasks.length > 0 ? (
              <TasksList
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            ) : (
              <p className="grid place-items-center text-gray-500 text-xl">
                No tasks
              </p>
            )}
          </ul>
        </section>
        <section className="my-2 h-[15vh] flex flex-col items-center justify-center">
          <div className="py-2 px-4 w-[30vw] rounded bg-[#5C76BD] mb-2 flex justify-between">
            <p className="grid place-items-center">All Tasks</p>
            <p className="py-1 px-5 bg-[#23366D] rounded text-red-500">
              {tasks.length}
            </p>
          </div>
          <div className="py-2 px-4 w-[30vw] rounded bg-[#5C76BD] flex justify-between">
            <p className="grid place-items-center">Completed Tasks</p>
            <p className="py-1 px-5 bg-[#23366D] rounded text-red-500">
              {
                tasks.filter(
                  (task: { isFinished: boolean }) => task.isFinished === true
                ).length
              }
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
