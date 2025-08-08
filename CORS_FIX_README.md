# CORS Issue Fix

## Problem
You're getting CORS errors because your frontend (hosted on Vercel) is trying to access your backend (hosted on Render) but the CORS configuration doesn't allow the correct origins.

## Changes Made

### 1. Backend CORS Configuration (backend/index.js)
- Updated CORS configuration to allow multiple origins including your Vercel domains
- Added debugging logs to help identify CORS issues
- Updated session configuration for cross-origin requests
- Added a test route `/test-cors` to verify CORS is working

### 2. Frontend Configuration
- Updated all hardcoded URLs to use environment variables
- Added fallback URLs in case environment variables are not set
- Fixed AuthContext to use the correct backend URL

### 3. Dashboard Configuration
- Updated all hardcoded URLs to use environment variables
- Fixed AuthContext to use the correct backend URL

## Environment Variables Needed

### For Frontend (.env file in frontend directory):
```
VITE_BACKEND_URL=https://stockora.onrender.com
VITE_FRONTEND_URL=https://stockora-t1rz.vercel.app
```

### For Dashboard (.env file in dashboard directory):
```
VITE_BACKEND_URL=https://stockora.onrender.com
VITE_DASHBOARD_URL=https://stockora-dashboard.vercel.app
```

## Testing the Fix

1. Deploy the updated backend to Render
2. Create the .env files in both frontend and dashboard directories
3. Deploy the updated frontend and dashboard to Vercel
4. Test the login functionality

## Debugging

If you still get CORS errors:

### Step 1: Deploy the updated backend
1. Make sure you've deployed the updated `backend/index.js` to Render
2. The backend should have the new CORS configuration with debugging logs

### Step 2: Test the backend directly
Run the test script to verify the backend is working:
```bash
node test-backend.js
```

### Step 3: Check backend logs
1. Go to your Render dashboard
2. Check the logs for CORS-related messages
3. Look for lines like "CORS request from origin:" and "CORS blocked origin:"

### Step 4: Temporary CORS bypass (for testing only)
If you're still having issues, temporarily replace the CORS configuration in `backend/index.js`:

```javascript
// Replace the existing app.use(cors({...})) with:
const corsDebugConfig = require('./cors-debug.js');
app.use(cors(corsDebugConfig));
```

### Step 5: Check environment variables
Make sure your backend has the correct environment variables set in Render:
- `VITE_FRONTEND_URL=https://stockora-t1rz.vercel.app`
- `VITE_DASHBOARD_URL=https://stockora-dashboard.vercel.app`

### Step 6: Test endpoints
Try accessing these endpoints directly in your browser:
- `https://stockora.onrender.com/health`
- `https://stockora.onrender.com/test-cors`
- `https://stockora.onrender.com/check-auth`

## Common Issues

1. **Wrong backend URL**: Make sure you're using the correct Render URL
2. **Missing environment variables**: Ensure .env files are created and deployed
3. **Session cookies**: The session configuration has been updated for cross-origin requests
