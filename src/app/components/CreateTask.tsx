"use client";
import { FormEventHandler, useState } from "react";
import { addTask } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function CreateTask() {
  const router = useRouter();
  const [taskName, setTaskName] = useState("");

  const handleCreateTask: FormEventHandler<HTMLFormElement> = async (e) => {
    await addTask({
      id: uuidv4(),
      title: taskName,
      isFinished: false,
    });
    setTaskName("");
    router.refresh();
  };
  return (
    <div className="relative p-4">
      <form onSubmit={handleCreateTask}>
        <input
          className="py-2 px-4 w-[30vw] rounded-full bg-[#183075] text-white"
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
