# Project Context for Qwen Code

## Project Overview

This is a **Node.js/TypeScript** backend server built with **Fastify** for a **mental health chat application** called "CalmSpace". The server provides REST API endpoints for user authentication, university management, admin operations, and review systems. It uses MongoDB as the database with Mongoose ODM and implements JWT-based authentication with cookies.

The application appears to be designed for a university-based mental health platform where students can connect with counselors, leave reviews, and access mental health resources. It includes multiple user roles (student, counselor, university admin, and platform admin) with different permissions and access levels.

## Key Technologies

*   **Framework:** Fastify (v5.5.0)
*   **Language:** TypeScript (compiled to CommonJS)
*   **Database:** MongoDB (with Mongoose ODM)
*   **Authentication:** JSON Web Tokens (JWT) with cookie storage
*   **Validation:** Zod for request validation
*   **Email:** Nodemailer for OTP delivery
*   **Package Manager:** pnpm

## Building and Running

The project uses standard Node.js scripts defined in `package.json`:

*   **Development Server:** `pnpm dev` (Starts the development server with hot reloading using tsx watch)
*   **Build:** `pnpm build` (Compiles TypeScript to JavaScript in the dist directory)
*   **Start (Production):** `pnpm start` (Starts the production server)

## Development Conventions

*   **Architecture:** The application follows a component-based architecture with separation of concerns:
    *   `controllers` - Handle HTTP requests and responses
    *   `models` - Define Mongoose schemas and types
    *   `routes` - Define API endpoints
    *   `services` - Contain business logic
    *   `lib` - Utility functions and plugins
    *   `config` - Configuration files
    *   `utils` - Helper functions
*   **Authentication:** JWT authentication is implemented with custom decorators for different user roles (user, admin, uni-admin)
*   **Validation:** Zod is used for request body validation
*   **Error Handling:** Consistent error handling with try-catch blocks and appropriate HTTP status codes
*   **Type Safety:** TypeScript is used throughout the codebase with type definitions for all models

## Key Features

*   **Multi-role Authentication System:** Supports students, counselors, university admins, and platform admins with role-based access control
*   **OTP-based Password Setup:** First-time users receive OTPs via email to set initial passwords
*   **University Management:** University registration, approval, and counselor assignment
*   **Review System:** Students can submit and delete reviews for counselors
*   **CSV Upload:** Supports uploading user data from CSV files
*   **Email Integration:** OTPs sent via email using nodemailer with configurable SMTP settings
*   **Real-time Chat:** Students can chat with counselors via WebSocket-based chat system

## Key Files and Directories

*   `src/`: Contains the main application code
    *   `src/server.ts`: Entry point for the application, connects to DB and starts the server
    *   `src/app.ts`: Builds the Fastify application with middleware and routes
    *   `src/config/index.ts`: Configuration management with environment variables
    *   `src/lib/db.ts`: MongoDB connection logic
    *   `src/lib/jwt.ts`: JWT authentication plugin with role-based access
*   `routes/`: Contains API route definitions
    *   `auth.routes.ts`: Authentication endpoints
    *   `university.routes.ts`: University-related endpoints
    *   `admin.routes.ts`: Platform admin endpoints
    *   `uni-admin.routes.ts`: University admin endpoints
    *   `review.routes.ts`: Review-related endpoints
    *   `chat.routes.ts`: Chat-related endpoints
*   `models/`: Contains Mongoose schemas and types
    *   `User.ts`: Defines user schema for students, counselors, and university admins
    *   `University.ts`: Defines university schema
    *   `ChatMessage.ts`: Defines chat message schema
*   `sihTest/`: Contains Bruno test files for API testing
*   `package.json`: Defines project dependencies and scripts
*   `tsconfig.json`: TypeScript configuration

## Client Application

The project also includes a Next.js frontend application in the `client` directory:

*   **Framework:** Next.js v15.5.4 with React 19.1.0
*   **Styling:** Tailwind CSS with Radix UI components
*   **Icons:** Lucide React
*   **Animations:** Framer Motion
*   **Charts:** Recharts

## API Documentation

The chat API endpoints are documented in `chatapi.md` including:
*   Send Message (`POST /api/chat/send-message`)
*   Get Messages (`GET /api/chat/messages/:userId`)
*   Get Conversations (`GET /api/chat/conversations`)

## Environment Variables

Key environment variables are defined in `.env`:
*   `MONGO_URI`: MongoDB connection string
*   `JWT_SECRET`: Secret for JWT token signing
*   `PORT`: Server port (default: 8080)
*   `SMTP_*`: Email configuration for OTP delivery

## Project Structure

The project is organized as a full-stack application with:
*   `client/` - Next.js frontend application
*   `server/` - Fastify backend application
*   Shared configuration for pnpm monorepo management