import React from "react";
import Enemy from "../../Enemy/EnemyRed";
import { TowerBase } from "../../Tower/ArrowTower/ArrowTowerBase";
import type { TowerType } from "../../../types";

import "./GrassLand.css";

export interface GrassLandViewProps {
  enemies: {
    id: string;
    position: { x: number; y: number };
  }[];
  towers: {
    id: string;
    type: TowerType; // 或更严格的 'arrow' | 'cannon'...
    level: number;
    position: { x: number; y: number };
  }[];
  onMapClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const GrassLandView: React.FC<GrassLandViewProps> = ({
  enemies,
  towers,
  onMapClick,
}) => {
  console.log("Towers received:", towers); // 👈 加这行

  return (
    <div className="game-container">
      <div className="map-area" onClick={onMapClick}>
        {/* 道路 */}
        <div className="road top"></div>
        <div className="road right"></div>
        <div className="road bottom"></div>
        <div className="road left"></div>

        {/* 👇 渲染所有防御塔 */}
        {towers.map((tower) => (
          <TowerBase
            key={tower.id}
            type={tower.type}
            level={tower.level}
            style={{
              position: "absolute",
              left: tower.position.x,
              top: tower.position.y,
              width: 40, // 占地宽度（与道路同宽）
              height: 40, // 占地高度
              zIndex: 5, // 高于道路（z-index:1），低于敌人（默认更高）
            }}
          />
        ))}

        {/* 渲染敌人 */}
        {enemies.map((enemy) => (
          <Enemy key={enemy.id} x={enemy.position.x} y={enemy.position.y} />
        ))}
      </div>
    </div>
  );
};
