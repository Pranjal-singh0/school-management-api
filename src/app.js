require('dotenv').config();

const express = require('express');
const schoolRoutes = require('./routes/school.routes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('School API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});