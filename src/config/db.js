import pg from "pg";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

const { Pool } = pg;

console.log("Initializing database connection with config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
});

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
    requestCert: true,
  },
  max: 5,
  connectionTimeoutMillis: 30000, // Increased timeout
});

// Test the database connection
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Create customers table (thi s is for one time  as some time db is fresh)
const initDB = async () => {
  console.log("Database configuration:", {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    ssl: true,
  });

  let retries = 5;
  while (retries) {
    try {
      console.log(`Connection attempt ${6 - retries}/5...`);
      const client = await pool.connect();
      await client.query(`
                CREATE TABLE IF NOT EXISTS customers (
                    id SERIAL PRIMARY KEY,
                    full_name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    phone_number VARCHAR(15) UNIQUE NOT NULL,
                    gender VARCHAR(10) NOT NULL,
                    date_of_birth DATE NOT NULL,
                    address TEXT NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    latitude DECIMAL(10, 8),
                    longitude DECIMAL(11, 8),
                    browser VARCHAR(100),
                    device_type VARCHAR(50),
                    os VARCHAR(50),
                    user_agent TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);
      console.log("Database initialized successfully");
      client.release();
      break;
    } catch (error) {
      const errorMessage = error.message || error;
      console.error(
        `\nConnection error (${retries} retries left):\n`,
        errorMessage,
        "\nError code:",
        error.code,
        "\nError stack:",
        error.stack
      );
      retries -= 1;
      if (retries === 0) {
        console.error("Failed to initialize database after multiple attempts");
        process.exit(1);
      }
      // Wait for 5 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

initDB();

export default pool;
