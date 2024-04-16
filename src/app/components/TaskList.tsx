"use client";
import { Dispatch, SetStateAction, useState } from "react";
import TaskItem from "./TaskItem";

export type Task = {
  id: number;
  taskName: string;
  isFinished: boolean;
};

type TaskListProps = {
  tasks : any[]
}

export default function TaskList({tasks} : TaskListProps) {
  // const tasks = props.tasks;

  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const handleChange = async (taskId: number, isFinished: boolean) => {
    const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...tasks.find((t) => t.id === taskId),
        isFinished: isFinished,
      }),
    });
    setCompletedTasksCount(completedTasksCount + 1);
  };

  const deleteTask = async (taskId: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      <div>
        {tasks.map((task) => (
          <TaskItem
            task={task}
            handleChange={handleChange}
            deleteTask={deleteTask}
            tasks={tasks}
            setCompleteTasksCount={setCompletedTasksCount}
            completedTasksCount={completedTasksCount}
          />
        ))}
      </div>
      <div className=" my-2 h-[15vh] flex flex-col items-center justify-center">
        <div className="py-2 px-4 w-[30vw] rounded bg-[#5C76BD] mb-2 flex justify-between">
          <p className="grid place-items-center">All Tasks</p>
          <p className="py-1 px-4 bg-[#23366D] rounded text-red-500">
            {tasks.length}
          </p>
        </div>
        <div className="py-2 px-4 w-[30vw] rounded bg-[#5C76BD] flex justify-between">
          <p className="grid place-items-center">Completed Tasks</p>
          <p className="py-1 px-4 bg-[#23366D] rounded text-red-500">
            {tasks.filter((task) => task.isFinished === true).length}
          </p>
        </div>
      </div>
    </>
  );
}
