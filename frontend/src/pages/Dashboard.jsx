import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [inv, est, tsk, usr] = await Promise.all([
        axios.get('/api/invoices'),
        axios.get('/api/estimates'),
        axios.get('/api/tasks'),
        axios.get('/api/users'),
      ]);
      setInvoices(inv.data);
      setEstimates(est.data);
      setTasks(tsk.data);
      setUsers(usr.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard">
        <div className="card">
          <h3>Invoices ({invoices.length})</h3>
          <p>Manage your invoices</p>
        </div>
        <div className="card">
          <h3>Estimates ({estimates.length})</h3>
          <p>View all estimates</p>
        </div>
        <div className="card">
          <h3>Tasks ({tasks.length})</h3>
          <p>Track your tasks</p>
        </div>
        <div className="card">
          <h3>Users ({users.length})</h3>
          <p>Manage team members</p>
        </div>
      </div>

      <h2 style={{ marginTop: '2rem' }}>Kanban Board</h2>
      <div className="kanban">
        <div className="kanban-column">
          <h4>To Do</h4>
          {tasks.filter(t => t.status === 'todo').map(task => (
            <div key={task.id} className="task">{task.title}</div>
          ))}
        </div>
        <div className="kanban-column">
          <h4>In Progress</h4>
          {tasks.filter(t => t.status === 'in_progress').map(task => (
            <div key={task.id} className="task">{task.title}</div>
          ))}
        </div>
        <div className="kanban-column">
          <h4>Done</h4>
          {tasks.filter(t => t.status === 'done').map(task => (
            <div key={task.id} className="task">{task.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

