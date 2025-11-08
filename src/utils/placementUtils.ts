import { grassLandConfig } from "../configs/Maps/grassLandConfig";
import type { Point } from "../types";

/**
 * 计算点 p 到线段 ab 的最短距离（仅支持水平或垂直线段）
 */
function distanceToSegment(p: Point, a: Point, b: Point): number {
  // 垂直线段 (x 不变)
  if (a.x === b.x) {
    const minY = Math.min(a.y, b.y);
    const maxY = Math.max(a.y, b.y);
    if (p.y < minY) {
      return Math.hypot(p.x - a.x, p.y - minY);
    }
    if (p.y > maxY) {
      return Math.hypot(p.x - a.x, p.y - maxY);
    }
    return Math.abs(p.x - a.x); // 横向距离
  }

  // 水平线段 (y 不变)
  if (a.y === b.y) {
    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);
    if (p.x < minX) {
      return Math.hypot(p.x - minX, p.y - a.y);
    }
    if (p.x > maxX) {
      return Math.hypot(p.x - maxX, p.y - a.y);
    }
    return Math.abs(p.y - a.y); // 纵向距离
  }

  return Infinity;
}

/**
 * 判断给定点是否在“可放置区域”（即不在道路上）
 */
export const isInPlacementArea = (point: Point): boolean => {
  const { roads, roadWidth } = grassLandConfig;

  for (const road of roads) {
    const dist = distanceToSegment(point, road.start, road.end);
    // ✅ 关键修复：使用 roadWidth 而不是 roadWidth/2
    if (dist <= roadWidth) {
      return false; // 点在道路范围内 → 不可放置
    }
  }

  return true; // 不在任何道路上 → 可放置
};
