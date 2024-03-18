import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

const tasks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function Index() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("completedTasks") || "[]");
    setCompletedTasks(storedTasks);
    setClientSide(true); // Indicate that we're now on the client-side
  }, []);

  

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-4 p-4">
        {tasks.map((task, index) => {
          let isTaskCompleted = false
          if (clientSide) {
            // Now we check localStorage only if we're sure we're on the client-side
            isTaskCompleted = localStorage.getItem(`laskut-task-${task}`) === 'True';
          }
          console.log(typeof isTaskCompleted)
          return (
            <Link
              to={`/${task}`}
              key={index}
              className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${isTaskCompleted ? "bg-green-200" : completedTasks.includes(task) ? "bg-gray-200" : "bg-white shadow-xl"}`}
            >
              {task}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
