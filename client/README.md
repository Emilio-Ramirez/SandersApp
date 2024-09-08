# Sanders App Client

This is the client-side application for Sanders App, built with React and Material-UI.

<details>
<summary>Getting Started</summary>

### Prerequisites

- Node.js (v14 or later recommended)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd [repository-name]/client
```

2. Install dependencies:

```bash
yarn install
```

</details>

<details>
<summary>Development</summary>

To start the development server:

```bash
yarn dev
```

This will start the Vite development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
This also be running a linting process in the background.

### Other Scripts

- `yarn start`: Preview the production build
- `yarn lint`: Run ESLint
- `yarn lint:fix`: Run ESLint and automatically fix issues
- `yarn prettier`: Format code with Prettier
- `yarn rm:all`: Remove all generated directories and dependencies
- `yarn re:start`: Remove all, reinstall dependencies, and start dev server
- `yarn re:build`: Remove all, reinstall dependencies, and create a production build

</details>

<details>
<summary>Authentication</summary>

The app uses JWT for authentication. The `AuthContext` provides the following functionality:

- `login`: Log in a user and store the JWT token
- `logout`: Log out the user and remove the token
- `loginAndRedirect`: Log in and redirect to a specified route
- `user`: Current user information
- `loading`: Indicates if the auth state is being loaded

</details>

<details>
<summary>Protected Routes</summary>

Protected routes are implemented using the `ProtectedRoute` component. It ensures that only authenticated users with the correct role can access certain parts of the application.

- `src/components/ProtectedRoute.jsx`: This component wraps routes that require authentication and specific role permissions. It performs the following checks:

  1. Checks if the user is authenticated. If not, it redirects to the login page.
  2. Checks if the user's role matches the allowed roles for the route. If not, it redirects to an unauthorized page.
  3. If both checks pass, it renders the protected content.

Usage example:

```jsx
<ProtectedRoute allowedRoles={['admin']}>
  <AdminComponent />
</ProtectedRoute>
```

- `src/components/ProtectedRoute.jsx`: This component wraps routes that require authentication. It checks the user's role and redirects to the login page if the user is not authenticated or to an unauthorized page if the user doesn't have the required role.

</details>

<details>
<summary>API Integration</summary>

The `api.js` utility is used for making authenticated API requests. It automatically includes the JWT token in the request headers.

</details>

<details>
<summary>Project and Application Structure</summary>

### Project Structure

```

client/
├── public/
│ └── assets/
├── src/
│ ├── components/
│ │ └── ProtectedRoute.jsx
│ ├── contexts/
│ │ └── AuthContext.jsx
│ ├── hooks/
│ ├── layouts/
│ ├── pages/
│ ├── routes/
│ │ └── sections.jsx
│ ├── utils/
│ │ └── api.js
│ ├── app.jsx
│ └── main.jsx
└── ...configuration files

```

### Application Structure

Our application is divided into two main sections: Admin and User. Each section has its own set of pages and a dedicated layout.

#### Admin Section

The admin section is accessible only to users with the 'admin' role.

##### Admin Layout

- Location: `src/layouts/adminDashboard/`
- Key files:
  - `index.jsx`: The main layout component
  - `header.jsx`: The header component for the admin dashboard
  - `nav.jsx`: The navigation component for the admin dashboard
  - `main.jsx`: The main content wrapper
  - `config-navigation.jsx`: Configuration for the admin navigation menu

##### Admin Pages

- Location: `src/pages/admin/`
- Key pages:
  - `dashboard.jsx`: The main admin dashboard
  - `user.jsx`: User management page
  - `products.jsx`: Product management page
  - `blog.jsx`: Blog management page
  - `donacion.jsx`: Donation management page
  - `addProject.jsx`: Page for adding new projects
  - `projectDescription.jsx`: Page for viewing project details

#### User Section

The user section is accessible to authenticated users with either 'user' or 'admin' roles.

##### User Layout

- Location: `src/layouts/userDashboard/`
- Key files:
  - `index.jsx`: The main layout component
  - `header.jsx`: The header component for the user dashboard
  - `nav.jsx`: The navigation component for the user dashboard
  - `main.jsx`: The main content wrapper
  - `config-navigation.jsx`: Configuration for the user navigation menu

##### User Pages

- Location: `src/pages/user/`
- Key pages:
  - `dashboard.jsx`: The main user dashboard
  - `projects.jsx`: Page for viewing available projects
  - `donation.jsx`: Page for making donations

#### Routing

The application uses React Router for navigation. The main routing configuration can be found in `src/routes/sections.jsx`. This file defines the routes for both admin and user sections, wrapping them with the appropriate layout and protection.

#### How It Works

1. When a user attempts to access a protected route, the `ProtectedRoute` component checks their authentication status and role.
2. If authenticated and authorized, the user is presented with the appropriate layout (admin or user).
3. Within this layout, the specific page component is rendered based on the current route.
4. The navigation menus in each layout are configured to show only the relevant links for that user type.

This structure allows for a clear separation between admin and user interfaces while maintaining a consistent layout and navigation within each section.

</details>

<details>
<summary>Technologies Used</summary>

- React
- Material-UI
- Vite
- React Router
- Apexcharts
- Emotion
- and more (see package.json for full list)

</details>
<details>
<summary>License</summary>
This project is licensed under the MIT License.
</details>
