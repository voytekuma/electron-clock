import React, { useEffect, useState } from 'react';

const CLOCK_SIZE = 180;
const CENTER = CLOCK_SIZE / 2;
const HAND_LENGTHS = {
  hour: CLOCK_SIZE * 0.35,
  minute: CLOCK_SIZE * 0.45,
  second: CLOCK_SIZE * 0.48,
};

function getHandCoords(angle: number, length: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + length * Math.cos(rad),
    y: CENTER + length * Math.sin(rad),
  };
}

const AnalogClock: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourAngle = (hour + minute / 60) * 30;
  const minuteAngle = (minute + second / 60) * 6;
  const secondAngle = second * 6;

  const hourHand = getHandCoords(hourAngle, HAND_LENGTHS.hour);
  const minuteHand = getHandCoords(minuteAngle, HAND_LENGTHS.minute);
  const secondHand = getHandCoords(secondAngle, HAND_LENGTHS.second);

  return (
    <svg
      width={CLOCK_SIZE}
      height={CLOCK_SIZE}
      style={{ background: 'transparent' }}
    >
      {/* 盤面 */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={CLOCK_SIZE / 2 - 8}
        fill="#23272f"
        stroke="#444"
        strokeWidth="4"
      />
      {/* 時針 */}
      <line
        x1={CENTER}
        y1={CENTER}
        x2={minuteHand.x}
        y2={minuteHand.y}
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* 秒針 */}
      <line
        x1={CENTER}
        y1={CENTER}
        x2={secondHand.x}
        y2={secondHand.y}
        stroke="#ff4081"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 中心点 */}
      <circle cx={CENTER} cy={CENTER} r="6" fill="#fff" />
    </svg>
  );
};

export default AnalogClock;
