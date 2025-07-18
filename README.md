# Customer Management Backend

A robust Node.js backend service for managing customer data with PostgreSQL.

## 🚀 Quick Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file based on `.env.sample`
4. Set up PostgreSQL database and update `.env` with credentials
5. Start the server:
   ```bash
   npm run dev
   ```

## ⚙️ Environment Variables

```env
PORT=3508
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_database_name
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
JWT_SECRET=your_jwt_secret
```

## 🛠 Tech Stack

- Node.js & Express.js
- PostgreSQL
- bcryptjs for password hashing
- CORS enabled
- Environment variables with dotenv

## 🔥 Features

- **Customer Registration**

  - Secure password hashing
  - Email & phone uniqueness validation
  - Device info capture (browser, OS, device type)
  - Geolocation storage
  - Data validation

- **Customer Data Retrieval**

  - Get all customers with details
  - Sorted by registration date
  - Complete device & browser info
  - Location data included

- **Error Handling**
  - Detailed error messages
  - Duplicate email/phone handling
  - Database connection retries
  - Proper HTTP status codes

## 📡 API Endpoints

### POST `/api/register`

Register a new customer with:

- Personal details
- Location data
- Device information
- Browser details

### GET `/api/allcustomer`

Retrieve all registered customers with complete details

## 🔒 Security Features

- Password Hashing
- Input Validation
- CORS Protection
- Environment Variable Protection
