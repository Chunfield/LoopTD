import { useGameStore } from "../../../stores/gameStore";

export const RemoveEnemyButton = () => {
  // ✅ 只订阅长度用于禁用按钮（避免不必要重渲染）
  const enemyCount = useGameStore((state) => state.enemies.length);
  const removeEnemy = useGameStore((state) => state.removeEnemy);

  const handleRemove = () => {
    const currentEnemies = useGameStore.getState().enemies;
    console.log("当前敌人数量:", currentEnemies.length);
    if (currentEnemies.length > 0) {
      const id = currentEnemies[currentEnemies.length - 1].id;
      console.log("删除敌人:", id);
      removeEnemy(id);
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={enemyCount === 0}
      style={{
        padding: "8px 16px",
        fontSize: "16px",
        backgroundColor: enemyCount === 0 ? "#ccc" : "#FF9800",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: enemyCount === 0 ? "not-allowed" : "pointer",
      }}
    >
      − 删除敌人
    </button>
  );
};
