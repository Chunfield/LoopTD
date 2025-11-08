import React from "react";
import "./TowerBase.css";
import type { TowerType } from "../../../types";

export interface TowerBaseProps {
  type: TowerType;
  level: number;
  style?: React.CSSProperties;
}

export const TowerBase: React.FC<TowerBaseProps> = ({ type, level, style }) => {
  return (
    <div className={`tower tower-${type} level-${level}`} style={style}>
      {/* 可选：显示等级 */}
      {/* <span className="tower-level">{level}</span> */}
    </div>
  );
};
