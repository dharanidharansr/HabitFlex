// Mock static data for demo purposes
// All data is static except for habits which come from the backend

export const mockRecommendations = [
  {
    id: 1,
    title: "Morning Meditation",
    description: "Start your day with 10 minutes of mindfulness meditation",
    category: "Wellness",
    difficulty: "Easy",
    estimatedTime: "10 min",
    benefits: ["Reduces stress", "Improves focus", "Better emotional health"]
  },
  {
    id: 2,
    title: "Read for 30 Minutes",
    description: "Develop a daily reading habit to expand your knowledge",
    category: "Learning",
    difficulty: "Medium",
    estimatedTime: "30 min",
    benefits: ["Expands knowledge", "Improves vocabulary", "Enhances creativity"]
  },
  {
    id: 3,
    title: "Evening Journaling",
    description: "Reflect on your day and set intentions for tomorrow",
    category: "Wellness",
    difficulty: "Easy",
    estimatedTime: "15 min",
    benefits: ["Self-reflection", "Stress relief", "Goal clarity"]
  }
];

export const mockChallenges = [
  {
    _id: "challenge1",
    name: "30-Day Fitness Challenge",
    description: "Complete 30 days of consistent exercise to build a lasting fitness habit",
    startDate: new Date(2026, 1, 1).toISOString(),
    endDate: new Date(2026, 2, 2).toISOString(),
    category: "Fitness",
    participants: [
      {
        user: { _id: "user1", name: "John Doe", email: "john@example.com" },
        progress: 65,
        joinedAt: new Date(2026, 1, 1).toISOString()
      },
      {
        user: { _id: "user2", name: "Jane Smith", email: "jane@example.com" },
        progress: 80,
        joinedAt: new Date(2026, 1, 2).toISOString()
      },
      {
        user: { _id: "user3", name: "Mike Johnson", email: "mike@example.com" },
        progress: 55,
        joinedAt: new Date(2026, 1, 3).toISOString()
      }
    ],
    createdBy: { _id: "user1", name: "John Doe" },
    status: "active"
  },
  {
    _id: "challenge2",
    name: "Reading Marathon",
    description: "Read at least 20 pages every day for 60 days",
    startDate: new Date(2026, 0, 15).toISOString(),
    endDate: new Date(2026, 2, 15).toISOString(),
    category: "Learning",
    participants: [
      {
        user: { _id: "user2", name: "Jane Smith", email: "jane@example.com" },
        progress: 45,
        joinedAt: new Date(2026, 0, 15).toISOString()
      },
      {
        user: { _id: "user4", name: "Sarah Wilson", email: "sarah@example.com" },
        progress: 60,
        joinedAt: new Date(2026, 0, 16).toISOString()
      }
    ],
    createdBy: { _id: "user2", name: "Jane Smith" },
    status: "active"
  },
  {
    _id: "challenge3",
    name: "Meditation Mastery",
    description: "Meditate for at least 15 minutes daily for 21 days",
    startDate: new Date(2026, 1, 10).toISOString(),
    endDate: new Date(2026, 2, 3).toISOString(),
    category: "Wellness",
    participants: [
      {
        user: { _id: "user3", name: "Mike Johnson", email: "mike@example.com" },
        progress: 40,
        joinedAt: new Date(2026, 1, 10).toISOString()
      },
      {
        user: { _id: "user1", name: "John Doe", email: "john@example.com" },
        progress: 50,
        joinedAt: new Date(2026, 1, 11).toISOString()
      },
      {
        user: { _id: "user5", name: "Emily Brown", email: "emily@example.com" },
        progress: 35,
        joinedAt: new Date(2026, 1, 12).toISOString()
      }
    ],
    createdBy: { _id: "user3", name: "Mike Johnson" },
    status: "active"
  }
];

export const mockPartners = [
  {
    _id: "partner1",
    partner: {
      _id: "user2",
      name: "Jane Smith",
      email: "jane@example.com"
    },
    status: "active",
    createdAt: new Date(2026, 0, 10).toISOString(),
    sharedHabits: ["Morning Run", "Read Books"],
    stats: {
      streak: 15,
      completionRate: 85,
      lastActive: new Date(2026, 1, 2, 8, 30).toISOString()
    }
  },
  {
    _id: "partner2",
    partner: {
      _id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com"
    },
    status: "active",
    createdAt: new Date(2026, 0, 20).toISOString(),
    sharedHabits: ["Meditation", "Drink Water"],
    stats: {
      streak: 8,
      completionRate: 72,
      lastActive: new Date(2026, 1, 2, 10, 15).toISOString()
    }
  },
  {
    _id: "partner3",
    partner: {
      _id: "user4",
      name: "Sarah Wilson",
      email: "sarah@example.com"
    },
    status: "pending",
    createdAt: new Date(2026, 1, 1).toISOString(),
    sharedHabits: [],
    stats: {
      streak: 0,
      completionRate: 0,
      lastActive: null
    }
  }
];

