import { useTheme } from "../context/ThemeContext";
import { useTasks } from "../context/TaskContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { stats } = useTasks();

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">React Project 09</p>
        <h1>TaskFlow</h1>
        <p className="subtitle">
          Context API + editable tasks + native drag and drop.
        </p>
      </div>

      <div className="header-actions">
        <span className="task-total">{stats.total} tasks</span>
        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "☾" : "☀"}
        </button>
      </div>
    </header>
  );
}
