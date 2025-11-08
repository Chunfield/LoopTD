import { generatePlacementGrid } from "../../utils/gridUtils";

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

// 可放置区域（居中矩形）
const PLACEMENT_AREA = {
  x: 150,
  y: 100,
  width: 500,
  height: 400,
};

const GRID_ROWS = 5;
const GRID_COLS = 5;

export const PlacementGridOverlay = () => {
  const grid = generatePlacementGrid(
    PLACEMENT_AREA.x,
    PLACEMENT_AREA.y,
    PLACEMENT_AREA.width,
    PLACEMENT_AREA.height,
    GRID_ROWS,
    GRID_COLS
  );

  return (
    <svg
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none", // 不拦截鼠标事件
        zIndex: 10,
      }}
    >
      {/* 可放置区域背景（灰色半透明） */}
      <rect
        x={PLACEMENT_AREA.x}
        y={PLACEMENT_AREA.y}
        width={PLACEMENT_AREA.width}
        height={PLACEMENT_AREA.height}
        fill="rgba(128, 128, 128, 0.2)"
        stroke="#888"
        strokeWidth="2"
      />

      {/* 网格线 */}
      {grid.flat().map((cell) => (
        <rect
          key={`${cell.row}-${cell.col}`}
          x={cell.x}
          y={cell.y}
          width={PLACEMENT_AREA.width / GRID_COLS}
          height={PLACEMENT_AREA.height / GRID_ROWS}
          fill="none"
          stroke={cell.isRoad ? "#f00" : "#4a90e2"} // 未来道路标红
          strokeWidth="1"
        />
      ))}
    </svg>
  );
};
