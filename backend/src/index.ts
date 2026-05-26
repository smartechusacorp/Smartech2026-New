import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ===== INVOICES =====
app.get('/api/invoices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invoices ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

app.post('/api/invoices', async (req, res) => {
  const { client_name, amount, status } = req.body;
  const id = uuidv4();
  try {
    await pool.query(
      'INSERT INTO invoices (id, client_name, amount, status) VALUES ($1, $2, $3, $4)',
      [id, client_name, amount, status || 'draft']
    );
    res.status(201).json({ id, client_name, amount, status: status || 'draft' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// ===== ESTIMATES =====
app.get('/api/estimates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estimates ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch estimates' });
  }
});

app.post('/api/estimates', async (req, res) => {
  const { client_name, amount, description } = req.body;
  const id = uuidv4();
  try {
    await pool.query(
      'INSERT INTO estimates (id, client_name, amount, description) VALUES ($1, $2, $3, $4)',
      [id, client_name, amount, description]
    );
    res.status(201).json({ id, client_name, amount, description });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create estimate' });
  }
});

// ===== KANBAN BOARD =====
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY position');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, status, position } = req.body;
  const id = uuidv4();
  try {
    await pool.query(
      'INSERT INTO tasks (id, title, status, position) VALUES ($1, $2, $3, $4)',
      [id, title, status || 'todo', position || 0]
    );
    res.status(201).json({ id, title, status: status || 'todo', position: position || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status, position } = req.body;
  try {
    await pool.query(
      'UPDATE tasks SET status = COALESCE($1, status), position = COALESCE($2, position) WHERE id = $3',
      [status, position, id]
    );
    res.json({ id, status, position });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// ===== USERS =====
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name, role FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  const { email, name, password, role } = req.body;
  const id = uuidv4();
  try {
    await pool.query(
      'INSERT INTO users (id, email, name, password, role) VALUES ($1, $2, $3, $4, $5)',
      [id, email, name, password, role || 'user']
    );
    res.status(201).json({ id, email, name, role: role || 'user' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// ===== NOTIFICATIONS =====
app.get('/api/notifications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.post('/api/notifications', async (req, res) => {
  const { user_id, message, type } = req.body;
  const id = uuidv4();
  try {
    await pool.query(
      'INSERT INTO notifications (id, user_id, message, type) VALUES ($1, $2, $3, $4)',
      [id, user_id, message, type || 'info']
    );
    res.status(201).json({ id, user_id, message, type: type || 'info' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// ===== CONTACT FORM =====
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  const id = uuidv4();
  try {
    await pool.query(
      'INSERT INTO contact_submissions (id, name, email, message) VALUES ($1, $2, $3, $4)',
      [id, name, email, message]
    );
    res.status(201).json({ id, message: 'Contact form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

