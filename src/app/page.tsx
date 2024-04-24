"use client";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import { fetchTasks } from "./api/tasks/route";

export type Task = {
  id: string;
  title: string;
  isFinished: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  return (
    <main className="flex items-center justify-center p-16 bg-[#23366D] min-h-screen">
      <Dashboard initialTasks={tasks} />
    </main>
  );
}
