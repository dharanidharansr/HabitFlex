# HabitFlex 🌱

A comprehensive habit tracking application with AI coaching, social features, and beautiful visualizations to help you build and maintain healthy habits. HabitFlex transforms your daily routines into an engaging journey with gamification, real-time collaboration, and intelligent insights.

---

## 🎯 Core Features

### 1. **Smart Habit Management**
- **Create & Track Habits**: Build custom habits with names, descriptions, and time preferences
- **Flexible Scheduling**: Set habits as daily or weekly with specific times of day
- **Completion Tracking**: Mark habits as complete and view your completion history
- **Streak System**: 
  - Real-time current streak calculation
  - Track your longest streak achievements
  - Visual streak indicators and milestones
- **Habit Editor**: Modify existing habits with an intuitive interface
- **Reminder System**:
  - Customizable reminder times (15 minutes before, 30 minutes, etc.)
  - Missed habit check notifications
  - Email reminders for upcoming habits
  - Scheduled notifications using node-schedule

### 2. **AI-Powered Coaching** 🤖
- **Personalized Advice**: Get tailored recommendations based on your habit history
- **Context-Aware Coaching**: AI analyzes your:
  - Total habits and completion rates
  - Current and longest streaks
  - Recent performance patterns
  - Time of day preferences
- **Interactive Chat**: Ask questions and receive motivational guidance
- **Multiple Coach Types**: Different coaching personalities for varied support
- **Powered by Groq AI**: Uses llama-3.1-8b-instant model for fast, intelligent responses
- **Real-time Support**: Instant feedback and encouragement

### 3. **Beautiful Data Visualizations** 📊

#### **3D Habit Forest**
- Interactive 3D environment showing your habit ecosystem
- Each habit represented as a tree that grows with your streaks
- Built with Three.js and React Three Fiber
- Immersive visual representation of your progress

#### **Contribution Graph**
- GitHub-style activity heatmap
- Shows daily habit completions over time
- Color-coded intensity levels
- Helps identify patterns and consistency

#### **Streak Staircase**
- Innovative staircase visualization of progress
- Multiple design variations (StreakStaircase & StreakStaircase2)
- Gamified climbing metaphor for motivation

#### **Habit Tree Visualization**
- Individual tree growth for each habit
- Visual representation of streak strength
- Encourages nurturing and growth mindset

#### **Interactive Charts**
- Built with Chart.js and react-chartjs-2
- Line graphs, bar charts, and pie charts
- Track completion rates, frequency, and trends

### 4. **Social & Accountability Features** 👥

#### **Accountability Partners**
- **Partner Connections**: Link with friends for mutual support
- **Real-time Chat**: 
  - WebSocket-powered instant messaging
  - Typing indicators
  - Message read receipts
  - Chat history preservation
- **Progress Sharing**: 
  - View partner's habit completions
  - Share achievements and milestones
  - Visual progress comparison
  - Screenshot sharing with html2canvas
- **Partner Progress Dashboard**: Monitor each other's journeys
- **Notifications**: Get updates on partner activities

#### **Challenges System**
- **Create Challenges**: Set up habit challenges with:
  - Custom name and description
  - Start and end dates
  - Participant tracking
- **Join Challenges**: Participate in community challenges
- **Participant Lists**: See all challenge participants
- **Real-time Updates**: Live challenge progress via Fluvio streaming
- **Leaderboards**: Track rankings and competition
- **Challenge Completion**: Celebrate collective achievements

### 5. **Google Calendar Integration** 📅
- **OAuth 2.0 Authentication**: Secure Google account connection
- **Automatic Syncing**: 
  - Push habits as calendar events
  - Two-way synchronization
  - Update calendar on habit changes
- **Event Management**: 
  - Create calendar events for scheduled habits
  - Store Google Calendar event IDs
  - Modify and delete synced events
- **Seamless Scheduling**: View habits alongside other commitments

### 6. **Achievements & Gamification** 🏆
- **Achievement System**: Unlock badges and trophies
- **Achievement Cards**: Beautiful UI for displaying accomplishments
- **Custom Achievement Icons**: Unique visual rewards
- **Progress Milestones**: 
  - First habit completed
  - Week streak achieved
  - Month streak achieved
  - Perfect week
  - And many more...
