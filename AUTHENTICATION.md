# Authentication System

This document explains how the authentication system works in the NanuBhai client application.

## Overview

The authentication system is built using:
- **Frontend**: Next.js with TypeScript, React Context for state management
- **Backend**: Node.js with Express, MongoDB, JWT tokens
- **Authentication Flow**: Email/Password registration and login

## Features

### Registration
- Full name, email, phone number, and password
- Password confirmation validation
- Email verification (backend sends verification email)
- Form validation with real-time error feedback
- Responsive design with modern UI

### Login
- Email and password authentication
- JWT token-based authentication
- Automatic token storage in localStorage
- Form validation with error handling
- Responsive design

### User Management
- User profile information display
- Logout functionality
- Authentication state management
- Protected routes (can be implemented)

## API Endpoints

### Backend (Bazarkori_Backend)
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/` - Get current user (protected)
- `POST /api/user/logout` - User logout (protected)

### Frontend Integration
- Uses `authService` for API calls
- Uses `AuthContext` for state management
- Automatic token handling and storage

## Usage

### Registration
1. Navigate to `/register`
2. Fill in the form with:
   - Full Name
   - Email Address
   - Phone Number
   - Password
   - Confirm Password
3. Submit the form
4. Check email for verification link

### Login
1. Navigate to `/login`
2. Enter email and password
3. Submit the form
4. User will be redirected to home page

### Testing
1. Navigate to `/test-auth` to see authentication status
2. View user information when logged in
3. Test logout functionality

## Environment Setup

### Backend
Make sure the backend is running on `http://localhost:4000`

### Frontend
The frontend automatically connects to the backend API. No additional environment variables needed for basic functionality.

## Error Handling

The system includes comprehensive error handling:
- Form validation errors
- API error responses
- Network errors
- User-friendly error messages

## Security Features

- Password hashing (bcrypt)
- JWT token authentication
- HTTP-only cookies for refresh tokens
- Email verification
- Input validation and sanitization

## File Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Authentication context
├── services/
│   └── authService.ts           # API service for auth
└── app/
    ├── login/
    │   └── page.tsx            # Login page
    ├── register/
    │   └── page.tsx            # Registration page
    └── test-auth/
        └── page.tsx            # Test page
```

## Development

To start development:
1. Start the backend server: `cd Bazarkori_Backend && npm start`
2. Start the frontend: `cd NanuBhai_Cliient && npm run dev`
3. Access the application at `http://localhost:3000` 