const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Function to test the database connection
const testConnection = async () => {
  try {
    await pool.query('SELECT 1'); // Test query
    console.log('Connected to the database successfully.');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the application if connection fails
  }
};

// Test the connection when the script is loaded
testConnection();

module.exports = pool;