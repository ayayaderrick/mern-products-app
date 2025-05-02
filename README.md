# MERN Product Management App

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for managing products. It features a RESTful API backend and a responsive React frontend built with TypeScript, Vite, and Shadcn/ui.

## Features

- **Create Products:** Add new products with details via the `/create` page.
- **View Products:** Display a list of all products on the homepage.
- **Update Products:** Edit existing product details directly from the homepage.
- **Delete Products:** Remove products from the list via the homepage.
- **RESTful API:** Well-defined API endpoints for product management.
- **Modern Tech Stack:** Utilizes modern JavaScript (ES6 Modules on backend), TypeScript on frontend, Vite for fast development, and Shadcn/ui for sleek UI components.

## Tech Stack

**Backend:**

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for Node.js.
- **MongoDB:** NoSQL database for storing product data.
- **Mongoose:** ODM library for MongoDB and Node.js.
- **ES6 Modules:** Using native JavaScript modules (`import`/`export`).

**Frontend:**

- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript adding static types.
- **Vite:** Next-generation frontend tooling for fast development and builds.
- **Shadcn/ui:** Re-usable UI components built with Radix UI and Tailwind CSS.
- **Tailwind CSS:** Utility-first CSS framework.
- **Fetch API:** For making HTTP requests to the backend API.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (Make sure the MongoDB server is running)

## Getting Started

Follow these steps to set up and run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Set up the Backend:**

    - Navigate to the backend directory (e.g., `cd backend`):
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      npm install
      # or
      yarn install
      ```
    - Create a `.env` file in the `backend` directory.
    - Add your MongoDB connection string and other environment variables to the `.env` file:
      ```env
      MONGODB_URI=your_mongodb_connection_string
      PORT=5000 # Or any port you prefer for the backend
      ```
    - Ensure your MongoDB server is running.

3.  **Set up the Frontend:**
    - Navigate to the frontend directory (e.g., `cd ../frontend`):
      ```bash
      cd ../frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      # or
      yarn install
      ```
    - Create a `.env.local` file in the `frontend` directory.
    - Add the backend API base URL:
      ```env
      VITE_API_BASE_URL=http://localhost:5000/api # Adjust port if needed
      ```
      _(Note: The `VITE_` prefix is required by Vite to expose variables to the client-side code)._

## Running the Application

1.  **Start the Backend Server:**

    - In the `backend` directory:
      ```bash
      use nodemon for development: npm run dev / yarn dev
      ```
    - The backend server should start, typically on `http://localhost:5000` (or the port specified in your `.env`).

2.  **Start the Frontend Development Server:**
    - In the `frontend` directory:
      ```bash
      npm run dev
      # or
      yarn dev
      ```
    - The frontend development server will start, usually on `http://localhost:5173` (Vite's default).
    - Open your browser and navigate to the address provided by Vite.

## API Endpoints (Example)

The backend provides the following REST API endpoints under the `/products` base route:

- `GET /products`: Get all products.
- `GET /products/:id`: Get a single product by ID.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update an existing product by ID.
- `DELETE /products/:id`: Delete a product by ID.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information (if applicable).
