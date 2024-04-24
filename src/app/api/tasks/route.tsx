import { Task } from "@/app/page";
import { v4 as uuidv4 } from "uuid";

export const fetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:8001/tasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks");
    throw error;
  }
};

export const addTask = async (title: string) => {
  try {
    const response = await fetch("http://localhost:8001/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        title: title,
        isFinished: false,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error("Error adding task");
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8001/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task");
    throw error;
  }
};

export const editTask = async (task: Task) => {
  try {
    const response = await fetch(`http://localhost:8001/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to edit task");
    }
  } catch (error) {
    console.error("Error editing task");
    throw error;
  }
};
