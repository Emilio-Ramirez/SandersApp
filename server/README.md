# Sanders App Server

This is the backend server for the Sanders App project.

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or Yarn package manager
- PostgreSQL database

### Installation

1. Clone the repository:

   ```
   git clone [repository-url]
   cd [repository-name]/server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the server directory and add:

    ```
    DATABASE_URL="postgres://tmmngcyo:MqHNCXGaVQMX7_TQiVyCmO16YUuUeLFG@raja.db.elephantsql.com/tmmngcyo "
    JWT_SECRET = "94eb4a1159e0700968605c5ee8ab80015dc69b19eba38647e405de45d0d6c4ff"
    ```

4. Update prisma schema:

   ```
   npx prisma  generate

    ```

5. Fill the db with seeds

```
  npm run seed 
```

## Development

To start the development server:

```

npm run dev

```

The server will start on the port specified in your `.env` file (default: 4000).

## Authentication

The server uses JWT for authentication. The following endpoints are available:

- `POST /api/auth/login`: Log in a user
- `POST /api/auth/register`: Register a new user
- `GET /api/auth/verify-token`: Verify a JWT token

## Protected Routes

All routes under `/api/users` are protected and require a valid JWT token.

## API Endpoints

- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration
- `GET /api/auth/verify-token`: Verify JWT token
- `GET /api/users`: Get all users (protected)
- `GET /api/users/:id`: Get user by ID (protected)
- `PUT /api/users/:id`: Update user (protected)
- `DELETE /api/users/:id`: Delete user (protected)

## Database

To make a change to the database schema, update the `schema.prisma` file and run:

   ```

   npx prisma db push

   ```

## Project Structure

```

server/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   └── authService.js
│   └── utils/
│       └── jwt.js
├── server.js
└── ...configuration files

```

## License

This project is licensed under the MIT License.
