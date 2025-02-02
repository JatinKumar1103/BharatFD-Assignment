# Backend FAQ Management System

## Project Overview

This project is a backend API for managing Frequently Asked Questions (FAQs) with multi-language support. It is built using Node.js, Express, MongoDB, Redis for caching, and integrates the Google Translate API for automatic translations. Docker is used for containerization, making it easy to deploy in different environments.

---

## Directory Structure

The directory structure of the project is organized as follows:

```
assignment/
│
├── node_modules/              # Installed npm packages
├── src/                       # Application source code
│   ├── config/                # Configuration files
│   │   └── redisClient.js     # Redis client setup
|   |   └──admin.config.js     # Admin configuration
│   ├── controllers/           # Controllers for handling API requests
│   ├── models/                # Mongoose models for the FAQ schema
│   ├── routes/                # Express routes for APIs
│   ├── services/              # Services for integrating Google Translate API
│   └── tests/                 # Unit and integration tests
├── package.json               # Project metadata and dependencies
├── .env                       # Environment variables
├── Dockerfile                 # Docker configuration file
├── docker-compose.yml         # Docker Compose configuration
├── .prettierrc                # Prettier configuration
└── README.md                  # Project documentation
```

---

## Setup Instructions

### Prerequisites

Before starting the project, ensure the following software is installed:

- **Node.js**: Version 20.x or higher.
- **Docker**: Docker Desktop should be running.

### Step 1: Clone the Repository

Clone the project to your local machine:

```bash
git clone <repository_url>
cd <project_directory>
```

### Step 2: Install Dependencies

Run the following command to install all the required npm packages:

```bash
npm install
```

### Step 3: Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```
PORT=8000
MONGODB_URI=<your_mongodb_connection_uri>
ADMIN_USERNAME=<admin_username>
ADMIN_PASSWORD=<admin_password>
```

#### Explanation of Environment Variables:
- **PORT**: The port on which the server will run (default: `8000`).
- **MONGODB_URI**: The MongoDB URI for connecting to your MongoDB database.
- **ADMIN_USERNAME**: The username for logging into the admin panel.
- **ADMIN_PASSWORD**: The password for the admin login.

### Step 4: Docker Setup

To run the application using Docker:

1. **Build the Docker image**:

   ```bash
   docker build -t faq-api .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -p 8000:8000 faq-api
   ```

   This will run the application inside a Docker container, mapping the container's port 8000 to your local machine's port 8000.

   Alternatively, you can use **Docker Compose** to run the application:

   ```bash
   docker-compose up
   ```

### Step 5: Start the Server

To start the server without Docker, use the following command:

```bash
npm run server
```

This will start the server on the specified `PORT` (default: `8000`).

---

## API Usage

### 1. Get All FAQs

To fetch all FAQs in English (default):

```bash
curl http://localhost:8000/api/faqs/
```

To fetch FAQs in a specific language (e.g., Hindi):

```bash
curl http://localhost:8000/api/faqs/?lang=hi
```

### 2. Create a New FAQ

To create a new FAQ, send a POST request to `/api/faqs` with the question and answer in the request body:

```bash
curl -X POST http://localhost:8000/api/faqs/ \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Node.js?", "answer": "Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine."}'
```

This will create a new FAQ entry and return the newly created FAQ with a `201` status code.

### 3. Get a Specific FAQ by ID

To get a specific FAQ by its ID:

```bash
curl http://localhost:8000/api/faqs/{faq_id}
```

Replace `{faq_id}` with the actual FAQ ID.

---

## Docker Configuration

### Dockerfile

The `Dockerfile` defines the steps to containerize the application. It starts by defining the base image, copying the application code, installing dependencies, and setting the command to run the server.

### docker-compose.yml

The `docker-compose.yml` file defines how the application will run with Docker Compose. It includes services for the application, MongoDB, and Redis. Here's a breakdown of the services:

- **app**: The Node.js application container.
- **mongodb**: The MongoDB container for storing data.
- **redis**: The Redis container used for caching.

To start the application using Docker Compose, run the following command:

```bash
docker-compose up
```

This will start all services defined in the `docker-compose.yml` file.

---

---

## Contribution Guidelines

We welcome contributions to this project! If you want to contribute, please follow these guidelines:

### Steps to Contribute:
1. **Fork the repository** and create your own branch for the feature or fix you're working on.
2. **Ensure your code follows the project's coding standards** (e.g., PEP8/ES6 guidelines).
3. **Write tests** to cover your changes (if applicable).
4. **Commit your changes** with clear, descriptive commit messages.
5. **Push your changes** to your fork.
6. **Open a Pull Request** to the main repository with a detailed explanation of your changes.



## Conclusion

This project provides a comprehensive solution for managing FAQs with multilingual support, caching with Redis, and automatic translations via Google Translate API. Docker ensures easy deployment, and environment variables provide flexibility for configuration. You can either run the server locally or use Docker to containerize the application.

Make sure to follow the setup instructions, modify the `.env` file, and follow the contribution guidelines if you'd like to contribute.

---

Let me know if you need any more adjustments!