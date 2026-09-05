import { useTasks } from "../context/TaskContext";

export function Stats() {
  const { stats } = useTasks();

  const items = [
    ["Total", stats.total],
    ["To do", stats.todo],
    ["In progress", stats.progress],
    ["Completed", stats.done],
    ["High priority", stats.high],
  ];

  return (
    <section className="stats-grid" aria-label="Task statistics">
      {items.map(([label, value]) => (
        <article className="stat-card" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  );
}