- **Confetti Celebrations**: react-canvas-confetti for achievement moments

### 7. **Progress Analytics & Forecasting** 📈
- **Detailed Statistics**: 
  - Completion rates
  - Success percentages
  - Time-based analysis
- **Habit Forecasting**: 
  - Predictive analytics for future performance
  - AI-driven insights
  - Trend analysis
- **Custom Date Ranges**: Filter stats by specific time periods
- **Data Export**: Share progress snapshots

### 8. **Smart Recommendations** 💡
- **Personalized Suggestions**: AI-recommended habits based on:
  - Your current habit profile
  - Completion patterns
  - Popular habit combinations
  - Success indicators
- **Habit Library**: Pre-built habit templates
- **One-Click Addition**: Quickly adopt recommended habits

### 9. **QR Code Features** 📱
- **QR Code Generator**: Create shareable codes for:
  - Profile sharing
  - Challenge invitations
  - Habit templates
- **QR Code Scanner**: 
  - Built with html5-qrcode
  - Quick partner connections
  - Instant challenge joining
- **Mobile-First Design**: Optimized for smartphone cameras

### 10. **Authentication & Security** 🔐
- **Multiple Auth Methods**:
  - Traditional email/password (JWT-based)
  - Google OAuth 2.0 integration
  - Passport.js authentication strategies
- **Secure Sessions**: 
  - Express-session management
  - HTTP-only cookies
  - CSRF protection
- **Protected Routes**: 
  - Frontend route guards
  - Backend middleware authentication
  - Role-based access control
- **Password Security**: 
  - Bcrypt hashing
  - Minimum 6 characters
  - Secure storage

### 11. **Notifications & Reminders** 🔔
- **Email Notifications**: 
  - Powered by Nodemailer
  - Habit reminders
  - Achievement alerts
  - Partner activity updates
  - Challenge invitations
- **Real-time Notifications**: 
  - WebSocket push notifications
  - Socket.IO event-driven updates
  - Browser notifications
- **Customizable Settings**: 
  - Enable/disable reminders
  - Set reminder timing
  - Choose notification channels

### 12. **User Experience** ✨
- **Modern UI/UX**: 
  - Clean, responsive design
  - Tailwind CSS styling
  - Custom theme support
- **Dark/Light Mode**: 
  - Theme toggle component
  - Persistent theme preference
  - System theme detection
- **Responsive Design**: 
  - Mobile-first approach
  - Works on all screen sizes
  - Touch-optimized interactions
- **Smooth Animations**: 
  - Framer Motion transitions
  - Micro-interactions
  - Loading states
- **Profile Management**: 
  - Customizable user profiles
  - Avatar uploads
  - Account settings
- **Dashboard**: 
  - Centralized habit overview
  - Quick actions
  - Stats at a glance


---

## 🛠️ Tech Stack

### **Frontend Technologies**
- **React 19.0**: Modern component-based architecture
- **Vite**: Lightning-fast build tool and dev server
- **React Router DOM 7.5**: Client-side routing and navigation
- **Axios**: HTTP client for API requests
- **Socket.IO Client 4.8**: Real-time bidirectional communication

#### **UI & Styling**
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **Framer Motion 12.9**: Animation library
- **React Icons 5.5**: Icon library
- **Custom Fonts**: 
  - Bricolage Grotesque
  - Inter

#### **Data Visualization**
- **Three.js 0.176**: 3D graphics library
- **@react-three/fiber 9.1**: React renderer for Three.js
- **@react-three/drei 10.0**: Useful helpers for React Three Fiber
- **@splinetool/react-spline 4.0**: 3D design integration
- **Chart.js 4.4**: Chart creation library
- **react-chartjs-2 5.3**: React wrapper for Chart.js
- **Mermaid 10.9**: Diagram and flowchart generation

