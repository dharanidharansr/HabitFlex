import React from "react";
import PartnersSection from "../components/partners/PartnersSection";
import ThemeToggle from "../components/ThemeToggle";

const Partners = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] py-8">
      <main className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Accountability Partners</h1>
          <p className="text-[rgb(var(--text-primary))]/60">
            Connect with others and stay accountable together
          </p>
        </div>
        <PartnersSection />
      </main>
      <ThemeToggle />
    </div>
  );
};

export default Partners;
