import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface SliderWithIconProps {
  value: number;
  setValue: (rating: number) => void;
}

const SliderWithIcon: React.FC<SliderWithIconProps> = ({ value, setValue }) => {
  const min = 1;
  const max = 10;
  const guinnessGold = "rgb(190, 150, 91)";
  const grey = "#d1d5db";

  // const [value, setValue] = useState<number>(5);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateValueFromPosition = (clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    const newValue = Math.round(min + percentage * (max - min));

    setValue(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValueFromPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateValueFromPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateValueFromPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      updateValueFromPosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mt-10 w-full max-w-md mx-auto select-none flex flex-col gap-11">
      <div
        className="relative w-full h-5 rounded-lg bg-gray-300 cursor-pointer"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}>
        {/* Filled bar */}
        <div
          className="absolute top-0 left-0 h-5 rounded-l-lg"
          style={{
            width: `${percentage}%`,
            backgroundColor: guinnessGold,
          }}
        />

        {/* Image container as thumb */}
        <div
          className="absolute -top-10 z-10 pointer-events-auto"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            left: `${percentage}%`,
            transform: "translateX(-50%)",
            width: 80,
            height: 80,
          }}>
          <Image
            src={`/guinness-glass.png`}
            alt="guinness glass"
            width={80}
            height={80}
            draggable={false}
            priority
          />
        </div>
      </div>

      <div className="text-center text-white text-xl">
        <span style={{ color: guinnessGold, fontWeight: "bold" }}>
          {value} out of 10
        </span>
      </div>
    </div>
  );
};

export default SliderWithIcon;
