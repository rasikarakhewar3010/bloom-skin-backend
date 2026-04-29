import React, { useState, useRef } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "First Scan", afterLabel = "Latest Scan" }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    if (!x) return;
    const pos = ((x - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(pos, 0), 100));
  };

  return (
    <div 
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-gray-200 shadow-sm"
      ref={containerRef}
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onTouchMove={handleDrag}
      onMouseDown={handleDrag}
    >
      {/* After Image (Background) */}
      <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm shadow-md">
        {afterLabel}
      </div>

      {/* Before Image (Clipped overlay) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center transform -translate-x-1/2 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center absolute">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-gray-300 rounded-full" />
            <div className="w-1 h-3 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
