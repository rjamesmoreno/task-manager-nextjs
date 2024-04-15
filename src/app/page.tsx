'use client'
import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState(null);


  useEffect(() => {
    fetch("http://localhost:8000/tasks").then((res) => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      setTasks(data);
    })
    .catch(err => {
      console.log(err.message);
    })
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-[#23366D]">
      <div className="h-[80vh] w-[70vw] bg-[#3450A1] rounded-xl">
        <div className="grid grid-flow-row justify-center">
          <h1 className="text-2xl text-white pt-5 text-center">Task Manager</h1>
          <CreateTask />
          <h2 className=" text-white px-4 text-lg">Tasks To Do</h2>
          {tasks && <TaskList tasks={tasks} />}
        </div>
      </div>
    </main>
  );
}
