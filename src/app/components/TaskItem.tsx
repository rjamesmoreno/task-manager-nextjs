import { ITask } from "@/app/types/tasks";
import { EditTask, FinishTask, deleteTask } from "../../../api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconEdit, IconTrash, IconCheck } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TaskProps = {
  tasks: ITask;
};

export default function TaskItem({ tasks }: TaskProps) {
  const router = useRouter();
  const [newTaskName, setNewTaskName] = useState("");
  const [status, setStatus] = useState(tasks.isFinished);

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    router.refresh();
  };

  const handleFinishTask = async (isFinished: boolean) => {
    await FinishTask(tasks, !status);
    setStatus(!status);
    router.refresh();
  };

  const handleEditTask = async (title: string) => {
    await EditTask(tasks, title);
    setNewTaskName("");
    router.refresh();
  };

  return (
    <div key={tasks.id} className="py-2 px-4 flex">
      <div className="h-[5vh] w-[2vw] bg-[#23366D] grid place-items-center mr-1 rounded-l-lg">
        <Checkbox
          checked={status}
          onCheckedChange={(e) => {
            handleFinishTask(!status);
          }}
        />
      </div>
      <div className="bg-[#23366D] w-[24vw] h-[5vh] pl-2 text-white content-center">
        {tasks.title}
      </div>
      <div className="ml-1 bg-[#23366D] rounded-r-[5px] w-[4vw] h-[5vh] flex justify-around">
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <IconEdit color="white" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  defaultValue=""
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
              </div>
              <DialogClose>
                <Button type="submit" size="sm" className="px-3">
                  <IconCheck onClick={() => handleEditTask(newTaskName)} />
                </Button>
              </DialogClose>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <button onClick={() => handleDeleteTask(tasks.id)}>
          <IconTrash color="red" />
        </button>
      </div>
    </div>
  );
}
