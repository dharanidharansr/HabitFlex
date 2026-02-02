import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');
    const username = urlParams.get('username');
    const email = urlParams.get('email');
    const error = urlParams.get('error');

    if (error) {
      toast.error('Authentication failed. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: userId,
        username: username,
        email: email
      }));
      toast.success('Registration successful! 🎉');
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { username, email, password } = formData;
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registration successful! 🎉");

      // Store user data and token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        id: data._id,
        username: data.username,
        email: data.email,
        googleCalendar: data.googleCalendar // Include Google Calendar connection status
      }));

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      // Display backend validation errors if present
      if (error.message === 'Validation error' && Array.isArray(error.errors)) {
        error.errors.forEach(errMsg => toast.error(errMsg));
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] overflow-hidden p-6">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(20,1fr)]">
          {[...Array(800)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-0.5 rounded-full bg-[rgb(var(--accent-primary))]/20"
            ></div>
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md p-8 bg-[rgb(var(--bg-secondary))]/80 border border-[rgb(var(--accent-primary))]/10 rounded-xl shadow-lg backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-[rgb(var(--accent-primary))]">
          Create Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[rgb(var(--text-primary))]/80 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-primary))]/50 focus:border-[rgb(var(--accent-primary))]/50 transition"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[rgb(var(--text-primary))]/80 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-primary))]/50 focus:border-[rgb(var(--accent-primary))]/50 transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[rgb(var(--text-primary))]/80 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-primary))]/50 focus:border-[rgb(var(--accent-primary))]/50 transition"
              placeholder="Create a strong password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[rgb(var(--text-primary))]/80 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-primary))]/50 focus:border-[rgb(var(--accent-primary))]/50 transition"
              placeholder="Confirm your password"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-[rgb(var(--accent-primary))] hover:bg-[rgb(var(--accent-primary))]/90 text-[rgb(var(--bg-primary))] px-4 py-3 rounded-md font-bold text-base transition flex justify-center items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[rgb(var(--bg-primary))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgb(var(--border-primary))]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-primary))]/60">Or continue with</span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <motion.button
          onClick={handleGoogleSignup}
          className="w-full bg-white hover:bg-gray-100 text-gray-800 px-4 py-3 rounded-md font-semibold text-base transition flex justify-center items-center gap-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <FcGoogle size={24} />
          Continue with Google
        </motion.button>

        <p className="mt-6 text-center text-sm text-[#f5f5f7]/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#A2BFFE] hover:text-[#91AFFE] transition"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;