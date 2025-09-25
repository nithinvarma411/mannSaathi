# Chat API Testing Guide

This document provides instructions on how to test the chat API endpoints using Postman or Bruno.

## API Base URL
```
http://localhost:8080/api/chat
```

## Authentication Setup

The chat API requires JWT authentication. You need to include the JWT token in a cookie named `token`.

### Getting Authentication Tokens

1. First, register or login to get your authentication tokens
2. The tokens are typically returned in the response as cookies
3. Copy the token for the appropriate user (student or counselor)

### Setting up Authentication in Postman/Bruno

#### Postman:
1. Go to the "Authorization" tab
2. Select "Cookies" from the type dropdown
3. Add a cookie with:
   - Domain: localhost
   - Path: /
   - Name: token
   - Value: [Your JWT token]

#### Bruno:
1. In your collection, set up the cookie in the "Request" level or at the collection level
2. Go to the "Headers" section and add:
   - Key: Cookie
   - Value: token=[Your JWT token]

## API Endpoints

### 1. Get Counselors
- **Method**: GET
- **URL**: `/api/chat/counselors`
- **Description**: Retrieves a list of all counselors available for chat

#### Example Request
```
GET http://localhost:8080/api/chat/counselors
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Example Response
```json
{
  "data": [
    {
      "_id": "68be5f9264c3d8d57bcb26b0",
      "name": "Jane Smith",
      "role": "counsellor",
      "avgRating": 0,
      "ratingCount": 0
    },
    {
      "_id": "68d21dc6f25b2ff618671c20",
      "name": "Ankit",
      "role": "counsellor",
      "avgRating": 6,
      "ratingCount": 3
    },
    {
      "_id": "68d53bd773759f1224c7a5da",
      "name": "Rohit Kumar",
      "role": "counsellor",
      "avgRating": 0,
      "ratingCount": 0
    }
  ]
}
```

### 2. Send Message
- **Method**: POST
- **URL**: `/api/chat/send-message`
- **Description**: Sends a message to another user

#### Headers
- `Content-Type: application/json`

#### Request Body
```json
{
  "receiverId": "68d53bd773759f1224c7a5da",
  "message": "Your message here"
}
```

#### Example Request
```
POST http://localhost:8080/api/chat/send-message
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "receiverId": "68d53bd773759f1224c7a5da",
  "message": "Hello counselor, I need help with my mental health."
}
```

#### Example Response
```json
{
  "ok": true,
  "data": {
    "senderId": "68d3b0eb73759f1224c7a366",
    "receiverId": "68d53bd773759f1224c7a5da",
    "message": "Hello counselor, I need help with my mental health.",
    "conversationId": "68d3b0eb73759f1224c7a366_68d53bd773759f1224c7a5da",
    "_id": "68d5476446f0b00c30494117",
    "createdAt": "2025-09-25T13:45:08.647Z",
    "updatedAt": "2025-09-25T13:45:08.647Z",
    "__v": 0
  }
}
```

### 3. Get Messages with a Specific User
- **Method**: GET
- **URL**: `/api/chat/messages/:userId`
- **Description**: Retrieves all messages between the authenticated user and the specified user

#### Path Parameters
- `userId`: The ObjectId of the user to get messages with

#### Example Request
```
GET http://localhost:8080/api/chat/messages/68d53bd773759f1224c7a5da
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Example Response
```json
{
  "ok": true,
  "data": [
    {
      "_id": "68d53ddf6e4e1ad227325cdd",
      "senderId": {
        "_id": "68d3b0eb73759f1224c7a366",
        "name": "Ankit kumar",
        "role": "student"
      },
      "receiverId": {
        "_id": "68d53bd773759f1224c7a5da",
        "name": "Rohit Kumar",
        "role": "counsellor"
      },
      "message": "Hello, this is a test message from student to counselor",
      "conversationId": "68d3b0eb73759f1224c7a366_68d53bd773759f1224c7a5da",
      "createdAt": "2025-09-25T13:04:31.381Z",
      "updatedAt": "2025-09-25T13:04:31.381Z",
      "__v": 0
    },
    // ... more messages
  ]
}
```

### 4. Get All Conversations for Current User
- **Method**: GET
- **URL**: `/api/chat/conversations`
- **Description**: Retrieves a list of all conversations for the authenticated user

#### Example Request
```
GET http://localhost:8080/api/chat/conversations
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Example Response
```json
{
  "ok": true,
  "data": [
    {
      "otherUser": {
        "_id": "68d53bd773759f1224c7a5da",
        "name": "Rohit Kumar",
        "role": "counsellor"
      },
      "lastMessage": "Hello counselor, I need help with my mental health.",
      "lastMessageAt": "2025-09-25T13:45:08.647Z"
    }
  ]
}
```

## Testing with Bruno

1. Create a new collection for your chat API tests
2. Add four request folders:
   - `GET counselors`
   - `POST send-message`
   - `GET messages`
   - `GET conversations`
3. Set up the base URL for your collection as `http://localhost:8080/api/chat`
4. Add the cookie authentication as described above
5. Use the examples provided to create the requests

## Testing with Postman

1. Create a new Postman collection for your chat API tests
2. Add the following requests:
   - Get Counselors (GET)
   - Send Message (POST)
   - Get Messages (GET)
   - Get Conversations (GET)
3. Set the base URL to `http://localhost:8080/api/chat`
4. Configure the authentication as described above
5. Use the examples provided to set up the requests

## Sample Test Data

User IDs for testing:
- Student: `68d3b0eb73759f1224c7a366` (Ankit kumar)
- Counselor: `68d53bd773759f1224c7a5da` (Rohit Kumar)

## Expected Response Codes

- 200: Success for all operations
- 400: Bad request (e.g., invalid receiverId format, missing message)
- 401: Unauthorized (missing or invalid token)
- 500: Internal server error

## Notes

- Chats are only allowed between students and counselors
- Both users must exist in the database
- Messages are limited to 1000 characters
- The conversation ID is automatically generated based on the two user IDs