#### **Additional Libraries**
- **html2canvas 1.4**: Screenshot generation
- **qrcode.react 4.2**: QR code generation
- **html5-qrcode 2.3**: QR code scanning
- **react-toastify 11.0**: Toast notifications
- **react-canvas-confetti 2.0**: Celebration animations
- **date-fns 4.1**: Date utility library
- **lodash 4.17**: Utility functions

### **Backend Technologies**
- **Node.js**: JavaScript runtime
- **Express 5.1**: Web application framework
- **MongoDB (Mongoose 8.13)**: NoSQL database and ODM
- **JWT (jsonwebtoken 9.0)**: Secure authentication tokens

#### **Authentication & Security**
- **Passport 0.7**: Authentication middleware
- **passport-google-oauth20 2.0**: Google OAuth strategy
- **bcrypt 6.0**: Password hashing
- **express-session 1.19**: Session management
- **CORS 2.8**: Cross-origin resource sharing

#### **Real-time & Communication**
- **Socket.IO 4.8**: WebSocket server
- **ws 8.18**: WebSocket library
- **@fluvio/client 0.14**: Real-time streaming platform

#### **External Integrations**
- **googleapis 148.0**: Google API client
- **Nodemailer 7.0**: Email sending
- **Axios 1.8**: HTTP requests

#### **Scheduling & Utilities**
- **node-schedule 2.1**: Cron-like job scheduler
- **dotenv 16.5**: Environment variable management

### **Development Tools**
- **ESLint**: Code linting and quality
- **TypeScript 5.8**: Type definitions
- **Nodemon 3.1**: Auto-restart development server
- **Vercel**: Frontend deployment platform

---

## 📁 Project Structure

