![Schiro's GameHub](https://github.com/user-attachments/assets/b03a3c03-2842-4f28-89e2-80ad30105ac3)

#

Schiro’s GameHub is a React-based web application developed for Twitch streamer [xSchiro](https://www.twitch.tv/xschiro). The application provides a visual and interactive list of games that are planned to be streamed in the future. It acts as a public wishlist, allowing viewers to stay informed and engaged with upcoming content.

Only whitelisted users are granted permission to manage and update the list. User authentication is seamlessly integrated using [Twitch OAuth 2.0](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/) and secured through [JSON Web Tokens (JWT)](https://jwt.io/introduction). All application data - including game entries, user whitelist and session data - is stored in a [MongoDB](https://www.mongodb.com/) database.

# Installation

To get started, you need to clone the GitHub repository to your local device using the following command:

```bash
git clone https://github.com/fiscdev/schiro-gamehub.git
```

Because this repository is a monorepo, it contains three package information files. In the root directory `/`, in `/client` and in `/server`. To install all the required node modules, you need to run

```bash
npm install
```

in all three directories.

You also need a `.env` file in `/client` and `/server` to properly setup the environment variables of the application.

`/client/.env`

```env
VITE_API_URL=<backend URL>                              (e.g. http://localhost:8080/)
VITE_IMPRINT_NAME=<your name>                           (optional)
VITE_IMPRINT_STREET=<your street>                       (optional)
VITE_IMPRINT_CITY=<your postal code> <your city>        (optional)
VITE_IMPRINT_COUNTRY=<your county>                      (optional)
VITE_IMPRINT_EMAIL=<your email>                         (optional)
```

`/server/.env`

```env
NODE_ENV=dev|test|production
FRONTEND_SERVER_URL=<frontend URL>                      (e.g. http://localhost:5173/)
BACKEND_SERVER_URL=<backend URL>                        (e.g. http://localhost:8080/)
BACKEND_SERVER_PORT=<backend port>
MONGODB_URI=<mongodb URI>
TWITCH_CLIENT_ID=<twitch id>
TWITCH_CLIENT_SECRET=<twitch secret>
JWT_SECRET=<string>
HASH_SECRET=<string>
SESSION_SECRET=<string>
```

> **_ATTENTION:_** If you build the application and then start the server with `npm run start`, you will need to set `NODE_ENV=test|production` and may need to set `FRONTEND_SERVER_URL` and `BACKEND_SERVER_URL` to the same URL as the backend serves the frontend in production environment.

> **_NOTE:_** You need to create a Twitch application [here](https://dev.twitch.tv/console/apps) and get the client id and the secret. You will also need to add `<backend url>/api/auth/twitch/callback` to **OAuth Redirect URLs**.

To finally start both the vite development server and the backend server in development mode, just run the the following command in `/client` and `/server` in different terminal instances:

```bash
npm run dev
```

# License

Licensed under Copyright © 2025 Finn Schwarz. All rights reserved.
