import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";

const blankForm = {
  title: "",
  description: "",
  priority: "Medium",
  startDate: "",
  deadline: "",
};

export function TaskForm({ editingTask, onCancel }) {
  const { addTask, updateTask } = useTasks();
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        startDate: editingTask.startDate,
        deadline: editingTask.deadline,
      });
    } else {
      setForm(blankForm);
    }
  }, [editingTask]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.startDate || !form.deadline) {
      return;
    }

    if (form.deadline < form.startDate) {
      return;
    }

    const data = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    };

    if (editingTask) {
      updateTask(editingTask.id, data);
      onCancel();
    } else {
      addTask(data);
      setForm(blankForm);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="section-kicker">
            {editingTask ? "Edit task" : "Create task"}
          </p>
          <h2>{editingTask ? "Update task" : "New task"}</h2>
        </div>
      </div>

      <label htmlFor="task-title">Task name</label>
      <input
        id="task-title"
        value={form.title}
        onChange={(event) => updateField("title", event.target.value)}
        placeholder="e.g. Build authentication"
      />

      <label htmlFor="task-description">Description</label>
      <textarea
        id="task-description"
        rows="4"
        value={form.description}
        onChange={(event) =>
          updateField("description", event.target.value)
        }
        placeholder="What needs to be done?"
      />

      <div className="form-row">
        <div>
          <label htmlFor="start-date">Start date</label>
          <input
            id="start-date"
            type="date"
            value={form.startDate}
            onChange={(event) =>
              updateField("startDate", event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            value={form.deadline}
            min={form.startDate || undefined}
            onChange={(event) =>
              updateField("deadline", event.target.value)
            }
          />
        </div>
      </div>

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        value={form.priority}
        onChange={(event) =>
          updateField("priority", event.target.value)
        }
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <div className="form-actions">
        {editingTask && (
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button type="submit" className="primary-button">
          {editingTask ? "Save changes" : "Add task"}
        </button>
      </div>
    </form>
  );
}
