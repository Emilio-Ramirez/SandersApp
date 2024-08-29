# Sanders App Client

This is the client-side application for Sanders App, built with React and Material-UI.

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- Yarn package manager

### Installation

1. Clone the repository:

```

git clone [repository-url]
cd [repository-name]/client

```

2. Install dependencies:

```

yarn install

```

### Development

To start the development server:

```

yarn dev

```

This will start the Vite development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Other Scripts

- `yarn start`: Preview the production build
- `yarn lint`: Run ESLint
- `yarn lint:fix`: Run ESLint and automatically fix issues
- `yarn prettier`: Format code with Prettier
- `yarn rm:all`: Remove all generated directories and dependencies
- `yarn re:start`: Remove all, reinstall dependencies, and start dev server
- `yarn re:build`: Remove all, reinstall dependencies, and create a production build

# Authentication

The app uses JWT for authentication. The `AuthContext` provides the following functionality:

- `login`: Log in a user and store the JWT token
- `logout`: Log out the user and remove the token
- `loginAndRedirect`: Log in and redirect to a specified route
- `user`: Current user information
- `loading`: Indicates if the auth state is being loaded

## Protected Routes

Protected routes are implemented using the `ProtectedRoute` component. It ensures that only authenticated users can access certain parts of the application.

## API Integration

The `api.js` utility is used for making authenticated API requests. It automatically includes the JWT token in the request headers.

## Project Structure

```

client/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   │   └── sections.jsx
│   ├── utils/
│   │   └── api.js
│   ├── app.jsx
│   └── main.jsx
└── ...configuration files

```

## Technologies Used

- React
- Material-UI
- Vite
- React Router
- Apexcharts
- Emotion
- and more (see package.json for full list)

## License

This project is licensed under the MIT License.
