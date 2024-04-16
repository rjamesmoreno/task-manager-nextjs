"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { Task } from "./TaskList";

type TaskProps = {
  task: Task
  handleChange: (taskId: number, isFinished: boolean) => void
  deleteTask: (taskId: number) => void
  setCompleteTasksCount : Dispatch<SetStateAction<number>>
  tasks: Task[]
  completedTasksCount : number
}



export default function TaskItem({task, tasks, setCompleteTasksCount, completedTasksCount, handleChange, deleteTask} : TaskProps) {
  const [status, setStatus] = useState(false);

  
  return (
    <div key={task.id} className="py-2 px-4 flex">
      <div className="h-[4vh] w-[2vw] bg-[#23366D] pl-[9px] pt-1 mr-1 rounded-l-lg">
        <input
          type="checkbox"
          checked={task.isFinished}
          onChange={(e) => {
            setStatus(!status)
            handleChange(task.id, e.target.checked)
          }}
        ></input>
      </div>
      <div className="bg-[#23366D] w-[24vw] h-[4vh] pl-2 text-white content-center">
        {task.taskName}
      </div>
      <div className="ml-1">
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 rounded-r-[5px] w-[4vw] h-[4vh]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
