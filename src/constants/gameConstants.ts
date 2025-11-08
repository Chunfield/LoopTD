export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 600;

// 道路相关
export const ROAD_HALF_WIDTH = 40; // 道路总宽 80px，所以半宽 40

// 可放置区域：一个包围整个中间区域的矩形（比地图小一圈）
export const PLACEMENT_BOUNDING_BOX = {
  x: 100,
  y: 80,
  width: 600,
  height: 440,
} as const;
