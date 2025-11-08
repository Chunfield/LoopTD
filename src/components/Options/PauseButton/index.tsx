import { useGameStore } from "../../../stores/gameStore";

export const PauseButton = () => {
  const isPaused = useGameStore((state) => state.isPaused);
  const pauseGame = useGameStore((state) => state.pauseGame);
  const resumeGame = useGameStore((state) => state.resumeGame);

  const handleClick = () => {
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "8px 16px",
        fontSize: "16px",
        backgroundColor: isPaused ? "#4CAF50" : "#f44336",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {isPaused ? "▶" : "⏸"}{" "}
    </button>
  );
};
