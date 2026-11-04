# LinkMe server

Set `.env` with the required backend secrets, then run `npm install` and `npm run dev` from this directory. The server starts on port 3000 by default; check `GET /health` for status.

Routes are `POST /register`, `POST /login`, `POST /logout`, `DELETE /account`, `POST /upload`, `GET/PATCH /me`, and `GET /public/:username`. Passwords are bcrypt-hashed, JWTs are returned to the client, and images are sent to Cloudinary.
