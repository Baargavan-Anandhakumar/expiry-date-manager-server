# Auth APIs Implementation Walkthrough

The Auth APIs (Login & Register) have been successfully implemented according to the required Controller-Service-Repository pattern.

## Changes Made
- **Dependencies Installed:** Added `swagger-ui-express` and `swagger-jsdoc` for API documentation.
- **Database Layer:** Created `db.js` for MongoDB connection and `user.js` for the Mongoose schema (with `name`, `email`, `password`).
- **Data Access Layer (DAO):** Created `userDao.js` with `findByEmail` and `create` methods.
- **Service Layer:** Created `authService.js` to handle business logic (password hashing via `bcrypt`, token generation via `jsonwebtoken`).
- **Controller Layer:** Created `authController.js` to manage request validation, delegate to `authService`, and format HTTP responses (including HTTP-only cookies).
- **Routes Layer:** Created `authRoutes.js` and defined `/register` and `/login` endpoints with `express-validator` and Swagger JSDoc annotations.
- **Swagger Documentation:** Created `swagger.js` configuration and mounted `/api-docs` endpoint in `server.js`.

## Validation & Testing

The server is currently running in the background. You can manually test the APIs via Swagger!

1. **Open Swagger UI:** Navigate to `http://localhost:5001/api-docs` in your browser.
2. **Register a User:** Expand the `/auth/register` route, click "Try it out", and send a JSON payload with `name`, `email`, and `password`.
3. **Login:** Expand the `/auth/login` route, click "Try it out", and send the `email` and `password` you just registered. The server will respond with a 200 OK and set a `jwtToken` cookie.

> [!TIP]
> If the backend fails to connect to the database, please make sure you have a local MongoDB instance running on port `27017` or provide a valid connection string via the `MONGO_URI` environment variable in your `.env` file.
