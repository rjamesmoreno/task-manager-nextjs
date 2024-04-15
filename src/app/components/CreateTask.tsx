"use client";
import { useState } from "react";

export default function CreateTask() {
  let nextId=0;
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([])

  const handleCreateTask = () => {
    
  };

  return (
    <div className="relative p-4">
      <input
        className="py-2 px-4 w-[30rem] rounded-lg bg-[#183075] text-white"
        placeholder="Enter Task"
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      ></input>
      <button
        onClick={handleCreateTask}
        className="btn bg-[#EB06FF] active:bg-[#C617D5] active:text-white/75 text-white text-xl font-black text-center rounded-[100%] size-8 absolute ml-[-35px] top-5"
      >
        +
      </button>
    </div>
  );
}
