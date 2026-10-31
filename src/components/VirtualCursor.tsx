import React from 'react';

interface VirtualCursorProps {
  currentTime: number; // in seconds (e.g., 7.0 - 10.0)
  targetPosition?: { x: number; y: number }; // percentage or pixel coordinate
  isMobile?: boolean;
}

export const VirtualCursor: React.FC<VirtualCursorProps> = ({
  currentTime,
  isMobile = false,
}) => {
  // Only render during the broker decision window (7.0s to 10.0s)
  if (currentTime < 7.0 || currentTime > 9.9) {
    return null;
  }

  // Timing math
  // 7.0s - 7.78s: Glide smoothly to the button
  // 7.80s: The exact click instant
  // 7.80s - 8.05s: Mouse down press compression
  // 8.05s - 9.8s: Idle / subtle natural drift after clicking
  const timeIntoPhase = currentTime - 7.0; // 0.0 to 3.0

  // Coordinates (percentage relative to device frame)
  // Target is the center of the "Approve" button
  const startX = isMobile ? 78 : 74;
  const startY = isMobile ? 86 : 84;
  const targetX = 50; // Center aligned button
  const targetY = isMobile ? 66 : 64; // Approximated button center

  let currentX = startX;
  let currentY = startY;
  let isPressed = false;
  let showRipple = false;
  let opacity = 1;

  if (timeIntoPhase < 0.15) {
    // Fade in
    opacity = Math.min(1, timeIntoPhase / 0.15);
    currentX = startX;
    currentY = startY;
  } else if (timeIntoPhase < 0.78) {
    // Smooth glide: Cubic bezier ease-out
    const t = (timeIntoPhase - 0.15) / 0.63; // 0 to 1
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - t, 3);
    currentX = startX + (targetX - startX) * ease;
    currentY = startY + (targetY - startY) * ease;
  } else if (timeIntoPhase >= 0.78 && timeIntoPhase < 0.95) {
    // Pressed down on button
    currentX = targetX;
    currentY = targetY;
    isPressed = true;
    showRipple = true;
  } else if (timeIntoPhase >= 0.95 && timeIntoPhase < 1.4) {
    // Post click ripple decaying
    currentX = targetX;
    currentY = targetY;
    showRipple = true;
  } else {
    // Post-action natural slow drift
    const driftT = Math.min(1, (timeIntoPhase - 1.4) / 1.5);
    currentX = targetX + driftT * (isMobile ? 10 : 8);
    currentY = targetY + driftT * (isMobile ? 8 : 6);
  }

  return (
    <div
      className="absolute pointer-events-none z-50 transition-transform duration-75 ease-out select-none"
      style={{
        left: `${currentX}%`,
        top: `${currentY}%`,
        opacity,
        transform: `translate(-2px, -2px) scale(${isPressed ? 0.88 : 1})`,
      }}
    >
      {/* Click ripple wave */}
      {showRipple && (
        <div className="absolute -left-6 -top-6 w-14 h-14 pointer-events-none">
          <div className="w-full h-full rounded-full border-2 border-emerald-400 bg-emerald-400/20 animate-click-ripple" />
        </div>
      )}

      {/* Realistic Executive Mouse Pointer */}
      <svg
        width="28"
        height="32"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)]"
      >
        <path
          d="M3 2L20 15.5L12 17.5L8.5 25L3 2Z"
          fill="#0F172A"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M5 5.5L16.5 14.5L11 16L7.5 22.5L5 5.5Z"
          fill="#1E293B"
        />
        {/* Subtle accent dot on cursor body */}
        <circle cx="7" cy="8" r="1" fill="#F59E0B" />
      </svg>
    </div>
  );
};
