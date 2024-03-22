import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

const tasks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

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
        const isCompleted = localStorage.getItem(`laskut-task-${task}`) === 'True';
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
          key="1"
          to="/1"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-1'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          1
        </Link>
        <Link
          key="2"
          to="/2"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-2'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          2
        </Link>
        <Link
          key="3"
          to="/3"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-3'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          3
        </Link>
        <Link
          key="4"
          to="/4"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-4'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          4
        </Link>
        <Link
          key="5"
          to="/5"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-5'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          5
        </Link>
        <Link
          key="6"
          to="/6"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-6'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          6
        </Link>
        <Link
          key="7"
          to="/7"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-7'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          7
        </Link>
        <Link
          key="8"
          to="/8"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-8'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          8
        </Link>
        <Link
          key="9"
          to="/9"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-9'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          9
        </Link>
        <Link
          key="10"
          to="/10"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-10'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          10
        </Link>
        <Link
          key="11"
          to="/11"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-11'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          11
        </Link>
        <Link
          key="12"
          to="/12"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-12'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          12
        </Link>
        <Link
          key="13"
          to="/13"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-13'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          13
        </Link>
        <Link
          key="14"
          to="/14"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-14'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          14
        </Link>
        <Link
          key="15"
          to="/15"
          className={`w-24 h-24 flex items-center justify-center text-center border rounded-lg cursor-pointer ${taskCompletionStatus['laskut-task-15'] ? "bg-green-200" : "bg-white shadow-xl"}`}
        >
          15
        </Link>
      </div>
    </div>
  )
  }