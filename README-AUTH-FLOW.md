# Stockora Authentication Flow

## Overview

This document explains the authentication flow between the Stockora frontend application and the dashboard application. The system is designed so that users sign up and log in through the frontend application, and upon successful authentication, they are redirected to the dashboard application.

## Application Structure

- **Frontend Application**: Running on `http://localhost:5173`
  - Contains the landing pages, signup, and login functionality
  - Uses React Router for navigation
  - Authenticates users against the backend API

- **Dashboard Application**: Running on `http://localhost:5174`
  - Contains the trading dashboard and related functionality
  - Protected by authentication
  - Shares the same authentication context with the frontend

- **Backend API**: Running on `http://localhost:3002`
  - Provides authentication endpoints (register, login, logout, check-auth)
  - Uses Passport.js with local strategy for authentication
  - Maintains user sessions

## Authentication Flow

1. **User Registration**:
   - User navigates to the signup page on the frontend application
   - User fills out the registration form and submits
   - Frontend sends a POST request to `http://localhost:3002/register`
   - Upon successful registration, the user is automatically logged in
   - Frontend redirects the user to the dashboard application

2. **User Login**:
   - User navigates to the login page on the frontend application
   - User enters credentials and submits
   - Frontend sends a POST request to `http://localhost:3002/login`
   - Upon successful login, the frontend redirects the user to the dashboard application

3. **Dashboard Authentication**:
   - When the dashboard application loads, it checks if the user is authenticated
   - It sends a GET request to `http://localhost:3002/check-auth`
   - If authenticated, the dashboard displays the user's information and trading data
   - If not authenticated, the dashboard shows its own login page with a link back to the main site

4. **Logout**:
   - User clicks the logout button in the dashboard
   - Dashboard sends a GET request to `http://localhost:3002/logout`
   - Upon successful logout, the dashboard redirects the user back to the frontend's login page

## Session Management

The authentication system uses cookies and sessions to maintain the user's logged-in state across both applications. This is why it's important that:

1. Both applications use `axios.defaults.withCredentials = true` to ensure cookies are sent with requests
2. The backend CORS configuration allows requests from both frontend origins with credentials

```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
```

## Development Setup

To test the authentication flow locally:

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

4. Navigate to `http://localhost:5173` in your browser
5. Sign up or log in
6. You should be redirected to the dashboard at `http://localhost:5174`

## Troubleshooting

If you encounter authentication issues:

1. Check that all three applications are running
2. Ensure the backend CORS configuration includes both frontend origins
3. Verify that cookies are being properly set and sent with requests
4. Check browser console for any errors related to CORS or authentication
5. Clear browser cookies and try again