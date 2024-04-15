interface Task {
  id: number;
  taskName: string;
}

export default function TaskList(props: { tasks: Task[] }) {
  const tasks = props.tasks;

  const deleteTask = async (taskId: number) => {
  const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
    method: 'DELETE',
  });
  
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="py-2 px-4 flex">
          <div className="h-[4vh] w-[2vw] bg-[#23366D] pl-[9px] pt-1 mr-1 rounded-l-lg">
            <input type="checkbox" className="" />
          </div>
          <div className="bg-[#23366D] w-[24vw] h-[4vh] pl-2 text-white content-center">{task.taskName}</div>
          <div className="ml-1">
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 rounded-r-[5px] w-[4vw] h-[4vh]">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
