# Task Manager - Full Stack Application

A modern, full-stack Task Management application built with Node.js, Express, MongoDB, React, and Tailwind CSS.

## Features

- **Create Tasks**: Add new tasks with title, description, category, and due date
- **View Tasks**: See all tasks in a clean, organized list
- **Edit Tasks**: Update task details anytime
- **Complete Tasks**: Mark tasks as completed with validation
- **Delete Tasks**: Remove tasks you no longer need
- **Categorization**: Organize tasks by categories (Work, Personal, Shopping, Health, etc.)
- **Due Dates**: Set and track task deadlines
- **Responsive UI**: Beautiful interface that works on all devices

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher) installed
- **MongoDB** installed and running locally, OR a MongoDB Atlas connection string

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Task_Manager
```

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
MONGODB_URI=mongodb://localhost:27017/task-manager
PORT=5000
```

### 3. Set up the Frontend

```bash
cd ../client
npm install
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### Start the Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173` (or another available port)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/complete` | Mark a task as completed |
| DELETE | `/api/tasks/:id` | Delete a task |

### Request/Response Examples

**Create Task:**
```json
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager application",
  "category": "Work",
  "dueDate": "2026-05-15"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project",
  "description": "Finish the task manager application",
  "category": "Work",
  "dueDate": "2026-05-15T00:00:00.000Z",
  "completed": false,
  "createdAt": "2026-05-01T12:00:00.000Z",
  "updatedAt": "2026-05-01T12:00:00.000Z"
}
```

## Project Structure

```
Task_Manager/
├── server/
│   ├── index.js          # Main server file with routes and models
│   ├── .env              # Environment variables
│   └── package.json      # Server dependencies
├── client/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Component styles
│   │   ├── index.css     # Global styles with Tailwind
│   │   └── main.jsx      # React entry point
│   ├── index.html
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Client dependencies
└── README.md
```

## Code Structure Explanation

### Backend (`server/index.js`)

1. **MongoDB Connection**: Connects to MongoDB using Mongoose
2. **Task Schema**: Defines the structure of tasks with validation
3. **Middleware**:
   - CORS for cross-origin requests
   - JSON parsing
   - Custom validation middleware
4. **Routes**: RESTful API endpoints for CRUD operations
5. **Error Handling**: Graceful error handling with meaningful messages

### Frontend (`client/src/App.jsx`)

1. **State Management**: React hooks for managing tasks and form data
2. **API Integration**: Fetch API for communicating with backend
3. **Components**:
   - Task creation form
   - Task list with edit/delete/complete actions
   - Error and success message displays
4. **Styling**: Tailwind CSS for responsive, modern UI

## Validation Rules

- Task title is required and cannot be empty
- Cannot mark a task as complete if it's already completed
- All inputs are sanitized before being sent to the database

## Bonus Features Implemented

- Due dates for tasks
- Task categorization
- Responsive design
- Real-time task statistics

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod --version`
- Check the connection string in `.env`

**Port Already in Use:**
- Change the PORT in `server/.env`
- Update the API_URL in `client/src/App.jsx`

**CORS Issues:**
- Make sure the backend server is running
- Check that CORS middleware is enabled

## License

ISC

## Author

Node.js Internship Project
