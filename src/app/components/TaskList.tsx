"use client";
import TaskItem from "./TaskItem";
import { ITask } from "../types/tasks";

type TaskListProps = {
  tasks: ITask[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} tasks={task}></TaskItem>
        ))}
      </ul>
    </div>
  );
}
