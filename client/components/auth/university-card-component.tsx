"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const UniversityCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();
  return (
    <CardContainer>
      <CardBody>
        <CardItem>
      <div
        className="bg-gradient-to-br from-gray-900 to-black relative group cursor-pointer border border-white/10 backdrop-blur-sm w-80 h-96 rounded-2xl p-8 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          localStorage.setItem("role", "student");
          router.push("/auth/uni");
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
              University
            </h3>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          <div className="flex-1 flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                <div className="text-4xl">🏛️</div>
              </div>
              {isHovered && (
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-2xl blur animate-pulse" />
              )}
            </div>
          </div>

          <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
            Institutional Access Portal
          </p>

          <div className="mt-4 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default UniversityCard;
