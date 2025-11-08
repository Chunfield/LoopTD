import React, { useEffect } from "react";
import { useGameStore } from "../../../stores/gameStore";
import { useGameLoop } from "../../../hooks/useGameLoop";
import { GrassLandView } from "./GrassView";
import { isInPlacementArea } from "../../../utils/placementUtils";
const GrassLand: React.FC = () => {
  const enemies = useGameStore((state) => state.enemies);
  const towers = useGameStore((state) => state.towers);
  const addTower = useGameStore((state) => state.addTower); // 👈 获取 addTower

  useGameLoop();

  useEffect(() => {
    const { addEnemy } = useGameStore.getState();
    addEnemy(120);
  }, []);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const canPlace = isInPlacementArea({ x, y });

    console.log(
      `[Placement Test] (${x.toFixed(1)}, ${y.toFixed(1)}) →`,
      canPlace ? "✅ 可放置" : "❌ 在道路上"
    );

    // ✅ 关键：如果可以放置，并且你有默认塔类型，就添加一个塔
    if (canPlace) {
      addTower({
        type: "arrow", // 默认放置箭塔（后续可改为选中塔类型）
        level: 1,
        position: { x, y },
        stats: {
          baseDamage: 10,
          range: 100,
          attackSpeed: 10,
          buildCost: 10,
        },
      });
    }
  };

  return (
    <GrassLandView
      enemies={enemies.map((enemy) => ({
        id: enemy.id,
        position: enemy.position,
      }))}
      towers={towers}
      onMapClick={handleMapClick}
    />
  );
};

export default GrassLand;
