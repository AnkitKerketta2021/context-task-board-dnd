import { createContext, useContext, useMemo, useState } from "react";

const TaskContext = createContext(null);

const starterTasks = [
  {
    id: crypto.randomUUID(),
    title: "Design dashboard",
    description: "Create the responsive dashboard layout.",
    priority: "High",
    startDate: "2026-09-01",
    deadline: "2026-09-05",
    status: "todo",
  },
  {
    id: crypto.randomUUID(),
    title: "Build API layer",
    description: "Connect the frontend to the project API.",
    priority: "Medium",
    startDate: "2026-09-03",
    deadline: "2026-09-10",
    status: "progress",
  },
  {
    id: crypto.randomUUID(),
    title: "Review components",
    description: "Refactor reusable components and remove duplication.",
    priority: "Low",
    startDate: "2026-08-25",
    deadline: "2026-08-29",
    status: "done",
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(starterTasks);

  const addTask = (taskData) => {
    setTasks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        ...taskData,
        status: "todo",
      },
    ]);
  };

  const updateTask = (id, changes) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, ...changes } : task,
      ),
    );
  };

  const moveTask = (id, status) => {
    updateTask(id, { status });
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      progress: tasks.filter((task) => task.status === "progress").length,
      done: tasks.filter((task) => task.status === "done").length,
      high: tasks.filter((task) => task.priority === "High").length,
    }),
    [tasks],
  );

  const value = useMemo(
    () => ({
      tasks,
      stats,
      addTask,
      updateTask,
      moveTask,
      deleteTask,
    }),
    [tasks, stats],
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider.");
  }

  return context;
}
