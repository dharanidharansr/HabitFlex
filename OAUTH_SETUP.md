# OAuth Setup Guide for HabitFlex

## 🎯 Overview
This guide will help you set up Google OAuth authentication for HabitFlex login and signup.

## 📋 Prerequisites
- Google Cloud Console account
- Backend and Frontend configured properly

## 🔧 Setup Steps

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Configure:
     - **Name**: HabitFlex OAuth
     - **Authorized JavaScript origins**:
       - `http://localhost:5173` (for development)
       - Your production frontend URL
     - **Authorized redirect URIs**:
       - `http://localhost:8000/api/auth/google/callback` (for development)
       - Your production backend URL + `/api/auth/google/callback`
   - Click "Create"
   - Copy the **Client ID** and **Client Secret**

### 2. Configure Backend Environment Variables

1. Open `backend/.env` file (or create one from `.env.example`)
2. Add the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Session Secret
SESSION_SECRET=generate_a_random_secure_string_here

# JWT Secret (if not already set)
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Configure Frontend Environment Variables

1. Open `Frontend/.env` file (or create one)
2. Ensure you have:

```env
VITE_API_URL=http://localhost:8000
```

## 🚀 Usage

### For Users:
1. Navigate to Login or Register page
2. Click "Continue with Google" button
3. Sign in with your Google account
4. Authorize HabitFlex
5. You'll be redirected to the dashboard automatically

### How It Works:
1. User clicks "Continue with Google"
2. Redirected to Google's OAuth consent screen
3. After authorization, Google redirects to backend callback
4. Backend creates/updates user and generates JWT token
5. User is redirected to frontend with token
6. Frontend stores token and user data in localStorage
7. User is logged in and redirected to dashboard

## 🔒 Security Features

- Passwords are optional for OAuth users
- Google ID is stored securely and indexed
- JWT tokens for session management
- Secure session configuration
- CORS protection

## 🐛 Troubleshooting

### "Invalid OAuth callback" error:
- Verify callback URL matches exactly in Google Console and `.env`
- Check that redirect URI is authorized in Google Console

### "Failed to authenticate" error:
- Verify Client ID and Client Secret are correct
- Check that Google+ API is enabled
- Ensure frontend and backend URLs are configured correctly

### Token not being stored:
- Check browser console for errors
- Verify localStorage is enabled
- Check that VITE_API_URL is set correctly

## 📝 Production Deployment

When deploying to production:

1. Update Google OAuth credentials:
   - Add production frontend URL to "Authorized JavaScript origins"
   - Add production callback URL to "Authorized redirect URIs"

2. Update environment variables:
   ```env
   GOOGLE_CALLBACK_URL=https://your-api.com/api/auth/google/callback
   FRONTEND_URL=https://your-app.com
   NODE_ENV=production
   ```

3. Enable secure cookies:
   - The session cookie will automatically be set to secure in production

## 🎨 UI Features

- Smooth Google OAuth button with icon
- Visual separator between traditional and OAuth login
- Responsive design matching HabitFlex theme
- Loading states and error handling

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Documentation](http://www.passportjs.org/)
- [Express Session Documentation](https://github.com/expressjs/session)
