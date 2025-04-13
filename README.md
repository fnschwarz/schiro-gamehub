![Schiro's GameHub](https://github.com/user-attachments/assets/b03a3c03-2842-4f28-89e2-80ad30105ac3)

#

Schiro's GameHub is a React-based web application developed for Twitch streamer [xSchiro](https://www.twitch.tv/xschiro). It provides a visual overview of games scheduled to be played in the future, functioning as a public wishlist. Editing rights are restricted to whitelisted users. User authentication is handled via [Twitch OAuth 2.0](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/) and [JSON Web Tokens (JWT)](https://jwt.io/introduction). All data is stored in a [MongoDB](https://www.mongodb.com/) database.

## 🚀 Features

- Add games to the list by entering their **Steam App ID** in the input field and clicking `Add Game`
- Delete games from the list by clicking the **$\times$ icon** in the top right corner of each list item

## 🛠️ API Endpoints

- `GET /login` — Redirects the user to Twitch OAuth 2.0
- `GET /logout` — Deletes the JWT from cookie storage
- `GET /auth/twitch/callback` — Generates a new JWT if Twitch authorization succeeds
- `GET /api/authenticate` — Verifies the JWT and returns the authenticated user's `id` and `email`
- `GET /api/apps` — Returns a list of all stored Steam App IDs
- `POST /api/apps/add` — Adds a new app entry to the database using Steam App details
- `POST /api/apps/remove` — Removes a app entry from the database

## 🤝 Contributing

This project is private. For contribution requests, please contact the repository owner directly.

## 📄 License

This project is private and copyrighted.  
All rights reserved.