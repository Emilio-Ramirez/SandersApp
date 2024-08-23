// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/database');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/users', require('./src/routes/userRoutes'));

const PORT = 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
