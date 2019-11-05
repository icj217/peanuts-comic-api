# peanuts-comic-api

Node.js Express API to serve up Peanuts comics and handle user subscription sign-up

Deployed using the Serverless Framework

## Routes

### `GET /version`

Returns version of API (based on package.json)

### `GET /comics/today`

Returns JSON payload with details about today's comic, including S3 URL to the image.

"Today" is based on current UTC time, not the user's local timezone.

### `POST /signup`

**NOTE: Work in Progress**

Handles user signup for email notifications when new comic is available