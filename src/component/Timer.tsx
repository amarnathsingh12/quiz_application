import React, { useState, useEffect } from "react";

interface TimerProps {
  duration: number;
  onTimeOut: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    setTimeLeft(duration); // Reset the timeLeft whenever duration changes

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          onTimeOut(); // Trigger the timeout callback when time reaches 0
          clearInterval(timer); // Clear the interval when time is out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on unmount or when `duration` changes
  }, [duration, onTimeOut]); // Only re-run the effect when `duration` changes

  return (
    <div
      className={`text-3xl font-bold mb-6 ${timeLeft <= 10 ? "text-red-500" : ""}`}
    >
      Time Left: {timeLeft}s
    </div>
  )
};

export default Timer;
