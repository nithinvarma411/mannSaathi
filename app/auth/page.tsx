"use client";

import React from "react";
import UniversityCard from "@/components/auth/university-card-component";
import CounselorCard from "@/components/auth/counselor-card-component";
import StudentCard from "@/components/auth/student-card-component";
import BackButton from "@/components/ui/back-button";
import LanguageSelector from "@/components/ui/language-selector";
import { useLanguage } from "@/components/ui/language-context";

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 4}s`,
      }}
    />
  ));
  return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
};

const AuthPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* ---------- Language Selector ---------- */}
      <div className="hidden md:block absolute top-6 right-6 z-20">
        <LanguageSelector />
      </div>

      {/* ---------- Background Effects ---------- */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)
          `,
        }}
      />
      {/* <FloatingParticles /> */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* ---------- Back Button ---------- */}
      <BackButton className="absolute top-6 left-6 max-md:top-3 max-md:left-0 z-20" />

      {/* ---------- Header ---------- */}
      <header className="relative z-10 px-4 pt-12 pb-6 sm:pt-16 sm:pb-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text">
            {t("choose_your_path")}
          </h1>
          <p className="px-2 text-base text-gray-400 sm:px-0 sm:text-lg md:text-xl">
            {t("select_role")}
          </p>
        </div>
      </header>

      {/* ---------- Role Cards ---------- */}
      <main className="relative z-10 lg:px-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 sm:flex-row lg:gap-12">
            <UniversityCard />
          <CounselorCard />
          <StudentCard />
        </div>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="relative z-10 px-4 pb-8 text-center">
        <p className="text-sm text-gray-500">{t("secure_fast_intuitive")}</p>
      </footer>
    </div>
  );
};

export default AuthPage;
