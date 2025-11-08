import React from "react";
import "./EnemyRed.css";

interface EnemyProps {
  x: number;
  y: number;
  radius?: number;
}

const Enemy: React.FC<EnemyProps> = ({ x, y, radius = 12 }) => {
  return (
    <div
      className="enemy-red"
      style={{
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
      }}
    />
  );
};

export default Enemy;
