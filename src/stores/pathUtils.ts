import type { Point } from "../types";

export const MAP_SIZE = 600;
export const ROAD_WIDTH = 40;

export const generatePath = (): Point[] => {
  const path: Point[] = [];
  const innerStart = ROAD_WIDTH;
  const innerEnd = MAP_SIZE - ROAD_WIDTH;

  for (let x = innerStart; x <= innerEnd; x++)
    path.push({ x, y: ROAD_WIDTH / 2 });
  for (let y = ROAD_WIDTH; y <= MAP_SIZE - ROAD_WIDTH; y++)
    path.push({ x: MAP_SIZE - ROAD_WIDTH / 2, y });
  for (let x = innerEnd; x >= innerStart; x--)
    path.push({ x, y: MAP_SIZE - ROAD_WIDTH / 2 });
  for (let y = MAP_SIZE - ROAD_WIDTH; y >= ROAD_WIDTH; y--)
    path.push({ x: ROAD_WIDTH / 2, y });

  return path;
};
