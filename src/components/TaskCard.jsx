import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export function TaskCard({ task, onEdit }) {
  const { moveTask, deleteTask } = useTasks();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleCardClick = (event) => {
    // Don't toggle when clicking buttons
    if (event.target.closest("button")) {
      return;
    }

    setIsDisabled((current) => !current);
  };

  const handleDragStart = (event) => {
    // Don't allow dragging when disabled
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/task-id", task.id);

    event.currentTarget.classList.add("is-dragging");
  };

  const handleDragEnd = (event) => {
    event.currentTarget.classList.remove("is-dragging");
  };

  const handleEdit = (event) => {
    event.stopPropagation();

    // Enable card when editing
    setIsDisabled(false);

    onEdit(task);
  };

  const handleDelete = (event) => {
    event.stopPropagation();

    deleteTask(task.id);
  };

  const getDeadlineState = () => {
    if (task.status === "done") return "complete";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(`${task.deadline}T00:00:00`);

    if (deadline < today) return "overdue";

    const days = Math.ceil(
      (deadline - today) / (1000 * 60 * 60 * 24),
    );

    if (days <= 2) return "soon";

    return "";
  };

  const deadlineState = getDeadlineState();

  return (
    <article
      className={`
        task-card
        ${deadlineState ? `task-card--${deadlineState}` : ""}
        ${isDisabled ? "task-card--disabled" : ""}
      `}
      draggable={!isDisabled}
      onClick={handleCardClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-top">
        <span
          className={`priority priority--${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>

        <div className="task-actions">
          <button
            type="button"
            onClick={handleEdit}
            aria-label={`Edit ${task.title}`}
          >
            Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
            aria-label={`Delete ${task.title}`}
          >
            ×
          </button>
        </div>
      </div>

      <h3>{task.title}</h3>

      {task.description && <p>{task.description}</p>}

      <div className="task-dates">
        <div>
          <span>Start</span>
          <strong>{task.startDate}</strong>
        </div>

        <div
          className={
            deadlineState ? "deadline-warning" : ""
          }
        >
          <span>Deadline</span>
          <strong>{task.deadline}</strong>
        </div>
      </div>

      <div className="drag-hint">
        <span aria-hidden="true">⠿</span>

        {isDisabled
          ? "Card disabled — click to enable"
          : "Click to disable • Drag to move"}
      </div>
    </article>
  );
}   