"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageResultDisplayProps {
  images: string[];
}

export default function ImageResultDisplay({ images }: ImageResultDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-lg">
        <Image
          src={currentImage}
          alt={`Result ${currentIndex + 1}`}
          width={500}
          height={500}
          unoptimized
          className="w-full h-auto rounded-xl shadow-lg object-contain"
        />
      </div>

      {images.length > 1 && (
        <div className="flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

