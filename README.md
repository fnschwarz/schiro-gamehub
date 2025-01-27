# Schiro Game Tracker

Schiro Game Tracker is a private web application that allows users to track and manage their game collection.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add games to your collection by entering their Steam App ID.
- View a list of all games in your collection.
- Responsive design.

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB

### Client

1. Navigate to the `client` directory:
    ```sh
    cd client
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the [client](http://_vscodecontentref_/0) directory and add the following environment variables:
    ```env
    VITE_BACKEND_URL=http://localhost:8080
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

### Server

1. Navigate to the [server](http://_vscodecontentref_/1) directory:
    ```sh
    cd server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the [server](http://_vscodecontentref_/2) directory and add the following environment variables:
    ```env
    MONGODB_URI=<your-mongodb-uri>
    MONGODB_DATABASE_NAME=<your-database-name>
    APPS_DOC_ID=<your-apps-document-id>
    FRONTEND_SERVER_DOMAIN=http://localhost:5173
    STEAM_BASE_URL=https://store.steampowered.com
    STEAM_HEADER_URL=https://cdn.akamai.steamstatic.com/steam/apps
    ```

4. Start the server:
    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Enter a Steam App ID in the input field and click "Spiel hinzufügen" to add a game to your collection.
3. View the list of games in your collection.

## API Endpoints

- `GET /api/games`: Retrieve a list of all games in the collection.
- `GET /api/games/:id`: Retrieve details of a specific game by its Steam App ID.
- `POST /api/games/post`: Add a new game to the collection.

## Contributing

This project is private. Please contact the repository owner for contributing guidelines.

## License

This project is private and copyrighted. All rights reserved.