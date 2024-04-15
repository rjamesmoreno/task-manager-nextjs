interface Task {
  id: number;
  taskName: string;
}

export default function TaskList(props: { tasks: Task[] }) {
  const tasks = props.tasks;

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="py-2 px-4 mx-2 flex justify-between items-center">
          <div className="items-center mx-2">
            <input type="checkbox" />
          </div>
          <div className="bg-[#23366D] w-[50vh] h-[4vh] rounded-[5px] text-white pl-5 content-center">{task.taskName}</div>
          <div>
            <button className="bg-red-500 rounded-[5px] h-[4vh] w-full mx-2 items-center">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
