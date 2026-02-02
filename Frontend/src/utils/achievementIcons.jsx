import {
  FaSeedling,
  FaList,
  FaBullseye,
  FaFire,
  FaCalendarAlt,
  FaSync,
  FaCrown,
  FaStar,
  FaTrophy,
  FaCheckCircle,
  FaRocket,
  FaRoad,
  FaCheckDouble,
  FaMask,
  FaSun,
  FaMoon,
  FaBolt,
  FaHandSparkles,
  FaHeart,
} from "react-icons/fa";

export const achievementIconMap = {
  // Beginner achievements
  "🌱": { icon: FaSeedling, size: 32, color: "#4ade80" },
  "📝": { icon: FaList, size: 32, color: "#4ade80" },
  "🎯": { icon: FaBullseye, size: 32, color: "#4ade80" },

  // Streak achievements
  "🔥": { icon: FaFire, size: 32, color: "#f97316" },
  "📆": { icon: FaCalendarAlt, size: 32, color: "#f97316" },
  "🔄": { icon: FaSync, size: 32, color: "#f97316" },
  "👑": { icon: FaCrown, size: 32, color: "#f97316" },
  "⭐": { icon: FaStar, size: 32, color: "#f97316" },
  "🏆": { icon: FaTrophy, size: 32, color: "#f97316" },

  // Completion achievements
  "✅": { icon: FaCheckCircle, size: 32, color: "#3b82f6" },
  "🚀": { icon: FaRocket, size: 32, color: "#3b82f6" },
  "🛣️": { icon: FaRoad, size: 32, color: "#3b82f6" },
  "💯": { icon: FaCheckDouble, size: 32, color: "#3b82f6" },

  // Variety achievements
  "🎭": { icon: FaMask, size: 32, color: "#8b5cf6" },
  "🔀": { icon: FaSync, size: 32, color: "#8b5cf6" },

  // Time-based achievements
  "🌅": { icon: FaSun, size: 32, color: "#ec4899" },
  "🌙": { icon: FaMoon, size: 32, color: "#ec4899" },

  // Perfect day achievements
  "⚡": { icon: FaBolt, size: 32, color: "#eab308" },
  "🌟": { icon: FaHandSparkles, size: 32, color: "#eab308" },
  "🌈": { icon: FaHeart, size: 32, color: "#eab308" },
};

/**
 * Get icon component for an achievement
 * @param {string} emoji - The emoji key to get the icon for
 * @returns {object} - Icon configuration object with icon component, size, and color
 */
export const getAchievementIcon = (emoji) => {
  return achievementIconMap[emoji] || { icon: FaTrophy, size: 32, color: "#A2BFFE" };
};

/**
 * Render an achievement icon
 * @param {string} emoji - The emoji key
 * @param {boolean} unlocked - Whether the achievement is unlocked
 * @returns {JSX.Element} - The icon component
 */
export const renderAchievementIcon = (emoji, unlocked) => {
  const { icon: IconComponent, size, color } = getAchievementIcon(emoji);
  return (
    <IconComponent
      size={size}
      color={unlocked ? color : "#666"}
      style={{ opacity: unlocked ? 1 : 0.5 }}
    />
  );
};
