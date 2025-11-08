// src/types/index.ts
export type Point = { x: number; y: number };

// 运行时敌人状态（含路径进度）
export interface EnemyRuntime {
  id: string;
  position: Point;
  speed: number; // 移动速度 (px/s)
  positionIndex: number; // 当前在 PATH 中的索引
  progress: number; // 在当前线段上的插值进度 [0, 1)
}

export interface EnemyConfig {
  id: string;
  speed?: number;
}
export interface RoadSegment {
  start: Point;
  end: Point;
}
// 防御塔类型标识（用于区分种类）
export type TowerType = "arrow" | "cannon" | "magic"; // 后续可扩展

// 塔的基础属性配置（由配置文件提供，不可变）
export interface TowerStats {
  baseDamage: number;
  range: number;
  attackSpeed: number; // 毫秒/次
  buildCost: number;
  // 可选：攻击类型（物理/魔法）、弹道速度等
}

// 塔的运行时状态（可变，存于 GameStore）
export interface TowerInstance {
  id: string; // 唯一ID
  type: TowerType; // 塔类型
  position: { x: number; y: number }; // 左上角坐标（占地左上）
  level: number; // 当前等级（1起）
  stats: TowerStats; // 当前等级的实际属性（升级后更新）
  // 扩展预留：
  // - upgradePath?: string[]; // 升级分支
  // - linkedTowers?: string[]; // 联动塔ID列表
  // - skills?: string[];      // 已解锁技能
}
