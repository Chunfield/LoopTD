import type { Point } from "../../../types";

// === 地图专属配置 ===
export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 600;

export const ROAD_HALF_WIDTH = 40; // 道路禁区半径

// 可放置包围盒（根据你的美术调整）
export const PLACEMENT_BOUNDING_BOX = {
  x: 100,
  y: 80,
  width: 600,
  height: 440,
};

// 道路路径（这是地图的核心数据！）
export const PATH: Point[] = [
  { x: 0, y: 300 },
  { x: 200, y: 300 },
  { x: 200, y: 150 },
  { x: 600, y: 150 },
  { x: 600, y: 450 },
  { x: 800, y: 450 },
];

// --- 工具函数 ---
const distanceFromPointToSegment = (p: Point, v: Point, w: Point): number => {
  const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(
    p.x - (v.x + t * (w.x - v.x)),
    p.y - (v.y + t * (w.y - v.y))
  );
};

// === 对外暴露的核心 API ===
export const isInPlacementArea = (x: number, y: number): boolean => {
  const point = { x, y };
  const { x: bx, y: by, width, height } = PLACEMENT_BOUNDING_BOX;

  // 1. 在包围盒内？
  if (x < bx || x > bx + width || y < by || y > by + height) {
    return false;
  }

  // 2. 远离道路？
  for (let i = 0; i < PATH.length - 1; i++) {
    if (
      distanceFromPointToSegment(point, PATH[i], PATH[i + 1]) < ROAD_HALF_WIDTH
    ) {
      return false;
    }
  }

  return true;
};
