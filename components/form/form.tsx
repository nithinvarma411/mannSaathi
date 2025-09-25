"use client"

import React, { useEffect, useState } from "react";
import FloatingCard from "../loginForm/FloatingCard";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import LanguageSelector from "../ui/language-selector";
import { useLanguage } from "../ui/language-context";

const universities = [
  { id: "1", name: "Harvard University" },
  { id: "2", name: "Stanford University" },
  { id: "3", name: "MIT" },
];

const Form: React.FC = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const [universityId, setUniversityId] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { universityId, selectedUniversity, password, role };
    alert(JSON.stringify(payload, null, 2));
  };

  return (
    <FloatingCard leftType = "image">
      <div className="flex justify-between items-start mb-4">
        <p 
          onClick={() => router.back()}
          className='text-slate-500 text-sm flex gap-2 items-center cursor-pointer hover:underline'>
          <ArrowLeft size={15} /> 
          {t("back")}
        </p>
        <LanguageSelector />
      </div>
      <h1 className="text-white text-3xl font-semibold mb-8">
          {t("welcome_back")}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <select
              value={selectedUniversity}
              onChange={e => setSelectedUniversity(e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 appearance-none pr-10"
              required
            >
              <option value="" className="bg-gray-800">{t("search_university")}</option>
              {universities.map(u => (
                <option key={u.id} value={u.id} className="bg-gray-800">{u.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l-.707.707L13.5 18l4.207-4.343-.707-.707L13.5 16.5l-4.207-4.207zM10 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg>
            </div>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={universityId}
            onChange={e => setUniversityId(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder={t("enter_university_id")}
            required
          />
        </div>
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder={t("enter_password")}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-gray-400"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                // Eye-off icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M6.343 6.343A7.963 7.963 0 004 9c0 4.418 3.582 8 8 8 1.657 0 3.22-.403 4.575-1.125M17.657 17.657A7.963 7.963 0 0020 15c0-4.418-3.582-8-8-8-1.657 0-3.22.403-4.575 1.125M3 3l18 18" />
                </svg>
              ) : (
                // Eye icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <div className="text-right mt-2">
            <a href="#" className="text-blue-400 text-sm font-medium hover:underline transition duration-300">{t("forgot_password")}</a>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t("role")}</label>
          <div className="w-full border border-gray-700 rounded-lg px-4 py-2 text-gray-400 bg-gray-800 cursor-not-allowed">
            {role || t("role_not_found")}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          {t("sign_in")}
        </button>
      </form>
    </FloatingCard>
  );
};

export default Form;