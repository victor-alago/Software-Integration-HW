const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/items', require('./routes/items'));

const env = process.env.NODE_ENV || 'development';
let port;

switch (env) {
  case 'development':
    port = process.env.PORT_DEV;
    break;
  case 'release':
    port = process.env.PORT_RELEASE;
    break;
  case 'production':
    port = process.env.PORT_PROD;
    break;
  default:
    throw new Error('Unknown environment');
}

app.listen(port, () => console.log(`Server running on port ${port} in ${env} mode`));
