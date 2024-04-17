"use client";
import TaskItem from "./TaskItem";
import { ITask } from "../types/tasks";

type TaskListProps = {
  tasks: ITask[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      <ul className="h-[30vh] overflow-y-auto">
        {tasks.map((task) => (
          <TaskItem key={task.id} tasks={task}></TaskItem>
        ))}
      </ul>
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
    </div>
  );
}
