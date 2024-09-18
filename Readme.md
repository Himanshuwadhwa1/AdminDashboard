# Admin Dashboard Project

## Overview

This project is a robust admin dashboard built using modern web technologies. It provides a seamless interface for managing data and user interactions.

## Frontend Technologies

- **React**: A JavaScript library for building user interfaces.
- **Recoil**: A state management library for React, allowing for efficient data sharing and state management.
- **Material-UI (MUI)**: A popular React UI framework that provides a collection of pre-built components, ensuring a responsive and aesthetic design.

## Backend Technologies

- **MongoDB**: A NoSQL database for flexible data storage.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features.
- **Node.js**: A JavaScript runtime built on Chrome's V8 engine, enabling server-side scripting.
- **JSON Web Tokens (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties, used for secure authentication.

## Getting Started

Follow the instructions below to set up the project locally.

1. **Clone the repository:**
   ```bash
   git clone [<repository-url>](https://github.com/Himanshuwadhwa1/AdminDashboard.git)

2. **Install Dependencies:**

    Frontend:
        ```bash
        cd client
        npm install
    Backend:
        ```bash
        cd server
        npm install

3. **Start the Development Server:**
    Frontend:
        ```bash
        npm run dev

    backend:
        ```bash
        npm run dev

4. **Environment Variables**
Make sure to set the required environment variables for connecting to your database and configuring JWT. You can create a .env file in the backend server directory with the following keys:
    ```bash
    PORT = <YOUR_PORT_NO.>
    MONGO_URI=<your-mongo-db-url>
    JWT_SECRET=<your-jwt-secret>