```
HabitFlex/
├── Frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── AICoach.jsx            # AI coaching interface
│   │   │   ├── ConfirmationModal.jsx  # Modal dialogs
│   │   │   ├── ThemeToggle.jsx        # Dark/Light mode switcher
│   │   │   ├── UserProfile.jsx        # User profile component
│   │   │   ├── GoogleCalendarIntegration.jsx  # Calendar sync
│   │   │   ├── Auth/                  # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── dashboard/             # Dashboard components
│   │   │   │   ├── HabitEditor.jsx    # Edit habits
│   │   │   │   ├── HabitForm.jsx      # Create new habits
│   │   │   │   ├── HabitList.jsx      # List all habits
│   │   │   │   ├── HabitForest3D.jsx  # 3D forest visualization
│   │   │   │   ├── HabitTree.jsx      # Individual tree view
│   │   │   │   ├── HabitRecommendation.jsx  # AI suggestions
│   │   │   │   ├── Profile.jsx        # User profile
│   │   │   │   ├── StatsCard.jsx      # Statistics display
│   │   │   │   ├── StreaksList.jsx    # All streaks
│   │   │   │   ├── StreakStaircase.jsx  # Staircase visualization
│   │   │   │   └── StreakStaircase2.jsx # Alternative design
│   │   │   ├── partners/              # Social features
│   │   │   │   ├── ChatWindow.jsx     # Real-time chat
│   │   │   │   ├── PartnerProgress.jsx  # Partner stats
│   │   │   │   └── PartnersSection.jsx  # Partners overview
│   │   │   ├── Challenges/            # Challenge system
│   │   │   │   └── ParticipantsList.jsx  # Challenge members
│   │   │   ├── Progress/              # Progress tracking
│   │   │   │   ├── ContributionGraph.jsx  # Activity heatmap
│   │   │   │   └── ShareProgress.jsx   # Share functionality
│   │   │   ├── QR/                    # QR code features
│   │   │   │   ├── QRCodeGenerator.jsx
│   │   │   │   └── QRCodeScanner.jsx
│   │   │   ├── Achievements/          # Gamification
│   │   │   │   └── AchievementCard.jsx
│   │   │   ├── Navbar.jsx             # Navigation bar
│   │   │   ├── Sidebar.jsx            # Side navigation
│   │   │   ├── Footer.jsx             # Footer component
│   │   │   ├── ProtectedRoute.jsx     # Auth guard
│   │   │   ├── HeroSection.jsx        # Landing hero
│   │   │   ├── Features.jsx           # Feature showcase
│   │   │   └── CtaSection.jsx         # Call-to-action
│   │   ├── pages/                   # Application pages
│   │   │   ├── Landing.jsx            # Landing page
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── CoachPage.jsx          # AI coach page
│   │   │   ├── Challenges.jsx         # Challenges page
│   │   │   ├── Partners.jsx           # Partners page
│   │   │   ├── Progress.jsx           # Progress analytics
│   │   │   ├── Achievements.jsx       # Achievements page
│   │   │   └── HabitVisualizer.jsx    # Visualization page
│   │   ├── utils/                   # Utility functions
│   │   │   └── achievementIcons.jsx   # Achievement icons
│   │   ├── assets/                  # Static assets (images, icons)
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   ├── index.css                # Global styles
│   │   └── theme.css                # Theme variables
│   ├── public/                      # Public assets
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── vercel.json                  # Vercel deployment config
│   └── eslint.config.js             # ESLint rules
│
└── backend/                     # Node.js backend API
    ├── controllers/                 # Route controllers
    │   ├── authController.js        # Authentication logic
    │   ├── habitController.js       # Habit CRUD operations
    │   ├── coachController.js       # AI coaching
    │   ├── challengeController.js   # Challenge management
    │   ├── partnerController.js     # Accountability partners
    │   ├── userController.js        # User management
    │   ├── visualizerController.js  # Data visualization
    │   ├── forecastController.js    # Predictive analytics
    │   └── recommendationController.js  # Habit suggestions
    ├── models/                      # Database schemas
    │   ├── user.js                  # User model
    │   ├── habitSchema.js           # Habit model
    │   ├── accountabilityPartner.js # Partner model
    │   ├── challenge.js             # Challenge model
    │   ├── chat.js                  # Chat message model
    │   └── visualization.js         # Visualization settings
    ├── routes/                      # API routes
    │   ├── authroutes.js            # Auth endpoints
    │   ├── habitRoutes.js           # Habit endpoints
    │   ├── coachRoutes.js           # AI coach endpoints
    │   ├── challengeRoutes.js       # Challenge endpoints
    │   ├── partnerRoutes.js         # Partner endpoints
    │   ├── userRoutes.js            # User endpoints
    │   ├── visualizerRoutes.js      # Visualization endpoints
    │   ├── forecastRoutes.js        # Forecast endpoints
    │   ├── recommendationRoute.js   # Recommendation endpoints
    │   ├── googleCalendarRoutes.js  # Calendar integration
    │   └── emailRoutes.js           # Email notifications
    ├── services/                    # Business logic services
    │   ├── websocket.js             # WebSocket server
    │   ├── emailService.js          # Email sending
    │   ├── notificationService.js   # Notifications
    │   ├── reminderService.js       # Scheduled reminders
    │   └── googleCalendarService.js # Calendar sync
    ├── middleware/                  # Custom middleware
    │   └── auth.js                  # JWT authentication
    ├── config/                      # Configuration files
    │   ├── db.js                    # MongoDB connection
    │   └── passport.js              # Passport strategies
    ├── server.js                    # Express server setup
    ├── package.json                 # Dependencies
    ├── LICENSE                      # License file
    └── README.md                    # Backend documentation
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager
- **Google Cloud Console** account (for OAuth and Calendar features)
- **Groq API Key** (for AI coaching features)

### **Installation**

#### 1. **Clone the Repository**
```bash
git clone https://github.com/dharanidharansr/HabitFlex.git
cd HabitFlex
```

#### 2. **Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Server
PORT=8000
CLIENT_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

# Google Calendar API
GOOGLE_CALENDAR_API_KEY=your_google_calendar_api_key

# AI Coach (Groq)
GROQ_API_KEY=your_groq_api_key

# Email Service (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Session Secret
SESSION_SECRET=your_session_secret_key

# Fluvio (Optional - for real-time streaming)
FLUVIO_CLUSTER=your_fluvio_cluster_url
```

