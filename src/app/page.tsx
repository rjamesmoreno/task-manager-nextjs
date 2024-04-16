"use client";
import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";

export default function Home() {
  const [taskList, setTaskList] = useState([]);
  const useFetch = (url: string | URL | Request) => {
    fetch(url, {cache: 'no-store'})
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTaskList(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
  };

  useEffect(() => {
      useFetch("http://localhost:8000/tasks")
  }, [taskList]);
  return (
    <main className="flex items-center justify-center p-16 bg-[#23366D] min-h-screen">
      <div className="w-[70vw] p-12 bg-[#3450A1] rounded-xl min-h-[80vh]">
        <div className="grid grid-flow-row justify-center">
          <h1 className="text-2xl text-white pt-5 text-center">Task Manager</h1>
          <CreateTask />
          <h2 className=" text-white px-4 text-lg">Tasks To Do</h2>
          {taskList && <TaskList tasks={taskList}/>}
        </div>
      </div>
    </main>
  );
}
