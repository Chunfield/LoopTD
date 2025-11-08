import { useGameStore } from "../../../stores/gameStore";

export const AddEnemyButton = () => {
  const addEnemy = useGameStore((state) => state.addEnemy);

  const handleClick = () => {
    addEnemy(100); // 可自定义速度，比如 80、120 等
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "8px 16px",
        fontSize: "16px",
        backgroundColor: "#2196F3",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "8px",
      }}
    >
      + 添加敌人
    </button>
  );
};