#### 3. **Setup Frontend**
```bash
cd ../Frontend
npm install
```

Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:8000/api
VITE_SOCKET_URL=http://localhost:8000
```

#### 4. **Start Development Servers**

**Backend** (from `backend` directory):
```bash
npm run dev
# or
npm start
```

**Frontend** (from `Frontend` directory):
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

### **Production Build**

#### Frontend:
```bash
cd Frontend
npm run build
```

#### Backend:
```bash
cd backend
npm start
```

---

## 🔑 Environment Variables Guide

### **Required API Keys & Setup**

#### **MongoDB**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Add to `MONGO_URI` in backend `.env`

#### **Google OAuth & Calendar**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API and Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Copy Client ID and Client Secret to `.env`

#### **Groq AI (for AI Coach)**
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for an account
3. Generate an API key
4. Add to `GROQ_API_KEY` in backend `.env`

#### **Email Service**
1. Use Gmail or any SMTP service
2. For Gmail, enable 2-factor authentication
3. Generate an app-specific password
4. Add credentials to `.env`

---

## 📱 Key User Flows

### **Getting Started Flow**
1. **Sign Up**: Register with email/password or Google OAuth
2. **Create First Habit**: Use the habit form on the dashboard
3. **Set Reminders**: Configure notification preferences
4. **Complete Habit**: Mark your first habit as complete
5. **Track Streak**: Watch your streak counter grow
6. **Unlock Achievement**: Celebrate your first achievement!

### **Social Features Flow**
1. **Add Partner**: Search for friends or use QR code
2. **Start Chat**: Send messages in real-time
3. **Share Progress**: Show off your achievements
4. **Join Challenge**: Participate in community challenges
5. **Compete**: Climb the leaderboard

### **AI Coach Flow**
1. **Open Coach Page**: Navigate to AI Coach
2. **Ask Question**: Type your habit-related query
3. **Get Advice**: Receive personalized coaching
4. **Apply Insights**: Implement suggestions
5. **Track Improvement**: See results in analytics

---

## 🎨 Key UI Components


### **Dashboard Components**
- **HabitForm**: Create new habits with name, description, frequency, time
- **HabitList**: View all habits with completion status and streaks
- **HabitEditor**: Modify existing habits inline
- **StatsCard**: Display key metrics (total habits, completion rate, streaks)
- **HabitRecommendation**: AI-suggested habits based on your profile

### **Visualization Components**
- **HabitForest3D**: Immersive 3D forest where habits grow as trees
- **HabitTree**: Individual tree representation for single habits
- **ContributionGraph**: GitHub-style heatmap of daily activity
- **StreakStaircase**: Gamified staircase showing progress climb

### **Social Components**
- **ChatWindow**: Real-time messaging with typing indicators
- **PartnerProgress**: View partner's habit stats and achievements
- **ParticipantsList**: See all challenge participants with rankings

### **Authentication Components**
- **Login**: Email/password and Google OAuth options
- **Register**: New user signup with validation
- **ProtectedRoute**: Route guard for authenticated pages

---

## 🔌 API Endpoints

### **Authentication** (`/api/auth`)
- `POST /register` - Create new account
- `POST /login` - Login with credentials
- `GET /google` - Initiate Google OAuth
- `GET /google/callback` - OAuth callback
- `GET /logout` - End user session
- `GET /current-user` - Get logged-in user

### **Habits** (`/api/habits`)
- `GET /` - Get all user habits
- `POST /` - Create new habit
- `GET /:id` - Get specific habit
- `PUT /:id` - Update habit
- `DELETE /:id` - Delete habit
- `POST /:id/complete` - Mark habit complete
- `POST /:id/uncomplete` - Unmark completion
- `PUT /:id/reminder` - Update reminder settings

### **AI Coach** (`/api/coach`)
- `POST /advice` - Get coaching advice
- `GET /test` - Test Groq API connection

### **Challenges** (`/api/challenges`)
- `GET /` - Get all challenges
- `POST /` - Create new challenge
- `GET /:id` - Get challenge details
- `POST /:id/join` - Join a challenge
- `POST /:id/leave` - Leave a challenge
- `GET /:id/participants` - Get participant list

### **Partners** (`/api/partners`)
- `GET /` - Get all accountability partners
- `POST /request` - Send partner request
- `POST /accept` - Accept partner request
- `POST /reject` - Reject partner request
- `DELETE /:id` - Remove partner
- `GET /:id/progress` - Get partner progress
- `GET /:id/chat` - Get chat messages
- `POST /:id/message` - Send chat message

### **Visualizations** (`/api/visualizer`)
- `GET /data` - Get visualization data
- `GET /contribution-graph` - Get activity heatmap data
- `GET /streak-stats` - Get streak statistics

### **Forecasting** (`/api/forecast`)
- `GET /predict` - Get habit predictions
- `GET /trends` - Get trend analysis

### **Recommendations** (`/api/recommendations`)
- `GET /` - Get personalized habit recommendations
- `POST /accept` - Accept and add recommendation

### **Google Calendar** (`/api/calendar`)
- `GET /auth` - Initiate calendar OAuth
- `GET /callback` - OAuth callback
- `POST /sync` - Sync habit to calendar
- `DELETE /sync/:habitId` - Remove calendar sync

### **Email** (`/api/email`)
- `POST /send-reminder` - Send email reminder
- `POST /send-achievement` - Send achievement notification

### **Users** (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /avatar` - Update profile picture
- `GET /stats` - Get user statistics

