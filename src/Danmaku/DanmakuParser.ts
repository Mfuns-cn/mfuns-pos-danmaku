import randomHash from "../utils/randomHash";
import { DanmakuData } from "./DanmakuData";
import { DanmakuInterface } from "./DanmakuInterface";
import { LDData } from "./LDData";

/**
 * 弹幕转换器
 * 将弹幕字符串转换为弹幕
 */

export class DanmakuParser {
  constructor() {}
  public parse(d: DanmakuInterface): DanmakuData | undefined {
    /** 转换单条弹幕 */
    try {
      let danmaku: LDData = JSON.parse(d.content);
      console.log(danmaku)
      let id: number | string | null = d.id || null;
      let rid: string = randomHash(8);
      let start: number = danmaku["start"] || d.time || 0;
      let duration: number = this.getDuration(danmaku);
      let end: number = start + duration;
      let danmakuData: DanmakuData = {
        danmaku,
        id,
        rid,
        start,
        duration,
        end,
      };
      return danmakuData;
    } catch (error) {
      console.log(`弹幕格式错误-id:${d.id}`);
    }
  }
  /** 获得一条弹幕的持续时间 */
  public getDuration(danmaku: LDData) {
    let duration = danmaku.duration || 0;
    danmaku.animations?.forEach((k) => {
      duration += k.duration || 0;
    });
    return duration;
  }
}
