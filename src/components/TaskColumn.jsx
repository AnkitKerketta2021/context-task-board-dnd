import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";

const columnInfo = {
  todo: {
    title: "To do",
    description: "Ready to start",
  },
  progress: {
    title: "In progress",
    description: "Currently working",
  },
  done: {
    title: "Completed",
    description: "Finished work",
  },
};

export function TaskColumn({ status, onEdit }) {
  const { tasks, moveTask } = useTasks();
  const [isOver, setIsOver] = useState(false);

  const columnTasks = tasks.filter((task) => task.status === status);
  const info = columnInfo[status];

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsOver(true);
  };

  const handleDragLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOver(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("text/task-id");

    if (taskId) {
      moveTask(taskId, status);
    }

    setIsOver(false);
  };

  return (
    <section
      className={`task-column ${isOver ? "is-drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-labelledby={`${status}-title`}
    >
      <div className="column-heading">
        <div>
          <h2 id={`${status}-title`}>{info.title}</h2>
          <p>{info.description}</p>
        </div>
        <span>{columnTasks.length}</span>
      </div>

      <div className="task-list">
        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))
        ) : (
          <div className="empty-column">
            Drop a task here
          </div>
        )}
      </div>
    </section>
  );
}
