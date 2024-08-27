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

To start the development server and make it accessible from other devices on the same network:

```

yarn dev:host

```

### Building for Production

To create a production build:

```

yarn build

```

The built files will be in the `dist` directory.

### Other Scripts

- `yarn start`: Preview the production build
- `yarn lint`: Run ESLint
- `yarn lint:fix`: Run ESLint and automatically fix issues
- `yarn prettier`: Format code with Prettier
- `yarn rm:all`: Remove all generated directories and dependencies
- `yarn re:start`: Remove all, reinstall dependencies, and start dev server
- `yarn re:build`: Remove all, reinstall dependencies, and create a production build

## Project Structure

```

client/
├── public/
│ └── assets/
├── src/
│ ├── components/
│ ├── hooks/
│ ├── layouts/
│ ├── pages/
│ ├── routes/
│ ├── sections/
│ ├── theme/
│ ├── utils/
│ ├── app.jsx
│ └── main.jsx
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
