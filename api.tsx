import { ITask } from "@/app/types/tasks";

const baseUrl = "http://localhost:8000";

export const getAllTasks = async () => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
    const tasks = await res.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const addTask = async (task: ITask) => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const deleteTask = async (id: string) => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};

export const FinishTask = async (task: ITask, isFinished: boolean) => {
  const res = await fetch(`${baseUrl}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: task.id,
      title: task.title,
      isFinished: isFinished,
    }),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};
