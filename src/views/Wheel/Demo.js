import React, { useState } from "react";
import Wheel from "./Wheel";

const Demo = () => {
  const [wonPrize, setWonPrize] = useState(null);

  // Prize data
  const prizes = [
    "Pass *3",
    "Iphone",
    "Smart TV",
    "Pass *11",
    "Pass TikTok",
    "Airpods",
  ];

  return (
    <div className="App">
      <h1>Spinning Wheel Game</h1>
      <Wheel prizes={prizes} onSpin={setWonPrize} />
      {wonPrize && (
        <p>
          Congratulations! You won a <strong>{wonPrize}</strong>.
        </p>
      )}
    </div>
  );
};

export default Demo;
