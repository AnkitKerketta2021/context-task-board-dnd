import { useState } from "react";
import { Header } from "./components/Header";
import { Stats } from "./components/Stats";
import { TaskColumn } from "./components/TaskColumn";
import { TaskForm } from "./components/TaskForm";

export default function App() {
  const [editingTask, setEditingTask] = useState(null);

  return (
    <main className="app-shell">
      <Header />

      <Stats />

      <section className="workspace">
        <aside>
          <TaskForm
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />

          <div className="tip-card">
            <span className="tip-icon">↕</span>
            <div>
              <strong>Drag & drop</strong>
              <p>
                Grab any task card and drop it into another column to
                change its status.
              </p>
            </div>
          </div>
        </aside>

        <section className="board">
          <div className="board-heading">
            <div>
              <p className="section-kicker">Workspace</p>
              <h2>Project tasks</h2>
            </div>
            <span>Context-powered board</span>
          </div>

          <div className="columns">
            <TaskColumn status="todo" onEdit={setEditingTask} />
            <TaskColumn status="progress" onEdit={setEditingTask} />
            <TaskColumn status="done" onEdit={setEditingTask} />
          </div>
        </section>
      </section>

      <footer className="learning-footer">
        <span>Context API</span>
        <span>useContext</span>
        <span>Drag & Drop</span>
        <span>CRUD</span>
        <span>Editable Dates</span>
        <span>Derived State</span>
      </footer>
    </main>
  );
}
