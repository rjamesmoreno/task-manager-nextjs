import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";
import { getAllTasks } from "../../api";

export default async function Home() {
  const tasks = await getAllTasks();
  return (
    <main className="flex items-center justify-center p-16 bg-[#23366D] min-h-screen">
      <div className="w-[70vw] p-12 bg-[#3450A1] rounded-xl min-h-[80vh]">
        <div className="grid grid-flow-row justify-center">
          <h1 className="text-2xl text-white pt-5 text-center">Task Manager</h1>
          <CreateTask />
          <h2 className=" text-white px-4 text-lg">Tasks To Do</h2>
          <div className="h-[30vh] overflow-y-auto">
            {tasks.length > 0 ? (
              <TaskList tasks={tasks} />
            ) : (
              <p className="grid place-items-center text-gray-500 text-xl">
                No tasks
              </p>
            )}
          </div>
        </div>
        <div className=" my-2 h-[15vh] flex flex-col items-center justify-center">
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
                  (tasks: { isFinished: boolean }) => tasks.isFinished === true
                ).length
              }
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
