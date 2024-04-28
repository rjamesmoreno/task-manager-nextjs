import React, { FormEventHandler, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { IconCheck, IconEdit, IconTrash } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task } from "../page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

type TaskProps = {
  tasks: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function Tasks({
  tasks,
  onUpdateTask,
  onDeleteTask,
}: TaskProps) {
  const [newTaskName, setNewTaskName] = useState("");
  const [open, setOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const handleFinishTask = async (task: Task) => {
    const updatedTask = { ...task, isFinished: !task.isFinished };
    await onUpdateTask(updatedTask);
  };

  const handleEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!newTaskName.trim()) {
      setError("Please provide a task name.");
      return;
    }

    setEditLoading(true);
    try {
      const updatedTask = { ...tasks, title: newTaskName };
      await onUpdateTask(updatedTask);
      setNewTaskName("");
      setOpen(false);
      setError("");
    } catch (error) {
      setError("Failed to edit task");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteConfirmation = async () => {
    setShowConfirmDelete(true);
  };

  const handleDeleteAction = async () => {
    setDeleteLoading(true);
    try {
      await onDeleteTask(tasks.id);
    } catch (error) {
      setError("Failed to delete task");
    } finally {
      setDeleteLoading(false);
      setShowConfirmDelete(false);
    }
  };

  return (
    <li key={tasks.id} className="py-2 px-4 flex">
      <div className="h-[5vh] w-[2vw] bg-[#23366D] grid place-items-center mr-1 rounded-l-lg">
        <Checkbox
          checked={tasks.isFinished}
          onCheckedChange={() => handleFinishTask(tasks)}
        />
      </div>
      <p
        className={`bg-[#23366D] w-[24vw] h-[5vh] pl-2 content-center ${
          tasks.isFinished ? "line-through text-gray-500" : "text-white"
        }`}
      >
        {tasks.title}
      </p>
      <div className="ml-1 bg-[#23366D] rounded-r-[5px] px-1 h-[5vh] flex justify-around">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button disabled={editLoading}>
              {" "}
              <IconEdit color="white" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <form onSubmit={handleEditTask} className="grid grid-flow-col">
                  <Input
                    type="text"
                    defaultValue={tasks.title}
                    placeholder={tasks.title}
                    value={newTaskName}
                    onChange={(e) => {
                      setNewTaskName(e.target.value);
                      setError("");
                    }}
                    disabled={editLoading}
                  />
                  <Button type="submit" className="mx-2" disabled={editLoading}>
                    <IconCheck />
                  </Button>
                </form>
                <div>{error && <p className="text-red-500">{error}</p>}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <AlertDialog open={showConfirmDelete}>
          <AlertDialogContent>
            <AlertDialogDescription>
              Are you sure you want to delete this task?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowConfirmDelete(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAction}
                disabled={deleteLoading}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <button onClick={handleDeleteConfirmation}>
          <IconTrash color="red" />
        </button>
      </div>
    </li>
  );
}
