# Full-Stack Application Monorepo

This repository contains the code for a full-stack application, including a React-based frontend and an Express-based backend. Docker Compose is used to containerize and run both parts of the application together, ensuring a seamless development environment.

## Project Structure

- `/backend`: Contains the Express application.
- `/frontend`: Contains the React application.
- `docker-compose.yml`: Docker Compose configuration file to build and run the backend and frontend services.

## Technologies

- **Backend**: Node.js with Express
- **Frontend**: React
- **Containerization**: Docker and Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js and npm installed if you plan to run or test locally without Docker.

### Running the Application with Docker Compose

1. **Clone the Repository**

   ```sh
   git clone UOA-CS732-SE750-Students-2024/project-group-whimsical-wallabies.git
   cd project-group-whimsical-wallabies
   ```
   
2. **Clone the Repository**
From the root of the project, run:
   ```sh
   docker-compose up --build
   ```
This command builds the images for the backend and frontend services and starts the containers. The --build flag ensures that Docker Compose rebuilds the images if there have been changes since the last build.

3. **Access the Application**

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:3001](http://localhost:3001)

## Development Environment

The Docker Compose file is configured with development in mind, featuring hot reloading for both frontend and backend. Modifications in the source code will be reflected in the running containers without needing a rebuild.

## Docker Compose Configuration

- **Backend Service:** Exposed on port 3001, with volume mappings for live code updates.
- **Frontend Service:** Exposed on port 3000, depends on the backend service, and is configured for hot reloading.

## Dependencies

### Backend

- **express:** Web server framework.
- **dotenv:** Loads environment variables from a `.env` file.

#### Install Dependencies:
Navigate to the frontend directory:
   ```sh
   cd backend
   ```

Install the dependencies:
   ```sh
   npm install
   ```

#### Development Dependencies:

- **eslint:** Lints and fixes JS code.
- **prettier:** Code formatter.
- **nodemon:** Automatically restarts the node application when file changes are detected.

### Frontend

- **react, react-dom:** Core React libraries.
- **react-scripts:** Includes scripts and configuration used by Create React App.

#### Install Dependencies:
Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

Install the dependencies:
   ```sh
   npm install
   ```

#### Development Dependencies:

- **eslint:** Lints JS and JSX files.
- **prettier:** Code formatter.

## Code Style

This project adheres to the Airbnb style guide for Node and React, ensuring code quality and consistency across the codebase. We use ESLint to enforce these styles, with specific configurations for both the frontend and backend.

### Ensuring Code Style Compliance
To ensure that these code style guidelines are consistently applied, we use Husky alongside lint-staged. This setup automatically lints and formats code upon commit, aligning with our defined ESLint rules and Prettier configurations. This helps maintain code quality and consistency, preventing style violations from being committed to the repository.

## Contributing

Contributions to this project are welcome! Please refer to `CONTRIBUTING.md` for more details on how to contribute, including code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
