# API

This API documentation will help to understand the structure of this web application. It's based on a RESTful architecture using standard HTTP methods such as `GET`, `POST`, `PUT` and `DELETE`.

The API does not require an approved API key but instead will reject requests on sensitive endpoints. Detailed information on the specific endpoints is available in this documentation.

# Authorization

## GET /api/auth

### Description

Retrieve user authentication status.

### Responses
- **200 OK**: User has valid JWT token in cookie storage.
```json
{
	"success": true,
	"message": "OK."
}
```
- **401 Unauthorized**: User does not have a JWT token in cookie storage.
```json
{
	"success": false,
	"message": "No authentication token found."
}
```
- **403 Forbidden**: User has invalid JWT token in cookie storage.
```json
{
	"success": false,
	"message": "Invalid or expired token."
}
```
- **403 Forbidden**: User is not whitelisted via database.
```json
{
	"success": false,
	"message": "User not whitelisted."
}
```
- **500 Internal Server Error**: Token data is not of type 'JwtPayload'
```json
{
	"success": false,
	"message": "Internal Server Error: invalid token payload."
}
```
- **500 Internal Server Error**: Server is not set up correctly.
```json
{
	"success": false,
	"message": "Internal Server Error: missing server configuration."
}
```