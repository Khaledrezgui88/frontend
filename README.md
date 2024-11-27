## GMC-PROJECT-FRONTEND

## PROJECT Overview

This project is the frontend part of an e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). This part of the project manages the user interface and interaction with the backend API.

## Installation and Setup

- **Install dependencies**: `npm install`

- **Set up environment variables**:
   - Create a file named `.env` in the project’s root folder.
   - Copy everything from the `.env.example` file into your new .env file.
   - Update the values if needed, like adding your own database URL.

## Project Structure

The project is organized as follows:

- 📦node_modules
- 📦public
- 📦src
  - 📂 assets
    - 📂 icons
    - 📂 images
  - 📂redux
    - 📦examples
      - 📜exampleSlice.js
      - 📜exampleService.js
    - 📜store.js
  - 📂pages
   - 📂 customer
    - 📂 example
      - 📜Example.css
      - 📜Example.jsx
   - 📂 admin
    - 📂 example
      - 📜Example.css
      - 📜Example.jsx
  - 📂components
    - 📂privateRoute
      - 📜Private.css
    - 📂footer
      - 📜footer.css
      - 📜footer.jsx
  - 📂middlewares
  - 📂 apis
      - 📜example.api.js
  - 📂 hooks
      - 📜useExample.js
  - 📜 App.css
  - 📜 App.js
  - 📜 index.js
📜.env
📜package-lock.json
📜package.json
📜README.md

## Development Tools

- [JavaScript](https://www.javascript.com/)
  - Main language for both frontend and backend.

- [React](https://react.dev/)
  - A JavaScript library for building user interfaces.

- [ReactRouter](https://reactrouter.com/en/main)
  - Navigation management for the application.

- [axios](https://axios-http.com/)
  -  HTTP client for making API requests.

- [ReduxToolkit](https://redux-toolkit.js.org/)
  - efficient Redux development.

- [Prettier](https://prettier.io/)
  - Code formatting tool to keep style consistent.

## Coding Guidelines

  # Commenting Code

- Language: Write comments in `English`.
- Format: Leave a space after `//`, `/*` or `*/`.
  - Good: `/* my comment */`
  - Bad: `/*my comment*/`
- Explain the purpose and functionality of the code.
- Use comments for complex or non-obvious code.
- Comment workarounds or temporary solutions.
- Use the [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) extension for readability.


### Naming Components and Files

- Components: Use PascalCase for component names (capitalize the first letter of each word). 
- The file name should describe the purpose of the file.
- For example`productCard.jsx`.

### Hook Rules

- Custom Hooks: Name your hooks with the use prefix.
- For example : `useFetch.js`...

### Variable/Constant Naming Conventions

- The naming convention for variables and constants should be **lowerCamelCase**.
- The variable name should describe the value stored in the variable/constant.
- For example, if the variable stores the username, it should be named `userName`.
- We should avoid unclear variable names, like `let x`.

### Git Commit Rules

- **Commit Messages**: Commit messages should start with a capital letter and should end with a period. The message should be concise but descriptive enough to understand the changes made. For example, "Add example controllers."


## Scripts

The project includes the following npm scripts:
- `start`: Starts the application in development mode