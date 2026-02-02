import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AchievementCard from "../components/Achievements/AchievementCard";
import { mockAchievements } from "../utils/mockData";

const Achievements = () => {
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({
    totalHabits: 0,
    currentStreaks: [],
    longestStreak: 0,
    totalCompletions: 0,
    categories: [],
    earlyMorningHabits: 0,
    nightOwlHabits: 0,
    perfectDays: 0,
  });

  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      calculateStats();
    }
  }, [habits]);

  useEffect(() => {
    if (stats.totalHabits > 0) {
      evaluateAchievements();
    }
  }, [stats]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/habits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHabits(response.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
      toast.error("Failed to load achievements data");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    // Extract categories
    const categories = [
      ...new Set(habits.map((habit) => habit.category || "uncategorized")),
    ];

    // Find longest streak
    const longestStreak = Math.max(
      ...habits.map((habit) => habit.longestStreak || 0),
      0
    );

    // Calculate total completed for all time
    const totalCompletions = habits.reduce(
      (total, habit) => total + (habit.completedDates?.length || 0),
      0
    );

    // Count early morning habits (before 8am)
    const earlyMorningHabits = habits.filter((habit) => {
      const hour = parseInt(habit.timeOfDay?.split(":")[0] || 0);
      return hour < 8;
    }).length;

    // Count night owl habits (after 10pm)
    const nightOwlHabits = habits.filter((habit) => {
      const hour = parseInt(habit.timeOfDay?.split(":")[0] || 0);
      return hour >= 22;
    }).length;

    // Get all current streaks
    const currentStreaks = habits.map((habit) => habit.currentStreak || 0);

    // Calculate perfect days (days where all habits were completed)
    const habitDates = habits.map((habit) =>
      (habit.completedDates || []).map((date) => new Date(date).toDateString())
    );

    const allDates = habitDates.flat();
    const dateCount = {};

    allDates.forEach((date) => {
      dateCount[date] = (dateCount[date] || 0) + 1;
    });

    const perfectDays = Object.values(dateCount).filter(
      (count) => count === habits.length
    ).length;

    setStats({
      totalHabits: habits.length,
      currentStreaks,
      longestStreak,
      totalCompletions,
      categories,
      earlyMorningHabits,
      nightOwlHabits,
      perfectDays,
    });
  };

  // Define achievement data with dynamic unlocking conditions
  const evaluateAchievements = () => {
    // Use mock achievements instead of calculating them
    setAchievements(mockAchievements);
  };

  const filteredAchievements =
    selectedFilter === "all"
      ? achievements
      : selectedFilter === "unlocked"
        ? achievements.filter((a) => a.unlocked)
        : selectedFilter === "locked"
          ? achievements.filter((a) => !a.unlocked)
          : achievements.filter((a) => a.category === selectedFilter);

  const categories = [
    "all",
    "unlocked",
    "locked",
    "beginner",
    "streak",
    "completion",
    "variety",
    "time",
    "perfection",
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const percentage = achievements.length
    ? Math.round((unlockedCount / achievements.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] text-[#f5f5f7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A2BFFE]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f7] py-8">
      <main className="max-w-4xl mx-auto px-6">
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Achievements</h1>
            <p className="text-[#f5f5f7]/60 text-sm sm:text-base">
              You've unlocked {unlockedCount} of {achievements.length}{" "}
              achievements ({percentage}%)
            </p>
          </div>
          <Link to="/progress" className="w-full sm:w-auto">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-[#222] rounded-lg hover:border-[#A2BFFE]/30 text-sm w-full sm:w-auto mt-3 sm:mt-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Progress
            </motion.button>
          </Link>
        </div>

        {/* Achievement Progress */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
              Your Achievement Progress
            </h2>
            <div className="bg-[#A2BFFE]/10 rounded-full px-4 py-1 w-full sm:w-auto text-center sm:text-left">
              <span className="text-sm font-medium text-[#A2BFFE]">
                {percentage}% Complete
              </span>
            </div>
          </div>

          <div className="w-full bg-[#111] rounded-full h-4 mb-6">
            <motion.div
              className="bg-[#A2BFFE] h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 text-sm rounded-lg capitalize ${selectedFilter === category
                    ? "bg-[#A2BFFE] text-[#080808]"
                    : "bg-[#111] hover:bg-[#222] text-[#f5f5f7]/70"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Achievements;
