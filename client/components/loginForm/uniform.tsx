"use client"
import React, { useState, useRef, useEffect } from 'react';
import FloatingCard from './FloatingCard';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

const universities = [
  { id: "1", name: "Harvard University" },
  { id: "2", name: "Stanford University" },
  { id: "3", name: "MIT" },
];

const Uniform: React.FC = () => {
  const router = useRouter()
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Register/Login, initial state is login
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FloatingCard>
        <p
      onClick={() => router.back()}
      className="text-slate-500 text-sm flex gap-2 items-center cursor-pointer hover:underline"
    >
      <ArrowLeft size={15} /> Back
    </p>

      <h1 className="text-white text-3xl font-semibold mb-6">
        {isLogin ? "Login Now" : "Register Now"}
      </h1>
      {!isLogin && (
        <p className="text-gray-400 text-sm mb-8">
          Add your university to our community
        </p>
      )}
      <form className="space-y-6 flex-1 flex flex-col justify-start">
        {/* Select University */}
        <div>
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search university..."
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 appearance-none pr-10"
              onChange={(e) => {
                setSelectedUniversity(e.target.value);
                setIsDropdownOpen(true);
              }}
              value={selectedUniversity}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
              <div className="absolute z-10 bg-gray-800 border border-gray-700 rounded-lg mt-1 w-full max-h-40 overflow-y-auto">
                {universities
                  .filter((u) =>
                    u.name.toLowerCase().includes(selectedUniversity.toLowerCase())
                  ).length > 0 ? (
                  universities
                    .filter((u) =>
                      u.name.toLowerCase().includes(selectedUniversity.toLowerCase())
                    )
                    .map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setSelectedUniversity(u.name);
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                      >
                        {u.name}
                      </div>
                    ))
                ) : (
                  <div className="px-4 py-2 text-gray-400">No university found</div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Register: AISHE code, Email, Contact | Login: Email, Password */}
        {!isLogin ? (
          <>
            {/* AISHE code Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Enter AISHE Code"
                />
              </div>
            </div>
            {/* Email id Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Enter Email ID"
                />
              </div>
            </div>
            {/* Contact Number Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Contact Number"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Email id Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Enter Email ID"
                />
              </div>
            </div>
            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Password"
                />
              </div>
              <div className="text-right mt-1">
                <button
                  type="button"
                  className="text-xs text-blue-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </>
        )}
        {/* Sign In/Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          {isLogin ? "Login Now" : "Apply Now"}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </form>
      {/* Footer for toggling Register/Login */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        {isLogin ? (
          <>
            Not registered yet?{" "}
            <button
              type="button"
              className="text-blue-400 hover:underline"
              onClick={() => setIsLogin(false)}
            >
              Register now
            </button>
          </>
        ) : (
          <>
            Already registered?{" "}
            <button
              type="button"
              className="text-blue-400 hover:underline"
              onClick={() => setIsLogin(true)}
            >
              Login now
            </button>
          </>
        )}
      </div>
    </FloatingCard>
  );
};

export default Uniform;