---

## 🌐 Real-time Features (WebSocket Events)

### **Socket.IO Events**

#### **Client → Server**
- `join-chat` - Join a chat room
- `typing-started` - User starts typing
- `typing-stopped` - User stops typing
- `message-read` - Mark message as read
- `send-message` - Send chat message

#### **Server → Client**
- `typing-update` - Broadcast typing status
- `new-message` - Receive new message
- `message-status` - Message delivery confirmation
- `partner-online` - Partner comes online
- `partner-offline` - Partner goes offline
- `habit-completed` - Partner completes habit
- `achievement-unlocked` - Partner earns achievement

### **Fluvio Streaming**
- **Challenge Updates**: Real-time challenge participation changes
- **Habit Completion Stream**: Live habit completion notifications
- **Leaderboard Updates**: Dynamic ranking changes

---

## 📊 Database Schema

### **User Model**
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required for local auth),
  googleId: String (unique, for OAuth),
  avatar: String (profile picture URL),
  authProvider: String ('local' | 'google'),
  googleCalendar: {
    tokens: Object,
    connected: Boolean
  },
  timestamps: true
}
```

### **Habit Model**
```javascript
{
  user: ObjectId (ref: User, required),
  name: String (required),
  description: String,
  frequency: String ('daily' | 'weekly'),
  timeOfDay: String (required),
  completedDates: [Date],
  currentStreak: Number (default: 0),
  longestStreak: Number (default: 0),
  reminderSettings: {
    enabled: Boolean (default: true),
    reminderTime: Number (default: 15),
    missedCheckEnabled: Boolean (default: true)
  },
  syncWithGoogleCalendar: Boolean (default: false),
  googleCalendarEventId: String,
  createdAt: Date
}
```

### **Challenge Model**
```javascript
{
  name: String (required),
  description: String,
  startDate: Date (required),
  endDate: Date (required),
  createdBy: ObjectId (ref: User),
  participants: [{
    user: ObjectId (ref: User),
    progress: Number,
    joinedAt: Date
  }],
  status: String ('active' | 'completed' | 'upcoming')
}
```

### **AccountabilityPartner Model**
```javascript
{
  requester: ObjectId (ref: User, required),
  recipient: ObjectId (ref: User, required),
  status: String ('pending' | 'accepted' | 'rejected'),
  createdAt: Date
}
```

### **Chat Model**
```javascript
{
  participants: [ObjectId] (ref: User),
  messages: [{
    sender: ObjectId (ref: User),
    content: String,
    timestamp: Date,
    read: Boolean
  }],
  typingUsers: [ObjectId] (ref: User)
}
```

---

## 🎯 Feature Implementation Details

### **Streak Calculation Algorithm**
```javascript
// Automatically calculates streaks based on consecutive completions
// Considers daily vs weekly frequency
// Updates longestStreak when currentStreak exceeds it
// Virtual field `completedToday` checks today's completion status
```

### **AI Coaching System**
- Uses Groq AI with llama-3.1-8b-instant model
- Analyzes user context: total habits, completion rates, streaks
- Provides personalized, context-aware advice
- Supports multiple coaching personalities
- Rate-limited to prevent abuse
- Message validation (2-500 characters)

### **Reminder System**
- Uses `node-schedule` for cron-like scheduling
- Schedules reminders based on `timeOfDay` and `reminderTime`
- Sends email notifications via Nodemailer
- Checks for missed habits and sends follow-ups
- Re-schedules after habit completion
- Initializes all reminders on server start

### **Google Calendar Sync**
- OAuth 2.0 flow for secure authentication
- Creates calendar events for habits
- Stores `googleCalendarEventId` for updates
- Two-way sync: calendar changes update habits
- Deletes events when habits are deleted
- Handles token refresh automatically

### **Real-time Chat**
- WebSocket-powered with Socket.IO
- Typing indicators with user list
- Message read receipts
- Chat room isolation (one-to-one)
- Message persistence in MongoDB
- Online/offline status tracking

### **Achievement System**
```javascript
// Achievement triggers:
// - First habit created
// - First completion
// - 7-day streak (Week Warrior)
// - 30-day streak (Month Master)
// - Perfect week (all habits completed)
// - 100 total completions
// - 10 active habits
// Celebrations with confetti animation
```

---

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure, stateless authentication
- **HTTP-Only Cookies**: Prevent XSS attacks
- **CORS Configuration**: Restricted origin access
- **Input Validation**: Sanitize all user inputs
- **Rate Limiting**: Prevent API abuse (recommended to add)
- **Environment Variables**: Sensitive data protection
- **Session Security**: Secure session cookies
- **OAuth 2.0**: Trusted third-party authentication

---

## 🚀 Deployment

### **Frontend (Vercel)**
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### **Backend (Railway/Heroku/DigitalOcean)**
1. Set up MongoDB Atlas cluster
2. Configure environment variables
3. Deploy backend server
4. Update `CLIENT_URL` in backend `.env`
5. Update `VITE_API_URL` in frontend `.env`

### **Environment-specific Configurations**
```javascript
// vercel.json (Frontend)
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 🎓 Learning Resources

