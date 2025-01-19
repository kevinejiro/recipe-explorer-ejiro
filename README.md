# Recipe Explorer

## Live Demo

<img width="1512" alt="Screenshot 2025-01-18 at 10 39 42 AM" src="https://github.com/user-attachments/assets/7abd24e5-32cc-44f9-b23e-6eff01a941d1" />


You can view the live version of this project here: [Live Demo](https://recipe-explorer-ejiro.vercel.app/)

## Setup and Run the Project

### Prerequisites

- Node.js and npm should be installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kevinejiro/recipe-explorer-ejiro.git
   cd your-repo
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables. You can use the `.env.sample` file as a reference:
   ```env
   REACT_APP_BASE_URL='https://your-production-api-url.com'
   ```

### Running the Project

- To start the development server, run:

  ```bash
  npm start
  ```

- To build the project for production, run:

  ```bash
  npm run build
  ```

- To run tests, use:
  ```bash
  npm test
  ```

## Design Decisions and Trade-offs

- **Redux Toolkit and RTK Query**: The project uses Redux Toolkit for state management and RTK Query for data fetching and syncing. This combination provides a robust and scalable architecture for managing application state.

- **React Router**: We use React Router for client-side routing, which allows for a seamless navigation experience without full page reloads.

- **TypeScript**: The project is written in TypeScript, which helps catch errors at compile time and provides better tooling support.

- **Responsive Design**: The application is designed to be responsive, ensuring a good user experience across different devices. This is achieved using CSS media queries and flexible layout techniques.

- **Trade-offs**: While using TypeScript and Redux Toolkit adds complexity, it also provides type safety and a predictable state management pattern, which is beneficial for larger applications.

## Known Limitations

- **API Dependency**: The application relies on an external API for fetching recipe data. Any downtime or changes in the API could affect the application's functionality.

- **Limited Error Handling**: Currently, the application has basic error handling. Future improvements could include more comprehensive error management and user feedback.

- **Performance**: The application may experience performance issues with a large number of recipes due to client-side filtering and sorting. Server-side pagination and filtering could be considered for optimization.
