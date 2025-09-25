"use client"

import React, { useState, useEffect } from "react";

const ImageFadeTransition: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const images: string[] = [
    "/mental1.jpg",
    "/mental2.jpg",
    "/mental3.jpg",
    "/mental4.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // make the container size controlled by the parent (page split); images fill that area
  return (
    <div className="relative w-full h-full">
      {images.map((image: string, index: number) => (
        <img
          key={index}
          src={image}
          alt={`slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default ImageFadeTransition;