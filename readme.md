# Task Manager API

## Project Descrition

- In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages.

- The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks.

- The tasks should have a title, description, and a flag for completion status.

---

# List of API Operations

## 1. Create a New Task

### Description:

---

- This operation allows you to create a new task by sending a POST request with the task details.

---

### Endpoint:

> `POST /tasks`

### Request Body :

> Status: ` 201 CREATED`

```javascript

{
    "title": "Task 1",
    "description": "Task 1",
    "completed": false
}

```

### Example Response:

```javascript
{
    "message": "Task created successfully",
    "task": {
        "id": 7742465703,
        "title": "new post task",
        "description": "adding new task",
        "completed": true
    }
}

```

## 2. Read All Tasks

### Description:

---

- This operation retrieves a list of all tasks.

---

### Example Response:

> Status: ` 200 OK`

```javascript

[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  },
  {
    "id": 2,
    "title": "Create a new project",
    "description": "Create a new project using the Express application generator",
    "completed": true
  },
  ...
]

```

## 3. Read a Single Task by ID

### Description:

- This operation retrieves a single task by its ID.

### Endpoint:

> `GET /tasks/:id`

### URL Parameters:

> `id (number, required): The ID of the task to retrieve.`

> Status: ` 200 OK`

```javascript
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}

```

## 4. Update an Existing Task

### Description:

- This operation updates the details of an existing task.

### Endpoint:

> `PUT /tasks/:id`

### URL Parameters:

> `id (number, required): The ID of the task to update.`

### Request Body:

```javascript
{
  "title": "Updated Task",
  "description": "Updated Task Description",
  "completed": true
}

```

### Example Response:

```javascript
{
    "message": "Task updated successfully",
    "task": {
        "id": 4,
        "title": "updating the task",
        "description": "updating new task12",
        "completed": true
    }
}
```

## 5. Delete a Task

### Description:

- This operation deletes an existing task by its ID.

### Endpoint:

> `DELETE /tasks/:id`

### URL Parameters:

> `id (number, required): The ID of the task to delete.`

### Example Response:

```javascript
{
    "message": "Task deleted successfully",
    "deletedTask": {
        "id": 2,
        "title": "Create a new project",
        "description": "Create a new project using the Express application generator",
        "completed": true
    }
}

```

---

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sachinjdv7/task-manager.git
   cd task-manager
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:

   ```
   npm start
   ```

- The server will start on port 3000 by default. You can access the API at http://localhost:3000.

> - On startup, the tasks are loaded from the file task.json into the tasks array.
