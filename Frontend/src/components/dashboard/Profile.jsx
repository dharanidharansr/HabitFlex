import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FaTrophy, FaCalendarCheck, FaFire, FaClock, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const UserProfile = ({ userId: propsUserId, isOwnProfile }) => {
  const { userId: paramsUserId } = useParams();
  const userId = paramsUserId || propsUserId;

  const [profile, setProfile] = useState(null);
  const [habits, setHabits] = useState([]);
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setProfile({
        username: userData.username,
        email: userData.email,
        _id: userData._id,
      });
      setEditForm({
        username: userData.username,
        email: userData.email,
        avatar: userData.avatar || "",
      });
    }

    fetchProfile();
    if (isOwnProfile) {
      fetchHabits();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(response.data);
      setEditForm({
        username: response.data.username,
        email: response.data.email,
        avatar: response.data.avatar || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const fetchHabits = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/habits`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setHabits(response.data);
      calculateStats(response.data);
    } catch (error) {
      toast.error("Failed to load habits");
    }
  };

  const calculateStats = (habits) => {
    setStats({
      totalHabits: habits.length,
      completedToday: habits.filter((h) => h.completedToday).length,
      currentStreak: Math.max(...habits.map((h) => h.currentStreak || 0), 0),
      longestStreak: Math.max(...habits.map((h) => h.longestStreak || 0), 0),
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form if canceling
      setEditForm({
        username: profile.username,
        email: profile.email,
        avatar: profile.avatar || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/me`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProfile(response.data);
      // Update localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({
        ...userData,
        username: response.data.username,
        email: response.data.email,
        avatar: response.data.avatar,
      }));

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        {/* Profile Header */}
        <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Profile</h2>
            {isOwnProfile && (
              <div className="flex gap-2">
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-primary))] rounded-lg font-medium hover:bg-[rgb(var(--accent-primary))]/90 transition-colors"
                  >
                    <FaEdit />
                    Edit Profile
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-[#4ADE80] text-[rgb(var(--bg-primary))] rounded-lg font-medium hover:bg-[#3CC970] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSave />
                      {saving ? "Saving..." : "Save"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEditToggle}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-[#ff4444] text-[rgb(var(--bg-primary))] rounded-lg font-medium hover:bg-[#ee3333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaTimes />
                      Cancel
                    </motion.button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[rgb(var(--accent-primary))] flex items-center justify-center overflow-hidden">
                {(isEditing ? editForm.avatar : profile?.avatar) ? (
                  <img
                    src={isEditing ? editForm.avatar : profile?.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl sm:text-4xl font-bold text-[rgb(var(--bg-primary))]">
                    {(isEditing ? editForm.username : profile?.username)?.[0]?.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 w-full text-center sm:text-left">
              {!isEditing ? (
                <>
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">
                    {profile?.username || "Loading..."}
                  </h1>
                  <p className="text-[rgb(var(--text-primary))]/60 text-sm sm:text-base">
                    {profile?.email || "Loading..."}
                  </p>
                </>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-left">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                      className="w-full bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] rounded-lg px-4 py-2 text-[rgb(var(--text-primary))] focus:outline-none focus:border-[rgb(var(--accent-primary))] transition-colors"
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      disabled
                      readOnly
                      className="w-full bg-[rgb(var(--bg-tertiary))]/50 border border-[rgb(var(--border-primary))] rounded-lg px-4 py-2 text-[rgb(var(--text-primary))]/60 cursor-not-allowed"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-left">
                      Avatar URL
                    </label>
                    <input
                      type="text"
                      name="avatar"
                      value={editForm.avatar}
                      onChange={handleInputChange}
                      className="w-full bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] rounded-lg px-4 py-2 text-[rgb(var(--text-primary))] focus:outline-none focus:border-[rgb(var(--accent-primary))] transition-colors"
                      placeholder="Enter avatar URL (optional)"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {isOwnProfile && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <StatCard
              icon={<FaTrophy />}
              title="Total Habits"
              value={stats.totalHabits}
            />
            <StatCard
              icon={<FaCalendarCheck />}
              title="Completed Today"
              value={`${stats.completedToday}/${stats.totalHabits}`}
            />
            <StatCard
              icon={<FaFire />}
              title="Current Streak"
              value={`${stats.currentStreak} days`}
            />
            <StatCard
              icon={<FaClock />}
              title="Longest Streak"
              value={`${stats.longestStreak} days`}
            />
          </div>
        )}

        {/* Habits List */}
        {isOwnProfile && habits.length > 0 && (
          <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Your Habits</h2>
            <div className="space-y-4">
              {habits.map((habit) => (
                <motion.div
                  key={habit._id}
                  className="bg-[rgb(var(--bg-tertiary))] rounded-lg p-3 sm:p-4"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h3 className="font-bold">{habit.name}</h3>
                      <p className="text-sm text-[rgb(var(--text-primary))]/60">
                        {habit.description}
                      </p>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <p className="text-xs sm:text-sm text-[rgb(var(--text-primary))]/60">
                        Streak
                      </p>
                      <p className="text-lg font-bold text-[rgb(var(--accent-primary))]">
                        {habit.currentStreak || 0} days
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <motion.div
    className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-xl p-4"
    whileHover={{ y: -2 }}
  >
    <div className="flex items-center gap-2 mb-2 text-[rgb(var(--accent-primary))]">
      {icon}
      <h3 className="text-sm text-[rgb(var(--text-primary))]/60">{title}</h3>
    </div>
    <p className="text-xl font-bold">{value}</p>
  </motion.div>
);

export default UserProfile;
