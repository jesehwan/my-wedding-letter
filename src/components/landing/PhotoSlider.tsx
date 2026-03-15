import { useState } from "react";

const PHOTOS = [
  "/image/photomatic132986.jpg",
  "/image/photomatic133028.jpg",
  "/image/photomatic133040.jpg",
  "/image/photomatic133075_resize.jpg",
  "/image/photomatic133081_resize.jpg",
  "/image/photomatic133107_resize.jpg",
  "/image/photomatic133122.jpg",
  "/image/photomatic133131.jpg",
  "/image/photomatic133180_resize.jpg",
  "/image/photomatic133194_resize.jpg",
];

// Fixed rotation offsets per photo (polaroid feel)
const ROTATIONS = [-2.1, 1.5, -0.8, 2.7, -1.3, 0.6, -2.5, 1.9, -0.4, 2.2];

// Duplicate photos for seamless loop
const DOUBLED_PHOTOS = [...PHOTOS, ...PHOTOS];

export function PhotoSlider() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className="flex gap-6"
        style={{
          animation: "marquee 40s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {DOUBLED_PHOTOS.map((src, i) => {
          const rotation = ROTATIONS[i % ROTATIONS.length];
          return (
            <div
              key={`${src}-${i}`}
              className="flex-shrink-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="h-[320px] w-[260px] rounded-sm bg-white p-4 shadow-md sm:h-[400px] sm:w-[320px] sm:p-5">
                <img
                  src={src}
                  alt={`웨딩 사진 ${(i % PHOTOS.length) + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
