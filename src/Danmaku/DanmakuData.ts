import { PosData } from "./PosData"

/** 用于弹幕引擎的弹幕数据格式 */

export interface DanmakuData {
  /** 高级弹幕本体 */
  danmaku: PosData
  /** 弹幕id, 具有唯一性 */
  id: number|string|null
  /** 渲染id, 具有随机性和唯一性, 用于弹幕标识和渲染 */
  rid: string
  /** 弹幕开始时间 */
  start: number
  /** 弹幕持续时间 */
  duration: number
  /** 弹幕终止时间 */
  end: number
}