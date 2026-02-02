import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
      navigate('/login');
    } else if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: userId,
        username: username,
        email: email
      }));
      toast.success('Welcome to HabitFlex! 🎉');
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f5f5f7] overflow-x-hidden">
      <Navbar isScrolled={isScrolled} />
      <HeroSection />
      <Features />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
