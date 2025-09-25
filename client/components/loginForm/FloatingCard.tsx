"use client"
import React from 'react';
import FloatingIcons from './FloatingIcons';
import ImageFaderTransition from '@/components/form/ImageFadeTransition';

interface FloatingCardProps {
  children: React.ReactNode;
  leftType?: "icons" | "image";
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, leftType = "icons" }) => {
  return (
    <div className="min-h-screen bg-gray-800 lg:bg-black flex justify-center items-center font-sans p-4">
      <div className="floating-card lg:rounded-4xl  w-full lg:w-290 h-190 max-w-full  transition-all duration-300 ease-out relative overflow-hidden">
        {/* Main Content Area - 60:40 Split */}
        <div className="flex h-full">
          {/* Left Section - 60% */}
          <div className="hidden md:flex w-3/5 bg-white/20 backdrop-blur-sm flex-col justify-center">
            {leftType === "image" ? <ImageFaderTransition /> : <FloatingIcons />}
          </div>
          {/* Right Section - 40% */}
          <div className=" w-full md:w-2/5 bg-gray-800 flex flex-col justify-center p-12">
            <div className="max-w-sm mx-auto w-full flex flex-col min-h-[420px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCard;