# HabitFlex

A comprehensive habit tracking application with AI coaching, social features, and beautiful visualizations to help you build and maintain healthy habits.

code - github
protect server,auth and cors

branch - dev,main

commit - each feature

swagger
google Oauth
different usecase - like amazon->food delivery
secure api
firewall
calling api from all the url -> not allowed cors


## Features

- **Habit Tracking**: Create, track, and manage your daily habits
- **AI Coach**: Get personalized advice and motivation from an AI coach
- **Social Features**: Connect with accountability partners and join challenges
- **Beautiful Visualizations**: Track your progress with interactive charts and 3D forest visualizations
- **Calendar Integration**: Sync with Google Calendar for seamless habit scheduling
- **Progress Analytics**: View detailed statistics and forecasting for your habits
- **Achievements System**: Unlock achievements as you build consistency
- **Real-time Chat**: Communicate with your accountability partners



## Tech Stack

### Frontend
- **React** with Vite for fast development
- **Modern UI Components** with responsive design
- **3D Visualizations** for habit forests
- **PWA Support** for mobile experience

### Backend
- **Node.js** with Express
- **MongoDB** for data storage
- **JWT Authentication** for secure user sessions
- **WebSocket** for real-time features
- **AI Integration** for coaching features
- **Email Services** for notifications

## Project Structure

```
HabitFlex/
├── Frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
└── backend/           # Node.js backend API
    ├── controllers/       # API controllers
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── services/         # Business logic services
    └── middleware/       # Custom middleware
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dharanidharansr/HabitFlex.git
cd HabitFlex
```

2. Install frontend dependencies:
```bash
cd Frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in your configuration values

5. Start the development servers:

Frontend:
```bash
cd Frontend
npm run dev
```

Backend:
```bash
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
