import React, { useState } from "react";
import "./Wheel.css";

const Wheel = ({ prizes, onSpin }) => {
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const randomDegree = 720 + Math.floor(Math.random() * 360); // Random degree to simulate spinning
    const duration = 3000; // 3 seconds

    const wheel = document.getElementById("wheel");
    wheel.style.transition = `transform ${duration / 1000}s ease-in-out`;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
      setSpinning(false);
      wheel.style.transition = "none";
      const winner = Math.floor((randomDegree % 360) / (360 / prizes.length));
      onSpin(prizes[winner]);
      wheel.style.transform = `rotate(${360 * 5}deg)`; // Reset the wheel
    }, duration);
  };

  const segmentStyle = {
    transform: `rotate(${360 / prizes.length}deg)`,
  };

  return (
    <div className="wheel-container">
      <div id="wheel" className={`wheel ${spinning ? "spin" : ""}`}>
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="wheel-segment"
            style={{
              ...segmentStyle,
              transform: `rotate(${(360 / prizes.length) * index}deg)`,
            }}
          >
            {prize}
          </div>
        ))}
      </div>
      <button onClick={spinWheel} disabled={spinning}>
        Spin
      </button>
    </div>
  );
};

export default Wheel;