export const mockMessages = {
  partner1: [
    {
      _id: "msg1",
      sender: { _id: "user2", name: "Jane Smith" },
      content: "Hey! Just completed my morning run. How's your day going?",
      timestamp: new Date(2026, 1, 2, 7, 30).toISOString(),
      readBy: ["user1", "user2"]
    },
    {
      _id: "msg2",
      sender: { _id: "user1", name: "You" },
      content: "Great job! I'm about to start mine now. Let's keep up the momentum!",
      timestamp: new Date(2026, 1, 2, 7, 45).toISOString(),
      readBy: ["user1", "user2"]
    },
    {
      _id: "msg3",
      sender: { _id: "user2", name: "Jane Smith" },
      content: "Absolutely! We're crushing it this week 💪",
      timestamp: new Date(2026, 1, 2, 8, 0).toISOString(),
      readBy: ["user1", "user2"]
    }
  ],
  partner2: [
    {
      _id: "msg4",
      sender: { _id: "user3", name: "Mike Johnson" },
      content: "Good morning! Don't forget our meditation session today.",
      timestamp: new Date(2026, 1, 2, 6, 0).toISOString(),
      readBy: ["user1", "user3"]
    },
    {
      _id: "msg5",
      sender: { _id: "user1", name: "You" },
      content: "Thanks for the reminder! Setting up now.",
      timestamp: new Date(2026, 1, 2, 6, 15).toISOString(),
      readBy: ["user1", "user3"]
    }
  ]
};

export const mockAchievements = [
  {
    id: "first_habit",
    title: "First Step",
    description: "Create your first habit",
    icon: "🎯",
    category: "beginner",
    unlocked: true,
    unlockedAt: new Date(2026, 0, 1).toISOString(),
    progress: 100,
    maxProgress: 1
  },
  {
    id: "week_warrior",
    title: "Week Warrior",
    description: "Complete 7 days in a row",
    icon: "🔥",
    category: "streak",
    unlocked: true,
    unlockedAt: new Date(2026, 0, 8).toISOString(),
    progress: 7,
    maxProgress: 7
  },
  {
    id: "habit_master",
    title: "Habit Master",
    description: "Maintain 5 active habits",
    icon: "⭐",
    category: "habits",
    unlocked: true,
    unlockedAt: new Date(2026, 0, 15).toISOString(),
    progress: 5,
    maxProgress: 5
  },
  {
    id: "month_champion",
    title: "Month Champion",
    description: "Complete 30 days in a row",
    icon: "🏆",
    category: "streak",
    unlocked: false,
    unlockedAt: null,
    progress: 15,
    maxProgress: 30
  },
  {
    id: "early_bird",
    title: "Early Bird",
    description: "Complete a habit before 8 AM for 10 days",
    icon: "🌅",
    category: "time",
    unlocked: true,
    unlockedAt: new Date(2026, 0, 25).toISOString(),
    progress: 10,
    maxProgress: 10
  },
  {
    id: "perfect_week",
    title: "Perfect Week",
    description: "Complete all habits every day for a week",
    icon: "💎",
    category: "completion",
    unlocked: false,
    unlockedAt: null,
    progress: 4,
    maxProgress: 7
  },
  {
    id: "social_butterfly",
    title: "Social Butterfly",
    description: "Connect with 3 accountability partners",
    icon: "🦋",
    category: "social",
    unlocked: false,
    unlockedAt: null,
    progress: 2,
    maxProgress: 3
  },
  {
    id: "challenger",
    title: "Challenger",
    description: "Join your first challenge",
    icon: "⚔️",
    category: "challenge",
    unlocked: true,
    unlockedAt: new Date(2026, 1, 1).toISOString(),
    progress: 1,
    maxProgress: 1
  }
];

export const mockCoachMessages = [
  {
    role: "assistant",
    content: "Hello! I'm your AI Habit Coach. I'm here to help you build lasting habits and achieve your goals. What would you like to work on today?"
  }
];

export const mockCoachSuggestions = [
  "How can I stay motivated?",
  "Tips for building morning routines",
  "I keep missing my habits",
  "How to track progress effectively"
];

// Utility function to get current user ID from token
export const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
};

// Filter challenges based on user participation
export const getMyParticipations = () => {
  const userId = getCurrentUserId();
  if (!userId) return [];
  
  return mockChallenges.filter(challenge =>
    challenge.participants.some(p => p.user._id === userId)
  );
};

export const getAvailableChallenges = () => {
  const userId = getCurrentUserId();
  if (!userId) return mockChallenges;
  
  return mockChallenges.filter(challenge =>
    !challenge.participants.some(p => p.user._id === userId)
  );
};
