# Study Planner

This is a group React project built with Vite. The app helps students manage subjects, assignments, calendar events, study sessions, resources, and profile settings.

## Requirements

To run this project, make sure you have the following installed:

- Node.js
- npm

We do not need a separate `requirements.txt` file for this project. Since this is a React app, dependencies are managed through:

- `package.json`
- `package-lock.json`

## Setup

Clone the repository, then install dependencies using:

```bash
npm install
```

## Run the Project

Start the development server with:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually something like `http://localhost:5173`.

## Build the Project

To create a production build:

```bash
npm run build
```

## Project Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates the production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Important 

These files should be included in the repository:

- `package.json`
- `package-lock.json`
- `src/`
- `public/`
- `index.html`
- `vite.config.js`
- `eslint.config.js`

The `node_modules/` folder should not be uploaded to GitHub.

After cloning the repo, each group member should run:

```bash
npm install
npm run dev
```

## Project Structure

- `src/main.jsx` is the React entry point
- `src/App.jsx` connects the main layout, routes, and shared provider
- `src/context/` stores shared app state and logic
- `src/pages/` contains each main page of the app
- `src/components/` contains reusable UI pieces like the navbar and icons
- `src/data/initialData.js` stores starter data
- `src/utils/` contains helper functions for storage, dates, and formatting

