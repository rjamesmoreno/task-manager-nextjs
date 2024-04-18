import { ITask } from "@/app/types/tasks";
import { FinishTask, deleteTask } from "../../../api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";

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
      <div className="h-[5vh] w-[2vw] bg-[#23366D] grid place-items-center mr-1 rounded-l-lg">
        <Checkbox
          checked={status}
          onCheckedChange={(e) => {
            handleFinishTask(tasks.id, !status);
          }}
        />
      </div>
      <div className="bg-[#23366D] w-[24vw] h-[5vh] pl-2 text-white content-center">
        {tasks.title}
      </div>
      <div className="ml-1 bg-[#23366D] rounded-r-[5px] w-[4vw] h-[5vh] flex justify-around">
        <button>
          <IconEdit color="white" />
        </button>
        <button onClick={() => handleDeleteTask(tasks.id)}>
          <IconTrash color="red" />
        </button>
      </div>
    </div>
  );
}
