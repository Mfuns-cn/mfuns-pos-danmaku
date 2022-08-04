/** 解析后的定位弹幕信息格式 */

export interface PosData {
  /** 弹幕内容 */
  content: string;
  /** 弹幕字号 */
  size: number;
  /** 文字颜色 */
  color: number | string;
  /** 粗体 */
  bold?: boolean | (0 | 1);
  /** 字体 */
  font?: string;
    /** 阴影 */
  shadow?: [number | string, number, number, number?];
  /** 描边 */
  stroke?: [number | string, number];
  /** 描边 */
  start?: number;
  /** 弹幕层级 */
  zIndex?: number;
  /** 锚点 */
  anchor?: [number, number];
  /** 相对宽度 */
  relative?: number;
  /** 存活时间 */
  duration?: number;
  /** 位置 */
  position?: [number, number];
  /** 旋转 */
  rotation?: [number, number, number];
  /** 尺寸 */
  scale?: [number, number];
  /** 动画属性 */
  animations?: Array<{
    /** 运动时间 */
    duration?: number;
    /** 位置 */
    position?: [number, number];
    /** 旋转 */
    rotation?: [number, number, number];
    /** 尺寸 */
    scale?: [number, number];
    /** 速度曲线 */
    ease?: 0 | 1 | 2 | 3;
  }>;
}
