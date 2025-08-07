# Stockora Dashboard Authentication Integration

## Overview

This document explains how the authentication system has been integrated between the frontend and dashboard applications of Stockora.

## Authentication Flow

1. Users register or login through the frontend application
2. The backend authenticates users and creates a session
3. The dashboard application uses the same authentication system to verify user sessions
4. Protected routes in the dashboard redirect unauthenticated users to the login page

## Components Added

### Authentication Context

- `AuthContext.jsx`: Manages authentication state, including login, logout, and session checking
- Uses axios to communicate with the backend authentication endpoints

### Protected Route

- `ProtectedRoute.jsx`: Ensures only authenticated users can access dashboard routes
- Redirects unauthenticated users to the login page
- Shows a loading state while checking authentication

### Login Component

- `Login.jsx`: Provides a login form for users to authenticate
- Redirects to the dashboard after successful login

### Menu Updates

- Added logout functionality to the Menu component
- Displays the current user's information

## How to Use

### Starting the Applications

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm run dev
   ```

3. Start the dashboard application:
   ```
   cd dashboard
   npm run dev
   ```

### Authentication Flow

1. Users register or login through the frontend application
2. After successful authentication, users can access the dashboard application
3. The dashboard application will automatically check if the user is authenticated
4. If not authenticated, users will be redirected to the login page

## Technical Details

- Both applications use the same backend authentication endpoints
- Sessions are maintained using cookies (ensure `withCredentials: true` is set in axios)
- The backend uses Passport.js for authentication
- User information is shared between applications through the authentication context