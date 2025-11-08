import { create } from "zustand";
import type { Point, EnemyRuntime, TowerInstance } from "../types";
import { generatePath } from "./pathUtils";

const PATH = generatePath();

let enemyIdCounter = 0;

interface GameState {
  enemies: EnemyRuntime[];
  isPaused: boolean;
  towers: TowerInstance[];

  addEnemy: (speed?: number) => void; // 🔸 不再需要传 id
  removeEnemy: (id: string) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  updateEnemyPosition: (id: string, newPosition: Point) => void;
  tick: (deltaTime: number) => void;
  addTower: (tower: Omit<TowerInstance, "id">) => void;
  removeTower: (id: string) => void;
  upgradeTower: (id: string) => void; // 预留接口
}

export const useGameStore = create<GameState>((set, get) => ({
  enemies: [],
  isPaused: false,
  towers: [],

  // 🔸 自动生成唯一 ID
  addEnemy: (speed = 100) =>
    set((state) => {
      const id = `enemy-${++enemyIdCounter}`; // 每次调用都生成新 ID
      return {
        enemies: [
          ...state.enemies,
          {
            id,
            position: { ...PATH[0] },
            speed,
            positionIndex: 0,
            progress: 0,
          },
        ],
      };
    }),

  removeEnemy: (id) =>
    set((state) => ({
      enemies: state.enemies.filter((e) => e.id !== id),
    })),

  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),

  updateEnemyPosition: (id, newPosition) =>
    set((state) => ({
      enemies: state.enemies.map((e) =>
        e.id === id ? { ...e, position: newPosition } : e
      ),
    })),

  tick: (deltaTime: number) => {
    if (get().isPaused) return;

    set((state) => {
      const updatedEnemies = state.enemies.map((enemy) => {
        // ✅ 现在 enemy 一定有 positionIndex 和 progress，无需默认值或 as any
        let { positionIndex, progress } = enemy;
        const { speed } = enemy;
        let remaining = (speed * deltaTime) / 1000;

        while (remaining > 0) {
          const current = PATH[positionIndex];
          const nextIndex = (positionIndex + 1) % PATH.length;
          const next = PATH[nextIndex];

          const dx = next.x - current.x;
          const dy = next.y - current.y;
          const segLen = Math.hypot(dx, dy);
          const distToEnd = (1 - progress) * segLen;

          if (remaining >= distToEnd) {
            remaining -= distToEnd;
            positionIndex = nextIndex;
            progress = 0;
          } else {
            progress += remaining / segLen;
            remaining = 0;
          }
        }

        const nextPoint = PATH[(positionIndex + 1) % PATH.length];
        const x =
          PATH[positionIndex].x +
          (nextPoint.x - PATH[positionIndex].x) * progress;
        const y =
          PATH[positionIndex].y +
          (nextPoint.y - PATH[positionIndex].y) * progress;

        return {
          ...enemy,
          position: { x, y },
          positionIndex,
          progress,
        };
      });

      return { enemies: updatedEnemies };
    });
  },
  addTower: (tower) =>
    set((state) => ({
      towers: [...state.towers, { ...tower, id: `tower-${Date.now()}` }],
    })),

  removeTower: (id) =>
    set((state) => ({
      towers: state.towers.filter((t) => t.id !== id),
    })),

  upgradeTower: (id) => {
    // TODO: 后续实现升级逻辑
    console.warn("upgradeTower not implemented yet for", id);
  },
}));
