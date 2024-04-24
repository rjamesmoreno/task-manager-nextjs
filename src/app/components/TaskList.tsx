import React from 'react'
import Tasks from './Tasks'
import { Task } from '../page'

type TaskListProps = {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function ({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  return (
    <div>
      <li>
        {tasks.map((task) => (
          <Tasks 
          key={task.id} 
          tasks={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
        ))}
      </li>
    </div>
  )
}
