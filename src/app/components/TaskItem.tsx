import { ITask } from "@/app/types/tasks";
import { FinishTask, deleteTask } from "../../../api";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TaskProps = {
  tasks: ITask;
};

export default function TaskItem({ tasks }: TaskProps) {
  const router = useRouter();
  const [status, setStatus] = useState(tasks.isFinished);

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    router.refresh();
  };

  const handleFinishTask = async (id: string, isFinished: boolean) => {
    await FinishTask(tasks, !status);
    setStatus(!status);
    router.refresh();
  };

  return (
    <div key={tasks.id} className="py-2 px-4 flex">
      <div className="h-[4vh] w-[2vw] bg-[#23366D] pl-[9px] pt-1 mr-1 rounded-l-lg">
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => {
            handleFinishTask(tasks.id, !status);
          }}
        ></input>
      </div>
      <div className="bg-[#23366D] w-[24vw] h-[4vh] pl-2 text-white content-center">
        {tasks.title}
      </div>
      <div className="ml-1">
        <button
          onClick={() => handleDeleteTask(tasks.id)}
          className="bg-red-500 rounded-r-[5px] w-[4vw] h-[4vh]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
