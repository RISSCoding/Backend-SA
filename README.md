# Smart Attendance - Backend

[![Node.js](https://img.shields.io/badge/Node.js-v18.x-green)](https://nodejs.org/) 
[![Express.js](https://img.shields.io/badge/Express-v4.x-lightgrey)](https://expressjs.com/) 
[![MySQL](https://img.shields.io/badge/MySQL-v8.x-blue)](https://www.mysql.com/) 
[![Prisma](https://img.shields.io/badge/Prisma-v5.x-purple)](https://www.prisma.io/)

Welcome to the backend repository for **Smart Attendance**, a simple yet efficient attendance management system that leverages facial recognition technology for streamlined and secure attendance tracking.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features
- **JWT Authentication**: Secure access through JWT for all API routes.
- **Role-based Authorization**: Middleware to enforce specific roles, e.g., admin-only access.
- **Facial Recognition Integration**: Integrate with a facial recognition service for automated attendance tracking.
- **Leave Management**: Automatically track remaining leave days per account, with carryover policy.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/smart-attendance-backend.git
   ```
2. Install dependencies:
   ```bash
   cd smart-attendance-backend
   npm install
   ```
3. Set up the database:
   - Ensure MySQL is running with the following credentials:
     - User: `root`
     - Password: (no password)
     - Host: `localhost`
     - Database: `smart-att`
   - Run the following Prisma commands:
     ```bash
     npx prisma db push
     ```

## Environment Variables
Set up a `.env` file in the root directory with the following keys:
```env
DATABASE_URL=mysql://root:@localhost:3306/smart-att
```

## Usage
Start the development server:
```bash
npm run dev
```

### Available Scripts
- `npm run dev`: Start the server in development mode with `nodemon`
- `npm run build`: Build the project for production
- `npm start`: Start the server in production mode

## Database Schema

The database is managed via Prisma ORM with key models:
- **Account**: User details and roles.
- **Presence**: Records attendance data.
- **LeaveRequest**: Tracks leave requests and approvals.
- **Schedule**: Manages user schedules and availability.

## Contributing
We welcome contributions! Please check out the [Contributing Guidelines](./CONTRIBUTING.md) for more information.

## License
This project is licensed under the MIT License.

