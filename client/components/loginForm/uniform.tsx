"use client";
import React, { useState, useRef, useEffect } from "react";
import FloatingCard from "./FloatingCard";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const universities = [
  { id: "1", name: "Harvard University" },
  { id: "2", name: "Stanford University" },
  { id: "3", name: "MIT" },
];

const Uniform: React.FC = () => {
  const router = useRouter();
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // State for OTP flow
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // form fields
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aisheCode, setAisheCode] = useState("");
  const [phone, setPhone] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // MODIFIED: This function now uses separate endpoints for login and registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isLogin
      ? "http://localhost:4000/api/uni-admin/login"
      : "http://localhost:4000/api/uni-admin/initiate";

    const body = isLogin
      ? { email, password, university: selectedUniversity }
      : { university: selectedUniversity, name, uid, email, aisheCode, phone };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      if (!isLogin) {
        // This was a successful 'initiate' call
        setIsOtpSent(true);
        alert("Registration initiated. Please check your email for an OTP.");
      } else {
        // This was a successful 'login' call
        alert(data.message); // For login
        // Example: router.push('/dashboard');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/uni-admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP or details");

      alert(data.message); // e.g., "Registration successful! You can now log in."
      setIsLogin(true); // Switch to the login view
      setIsOtpSent(false); // Reset OTP state
      setPassword(""); // Clear password from state for security
      setOtp(""); // Clear OTP
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <FloatingCard>
      <p
        onClick={() => router.back()}
        className="text-slate-500 text-sm flex gap-2 items-center cursor-pointer hover:underline"
      >
        <ArrowLeft size={15} /> Back
      </p>

      <h1 className="text-white text-3xl font-semibold mb-6">
        {isLogin ? "Login Now" : isOtpSent ? "Complete Registration" : "Register Now"}
      </h1>

      <form
        onSubmit={!isLogin && isOtpSent ? handleVerifyOtp : handleSubmit}
        className="space-y-6 flex-1 flex flex-col justify-start"
      >
        {/* University dropdown is always visible except during OTP verification */}
        {!isOtpSent && (
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search university..."
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-10"
              onChange={(e) => {
                setSelectedUniversity(e.target.value);
                setIsDropdownOpen(true);
              }}
              value={selectedUniversity}
              onFocus={() => setIsDropdownOpen(true)}
              required
            />
            {isDropdownOpen && (
              <div className="absolute z-10 bg-gray-800 border border-gray-700 rounded-lg mt-1 w-full max-h-40 overflow-y-auto">
                {universities
                  .filter((u) => u.name.toLowerCase().includes(selectedUniversity.toLowerCase()))
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
                  ))}
              </div>
            )}
          </div>
        )}

        {!isLogin ? (
          isOtpSent ? (
            <>
              {/* OTP and Password Fields */}
              <p className="text-slate-300 text-center !mt-4">
                An OTP has been sent to <strong>{email}</strong>.
              </p>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Create a Password"
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                Verify & Complete Registration
              </button>
            </>
          ) : (
            <>
              {/* Initial Registration Fields */}
              <input
                type="text"
                placeholder="Enter Full Name"
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter UID"
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter AISHE Code"
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
                value={aisheCode}
                onChange={(e) => setAisheCode(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Enter Email ID"
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                Apply Now
              </button>
            </>
          )
        ) : (
          <>
            {/* Login Fields */}
            <input
              type="email"
              placeholder="Enter Email ID"
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Login Now
            </button>
          </>
        )}
      </form>

      {!isOtpSent && (
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
      )}
    </FloatingCard>
  );
};

export default Uniform;