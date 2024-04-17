import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

const tasks = ["kulmia", "kulmia2"];

export default function Index() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [clientSide, setClientSide] = useState(false);

  const [taskCompletionStatus, setTaskCompletionStatus] = useState({});

  useEffect(() => {
    // This code runs on the client side only
    const completionStatus = {};
    tasks.forEach(task => {
      // Retrieve each task's completion status from localStorage
      const isCompleted = localStorage.getItem(`laskut-task-${task}`) === 'True';
      completionStatus[`laskut-task-${task}`] = isCompleted;
    });
    setTaskCompletionStatus(completionStatus);
  }, []);

  useEffect(() => {
    setClientSide(true)
  },[])

  useEffect(() => {
    const handleStorageChange = () => {
      const completionStatus = {};
      tasks.forEach(task => {
        console.log("task: ", task)
        const isCompleted = localStorage.getItem(`laskut-task-${task}`) === 'True';
        console.log("isCompleted: ", isCompleted)
        completionStatus[`laskut-task-${task}`] = isCompleted;
      });
      setTaskCompletionStatus(completionStatus);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-4 p-4">
      <Link
          key="kulmia"
          to="/kulmia"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-kulmia'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          1
        </Link>
        <Link
          key="kulmia2"
          to="/kulmia2"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-kulmia2'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          2
        </Link>
      </div>
    </div>
  )
  }