# Sistema de Donaciones - Server

## Description

This is the backend server for the Sistema de Donaciones project. It manages projects, providers, and both physical and online donations. The server is designed to support both administrator and donor interfaces.

## Technologies Used

- Node.js with Express
- PostgreSQL with Prisma ORM
- JWT and Google OAuth for authentication
- Stripe for payment processing
- Grafana for logging and monitoring

## Getting Started

1. Clone the repository
2. Navigate to the server directory:

   ```sh
   cd server
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root of the server directory
   - Add necessary environment variables (see Environment Variables section below)

5. Set up the database (see Database Setup section below)

6. Start the development server:

   ```sh
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root of the server directory with the following variables:

```
DATABASE_URL="postgres://tmmngcyo:MqHNCXGaVQMX7_TQiVyCmO16YUuUeLFG@raja.db.elephantsql.com/tmmngcyo "
```

## Database Setup

Due to limitations with some hosted database services, we use `prisma db push` to set up and update our database schema:

1. Ensure you have Prisma CLI installed:

   ```sh
   npm install prisma --save-dev
   ```

2. Push the schema directly to the database:

   ```sh
   npx prisma db push
   ```

   This command will apply your schema directly to the database without creating migration files.

3. Generate the Prisma Client based on your schema:

   ```sh
   npx prisma generate
   ```

After running these commands, your database will be set up with the correct schema, and you'll be able to use Prisma Client to interact with your database in your application code.

For future schema changes:

1. Make changes to your `schema.prisma` file.
2. Run `npx prisma db push` to apply the changes directly to your database.
3. Run `npx prisma generate` to update your Prisma Client.

Note: This method bypasses Prisma's migration system. Be extra careful when making changes to your production database, and always backup your data before making schema changes.

## API Endpoints

[List and briefly describe your main API endpoints here]

## Authentication

- JWT for user sessions
- Google OAuth integration for donor login
- Authentication middleware to protect routes

## Security

- Implementation of RBAC (Role-Based Access Control)
- Middleware for handling CORS, rate limiting, and security headers
- Input data validation

## Testing

- Unit tests with Jest
- Integration tests
- E2E tests with Cypress

## Logging and Monitoring

The system uses Grafana for monitoring and log visualization. This allows for efficient tracking of application performance, user activity, and facilitates early problem detection.

## Contributing

[Instructions for contributing to the project]

## License

[Type of license]
