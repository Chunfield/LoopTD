import GameMap from "./components/GameMaps/GrassLand";
import { PauseButton } from "./components/Options/PauseButton";
import { AddEnemyButton } from "./components/Options/AddEnemyButton";
import { RemoveEnemyButton } from "./components/Options/RemoveEnemyButton";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          display: "flex",
          gap: "8px",
        }}
      >
        <PauseButton />
        <AddEnemyButton />
        <RemoveEnemyButton />
      </div>
      <GameMap />
    </div>
  );
}

export default App;
