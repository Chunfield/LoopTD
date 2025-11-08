import type { RoadSegment } from "../../types";

export const grassLandConfig = {
  width: 600,
  height: 600,
  roadWidth: 40,
  roads: [
    { start: { x: 0, y: 0 }, end: { x: 600, y: 0 } },
    { start: { x: 0, y: 600 }, end: { x: 600, y: 600 } },
    { start: { x: 0, y: 40 }, end: { x: 0, y: 560 } },
    { start: { x: 600, y: 40 }, end: { x: 600, y: 560 } },
  ] satisfies RoadSegment[],
} as const;
