# Night Club – Frontend

This project is a modern nightclub website built with **Next.js** and **React**. The website allows users to explore upcoming events, view event details, make table reservations, and contact the nightclub.

## Next.js

The project uses Next.js with the App Router. Next.js is a React framework that provides features such as file-based routing, server and client components, and built-in performance optimizations.

Pages are organized inside the `src/app` directory. Each route is defined by a folder containing a `page.jsx` file.

For example:

- `src/app/page.jsx` – Home page
- `src/app/events/page.jsx` – Events page
- `src/app/book-table/page.jsx` – Table reservations
- `src/app/contact/page.jsx` – Contact page

## Technologies

The project uses the following technologies and libraries:

- **Next.js** – React framework and routing.
- **React** – Building user interfaces with reusable components.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Zustand** – State management.
- **Fuse.js** – Fuzzy search functionality.
- **Lucide React** – Icon library.

## Getting Started

First, install the project dependencies:

`npm install`

Then, start the development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Available Scripts

- `npm run dev` – Starts the development server.
- `npm run build` – Creates an optimized production build.
- `npm run start` – Starts the production server.
- `npm run lint` – Runs ESLint to check the code for errors.
