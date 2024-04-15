'use client'
import { FormEventHandler, useState } from "react";
let nextId=0;

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");

  const handleCreateTask: FormEventHandler<HTMLFormElement> = (e) => { 
    e.preventDefault();
    const task = { taskName };
    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      console.log("task added successfully");
    });
    setTaskName('');
  };

  return (
    <div className="relative p-4">
      <form onSubmit={handleCreateTask}>
        <input
          className="py-2 px-4 w-full rounded-lg bg-[#183075] text-white"
          placeholder="Enter Task"
          type="text"
          required
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
        <button
          type="submit"
          className="btn bg-[#EB06FF] active:bg-[#C617D5] active:text-white/75 text-white text-xl font-black text-center rounded-[100%] size-8 absolute ml-[-35px] top-5"
        >
          +
        </button>
      </form>
    </div>
  );
}
