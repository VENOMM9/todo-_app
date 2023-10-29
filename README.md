# Todo Web Application

This is a simple todo web application built with Node.js, Express, and MongoDB. Users can create tasks and manage their to-do lists. The application also provides user authentication and authorization.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and login
- User-specific task management
- Create, read, update, and delete tasks
- Task status (pending or completed)
- Secure user authentication
- Data storage using MongoDB
- Express server for handling HTTP requests

## Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js: [Install Node.js](https://nodejs.org/)

## Getting Started
1. Clone the repository:
 git clone https://github.com/yourusername/todo-app.git
cd todo-app
2. Install dependencies:
 npm install
3. Set up your MongoDB database:
- Create a MongoDB database and obtain the connection URI.
- Update the `config.js` file with your database URI.

4. Start the application:
 npm start
5. Access the application in your browser at `http://localhost:3000`.

## Project Structure
The project has the following directory structure:
- `controllers/`: Contains application logic and business rules.
- `models/`: Defines MongoDB schema and models for tasks and users.
- `public/`: Contains static assets (CSS, client-side JavaScript).
- `routes/`: Defines application routes.
- `views/`: Contains EJS templates for rendering views.
- `app.js`: The main application file.

## Usage
1. *User Registration:* Users can create an account by providing a name, email, password, sex, and country.

2. *User Login:* Registered users can log in using their email and password.

3. *Dashboard:* After logging in, users are directed to the dashboard where they can view and manage their tasks. Tasks are filtered based on the logged-in user.

4. *Create Tasks:* Users can create new tasks by entering a task name and clicking "Submit."

5. *Update and Delete Tasks:* Users can update a task's status or delete a task.

6. *Log Out:* Users can log out of their accounts, which clears their session.



## License
This project is currently unlicensed.