### **Technologies Used**
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Socket.IO Docs](https://socket.io/docs/)
- [Three.js Journey](https://threejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Groq AI](https://console.groq.com/docs)

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create your feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation for new features

---

## 🐛 Known Issues & Roadmap

### **Current Limitations**
- No mobile app (PWA only)
- Limited to English language
- No data export feature yet
- Achievement system could be expanded

### **Future Enhancements**
- [ ] Mobile apps (iOS & Android with React Native)
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Habit templates marketplace
- [ ] Integration with fitness trackers
- [ ] Team challenges for organizations
- [ ] AI-powered habit insights
- [ ] Voice commands for habit logging
- [ ] Offline mode with sync
- [ ] Data export (CSV, PDF reports)
- [ ] Social feed of achievements
- [ ] Habit stacking recommendations
- [ ] Pomodoro timer integration
- [ ] Habit dependencies/prerequisites

---

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](backend/LICENSE) file for details.

---

## 👨‍💻 Author

**Dharani Dharan SR**
- GitHub: [@dharanidharansr](https://github.com/dharanidharansr)
- Project Link: [https://github.com/dharanidharansr/HabitFlex](https://github.com/dharanidharansr/HabitFlex)

---

## 🙏 Acknowledgments

- **Groq AI** for providing fast AI inference
- **MongoDB** for the excellent database platform
- **Vercel** for frontend hosting
- **Google** for OAuth and Calendar APIs
- **Three.js** community for 3D visualization resources
- **React** ecosystem for amazing tools and libraries
- **Open Source Community** for inspiring this project

---

## 📧 Support

For support, email dharanidharansr@gmail.com or open an issue on GitHub.

---

## ⭐ Show Your Support

If you find HabitFlex helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ to help people build better habits and achieve their goals.**
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.