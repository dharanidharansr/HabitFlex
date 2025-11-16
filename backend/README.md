# HabitFlex

A comprehensive habit tracking application with AI coaching, social features, and gamification elements.

## Features

- **Habit Tracking**: Create, manage, and track daily habits
- **AI Coach**: Get personalized recommendations and motivation
- **Social Features**: Partner with friends for accountability
- **Challenges**: Participate in habit-building challenges
- **Visualizations**: Beautiful 3D habit forests and progress tracking
- **Calendar Integration**: Sync with Google Calendar
- **Progress Sharing**: Share achievements and progress with others

## Tech Stack

### Frontend
- React + Vite
- Modern CSS with responsive design
- 3D visualizations
- QR code functionality

### Backend
- Node.js + Express
- MongoDB database
- JWT authentication
- WebSocket for real-time features
- Email notifications
- Google Calendar API integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/HabitFlex.git
cd HabitFlex
```

2. Install backend dependencies
```bash
cd Backend
npm install
```

3. Install frontend dependencies
```bash
cd ../Frontend
npm install
```

4. Set up environment variables
   - Create `.env` files in both Backend and Frontend directories
   - Add your MongoDB connection string, JWT secret, and other API keys

5. Start the development servers
```bash
# Backend (from Backend directory)
npm start

# Frontend (from Frontend directory)
npm run dev
```

## Project Structure

```
HabitFlex/
├── Backend/           # Node.js API server
│   ├── controllers/   # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic services
│   └── middleware/    # Authentication & other middleware
└── Frontend/          # React application
    ├── src/
    │   ├── components/# Reusable UI components
    │   ├── pages/     # Main application pages
    │   └── assets/    # Static assets
    └── public/        # Public assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies
- Special thanks to all contributors and testers
