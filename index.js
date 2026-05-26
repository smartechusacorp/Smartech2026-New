const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Basic home endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Smartech API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

