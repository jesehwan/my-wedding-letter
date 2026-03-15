import { useRef, useEffect, useCallback, useState } from "react";

const PHOTOS = [
  "/image/photomatic133107_resize.jpg",
  "/image/photomatic133040.jpg",
  "/image/photomatic133194_resize.jpg",
  "/image/photomatic132986.jpg",
  "/image/photomatic133180_resize.jpg",
  "/image/photomatic133122.jpg",
  "/image/photomatic133028.jpg",
  "/image/photomatic133081_resize.jpg",
  "/image/photomatic133131.jpg",
  "/image/photomatic133075_resize.jpg",
];

// Fixed rotation offsets per photo (polaroid feel)
const ROTATIONS = [-2.1, 1.5, -0.8, 2.7, -1.3, 0.6, -2.5, 1.9, -0.4, 2.2];

// Duplicate photos for seamless loop
const DOUBLED_PHOTOS = [...PHOTOS, ...PHOTOS];

const AUTO_SPEED = 1; // px per frame
const RESUME_DELAY = 3000; // ms after interaction before auto-scroll resumes

export function PhotoSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const isPausedRef = useRef(false);
  const [, forceRender] = useState(0);

  const applyTransform = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }
  }, []);

  const getHalfWidth = useCallback(() => {
    if (!innerRef.current) return 0;
    return innerRef.current.scrollWidth / 2;
  }, []);

  const wrapOffset = useCallback(() => {
    const half = getHalfWidth();
    if (half > 0) {
      if (offsetRef.current >= half) {
        offsetRef.current -= half;
      } else if (offsetRef.current < 0) {
        offsetRef.current += half;
      }
    }
  }, [getHalfWidth]);

  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, RESUME_DELAY);
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current && !isPausedRef.current) {
        offsetRef.current += AUTO_SPEED;
        wrapOffset();
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform, wrapOffset]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isPausedRef.current = true;
    forceRender((n) => n + 1);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - e.clientX;
    offsetRef.current = dragStartOffsetRef.current + delta;
    wrapOffset();
    applyTransform();
  }, [applyTransform, wrapOffset]);

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    pauseAutoScroll();
    forceRender((n) => n + 1);
  }, [pauseAutoScroll]);

  // Touch drag handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartOffsetRef.current = offsetRef.current;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isPausedRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - e.touches[0].clientX;
    offsetRef.current = dragStartOffsetRef.current + delta;
    wrapOffset();
    applyTransform();
  }, [applyTransform, wrapOffset]);

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ cursor: isDraggingRef.current ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={innerRef}
        className="flex gap-6"
        style={{ willChange: "transform" }}
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
                  className="pointer-events-none h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
